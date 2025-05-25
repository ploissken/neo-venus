"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "./useSnackbar";
import { useTranslations } from "next-intl";

export type FailedFetchResult = {
  ok: false;
  error: string;
};

export type SuccessFetchResult<T> = {
  ok: true;
  data: T;
};

type UseFetchOptions = {
  auth?: boolean;
  redirectTo?: string;
};

export function useFetch() {
  const router = useRouter();
  const { showMessage } = useSnackbar();
  const t = useTranslations();

  const fetchWithConfig = useCallback(
    async <T>(
      endpoint: string,
      options: RequestInit = {},
      { auth = false, redirectTo = "/user/sign-in" }: UseFetchOptions = {}
    ): Promise<FailedFetchResult | SuccessFetchResult<T>> => {
      try {
        const response = await fetch(endpoint, {
          ...options,
          credentials: auth ? "include" : "omit",
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
        });

        const json = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            if (json.error === "wrong_credentials") {
              return json;
            } else {
              router.push(redirectTo);
              showMessage(t("server.error.unauthorized"));
              return json;
            }
          }

          if (response.status === 400) {
            const error = "server.error.bad_request";
            showMessage(t(error));
            return { ok: false, error };
          }

          if (response.status === 404) {
            const error = "server.error.not_found";
            showMessage(t(error));
            return { ok: false, error };
          }

          if (response.status === 500) {
            const error = "server.error.internal_server_error";
            showMessage(t(error));
            return { ok: false, error };
          }

          return {
            ok: false,
            error: json?.error || "server.error.unknown_error",
          };
        }

        return {
          ok: true,
          data: json.data ?? json,
        };
      } catch (err) {
        return {
          ok: false,
          error:
            err instanceof Error ? err.message : "server.error.unknown_error",
        };
      }
    },
    [router, showMessage, t]
  );

  const authFetch = useCallback(
    <T>(endpoint: string, options: RequestInit = {}) =>
      fetchWithConfig<T>(endpoint, options, { auth: true }),
    [fetchWithConfig]
  );

  const anonFetch = useCallback(
    <T>(endpoint: string, options: RequestInit = {}) =>
      fetchWithConfig<T>(endpoint, options, { auth: false }),
    [fetchWithConfig]
  );

  return { authFetch, anonFetch };
}
