export type BackendErrorResponse = { ok: false; error: string };
export type BackendResponse<T> = { ok: true; data: T };
