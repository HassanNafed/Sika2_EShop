import { type NextRequest, NextResponse } from "next/server"
import { getServerClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const categoryId = Number.parseInt(params.id)

  if (isNaN(categoryId)) {
    return NextResponse.json({ error: "Invalid category ID" }, { status: 400 })
  }

  const supabase = getServerClient()

  // Check if category has products
  const { count } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("category_id", categoryId)

  if (count && count > 0) {
    return NextResponse.json(
      { error: "Cannot delete category with products. Please reassign or delete the products first." },
      { status: 400 },
    )
  }

  const { error } = await supabase.from("categories").delete().eq("id", categoryId)

  if (error) {
    console.error("Error deleting category:", error)
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }

  revalidatePath("/admin/categories")

  return NextResponse.redirect(new URL("/admin/categories", request.url))
}
