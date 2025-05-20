import { NextResponse } from "next/server"
import { getServerClient } from "@/lib/supabase"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = getServerClient()

    // Check if category has products
    const { count } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("category_id", params.id)

    if (count && count > 0) {
      return NextResponse.json({ error: "Cannot delete category with associated products" }, { status: 400 })
    }

    // Delete the category
    const { error } = await supabase.from("categories").delete().eq("id", params.id)

    if (error) {
      throw error
    }

    return NextResponse.redirect(
      new URL("/admin/categories", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    )
  } catch (error) {
    console.error("Error deleting category:", error)
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}
