import { getServerClient } from "@/lib/supabase"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = getServerClient()

    // Update user role to admin
    const { error } = await supabase.from("users").update({ role: "admin" }).eq("id", params.id)

    if (error) {
      throw error
    }

    return NextResponse.redirect(new URL("/admin/users", request.url))
  } catch (error) {
    console.error("Error making user admin:", error)
    return NextResponse.json({ error: "Failed to update user role" }, { status: 500 })
  }
}
