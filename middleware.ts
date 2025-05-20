import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If accessing admin routes, check if user is admin
  if (req.nextUrl.pathname.startsWith("/admin") && req.nextUrl.pathname !== "/admin/login") {
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", req.url))
    }

    // Check if user is admin
    const { data: userData } = await supabase.from("users").select("role").eq("id", session.user.id).single()

    if (!userData || userData.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  // If accessing account routes, check if user is authenticated
  if (req.nextUrl.pathname.startsWith("/account") && !session) {
    return NextResponse.redirect(new URL("/auth/login", req.url))
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
}
