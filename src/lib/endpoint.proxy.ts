export function getEndpoint(serviceUrl: string) {
  const BASE_URL = process.env.API_BASE_URL;
  if (!BASE_URL) {
    throw new Error("Missing API_BASE_URL in environment variables");
  }

  return serviceUrl.startsWith("http")
    ? serviceUrl
    : `${BASE_URL}${serviceUrl}`;
}
