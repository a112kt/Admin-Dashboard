export function getUserIdFromToken(token: string | null): string | null {
  try {
    const payload = token?.split('.')[1] || null;
    const decoded = payload ? JSON.parse(atob(payload)) : null;
    return decoded?.userId || decoded?.sub ||
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || null;
  } catch {
    return null;
  }
}
