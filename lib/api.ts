// lib/api.ts
const API_URL = process.env.API_URL!;

// lib/api.ts
export async function getServerData<T = unknown>(
  path: string,
  token?: string
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error(`Error ${res.status} en ${path}`);
  return res.json();
}

export async function postServerData<T = unknown>(
  path: string,
  body: unknown,
  token?: string
): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body),
    cache: "no-store", // Las mutaciones nunca se cachean
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status} en ${path}`);
  }
  return res.json();
}