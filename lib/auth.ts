import { redirect } from "next/navigation"
import { getServerClient } from "./supabase"

export async function requireAdmin() {
  const supabase = getServerClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/admin/login")
  }

  // Check if user is admin
  const { data: user } = await supabase.from("users").select("role").eq("id", session.user.id).single()

  if (!user || user.role !== "admin") {
    redirect("/")
  }

  return session
}
