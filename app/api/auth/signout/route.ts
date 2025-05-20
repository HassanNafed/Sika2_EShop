import { NextResponse } from "next/server"
import { getServerClientWithCookies } from "@/lib/supabase-server-cookies"

export async function POST() {
  const supabase = getServerClientWithCookies()

  await supabase.auth.signOut()

  return NextResponse.redirect(new URL("/admin/login", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"))
}
