// Central API client for the MaxTopNet frontend.

// In production the API is served same-origin (Next.js rewrites proxy /api and
// /uploads to the internal backend), so NEXT_PUBLIC_API_URL is set to "" there.
// `??` keeps an explicit empty string instead of falling back to localhost.
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';

export const apiUrl = (path: string) =>
  `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;

/** Resolve an image path that may be a relative /uploads path or a full URL. */
export function imgUrl(src?: string): string {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) return src;
  return `${API_BASE}${src.startsWith('/') ? src : `/${src}`}`;
}

/** Public GET — returns parsed JSON or a fallback on failure. */
export async function getData<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(apiUrl(`/api${path}`), { cache: 'no-store' });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

/* ----------------- Admin / authenticated helpers ----------------- */

const TOKEN_KEY = 'maxtop_admin_token';

export const getToken = () =>
  typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
export const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

function authHeaders(extra: Record<string, string> = {}) {
  const token = getToken();
  return { ...extra, ...(token ? { Authorization: `Bearer ${token}` } : {}) };
}

export async function apiGet<T = any>(path: string): Promise<T> {
  const res = await fetch(apiUrl(`/api${path}`), {
    headers: authHeaders(),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message || 'Request failed');
  return res.json();
}

export async function apiSend<T = any>(
  path: string,
  method: 'POST' | 'PUT' | 'DELETE',
  body?: any
): Promise<T> {
  const res = await fetch(apiUrl(`/api${path}`), {
    method,
    headers: authHeaders({ 'Content-Type': 'application/json' }),
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export async function login(email: string, password: string) {
  const res = await fetch(apiUrl('/api/auth/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Login failed');
  setToken(data.token);
  return data.admin;
}

/** Upload an image file, returns the stored /uploads URL. */
export async function uploadImage(file: File): Promise<string> {
  const fd = new FormData();
  fd.append('image', file);
  const res = await fetch(apiUrl('/api/upload'), {
    method: 'POST',
    headers: authHeaders(),
    body: fd,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Upload failed');
  return data.url as string;
}
