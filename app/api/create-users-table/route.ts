import { getServerClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = getServerClient()

    // Check if users table exists
    const { data: tableExists } = await supabase.from("users").select("id").limit(1).maybeSingle()

    if (tableExists !== null) {
      return NextResponse.json({ message: "Users table already exists" })
    }

    // Create users table if it doesn't exist
    await supabase.rpc("create_users_table")

    return NextResponse.json({ message: "Users table created successfully" })
  } catch (error) {
    console.error("Error creating users table:", error)
    return NextResponse.json({ error: "Failed to create users table" }, { status: 500 })
  }
}
