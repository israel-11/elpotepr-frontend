import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const accountId = request.cookies.get("account_id")?.value;

  if (!accountId) {
    // Si no hay cookie, redirigir al login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Continuar si la cookie existe
  return NextResponse.next();
}

export const config = {
  matcher: ["/"], // Aplica el middleware a la ruta raíz
};
