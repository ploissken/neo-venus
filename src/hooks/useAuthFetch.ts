"use client";

import { useRouter } from "next/navigation";

export function useAuthFetch() {
  const router = useRouter();

  const authFetch = async (input: RequestInfo, init?: RequestInit) => {
    const res = await fetch(input, {
      ...init,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 401) {
      router.push("/user/sign-in");
    }

    return res;
  };

  return authFetch;
}
