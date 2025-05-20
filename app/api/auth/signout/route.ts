import { NextResponse } from "next/server"
import { getServerClient } from "@/lib/supabase"

export async function POST() {
  const supabase = getServerClient()

  await supabase.auth.signOut()

  return NextResponse.redirect(new URL("/admin/login", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"))
}
