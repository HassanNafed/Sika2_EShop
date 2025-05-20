import { NextResponse } from "next/server"
import { getServerClient } from "@/lib/supabase"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = getServerClient()

    // Delete the product
    const { error } = await supabase.from("products").delete().eq("id", params.id)

    if (error) {
      throw error
    }

    return NextResponse.redirect(
      new URL("/admin/products", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    )
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
