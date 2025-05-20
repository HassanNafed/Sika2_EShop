import { redirect } from "next/navigation"
import { getServerClient } from "@/lib/supabase"

export async function GET() {
  const supabase = getServerClient()

  await supabase.auth.signOut()

  redirect("/admin/login")
}
