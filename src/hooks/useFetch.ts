"use client";
import { useRouter } from "next/navigation";
import { useSnackbar } from "./useSnackbar";
import { useTranslations } from "next-intl";

type FailedFetchResult = {
  ok: false;
  error: string;
};

type SuccessFetchResult<T> = {
  ok: true;
  data: T;
};

type UseFetchOptions = {
  auth?: boolean;
  redirectTo?: string;
};

export function useFetch({
  auth = false,
  redirectTo = "/user/sign-in",
}: UseFetchOptions = {}) {
  const router = useRouter();
  const { showMessage } = useSnackbar();
  const t = useTranslations();

  return async function fetchWithConfig<T>(
    input: string,
    options: RequestInit = {}
  ): Promise<FailedFetchResult | SuccessFetchResult<T>> {
    try {
      const response = await fetch(input, {
        ...options,
        credentials: auth ? "include" : "omit",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      const json = await response.json();

      if (!response.ok) {
        showMessage(t(json.error));

        if (response.status === 401) {
          router.push(redirectTo);
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
  };
}
