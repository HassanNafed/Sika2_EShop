import { getServerClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = getServerClient()

  // Create cart_items table if it doesn't exist
  const { error } = await supabase.rpc("create_cart_table")

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
