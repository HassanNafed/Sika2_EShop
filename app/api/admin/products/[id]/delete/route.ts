import { type NextRequest, NextResponse } from "next/server"
import { getServerClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const productId = Number.parseInt(params.id)

  if (isNaN(productId)) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })
  }

  const supabase = getServerClient()

  const { error } = await supabase.from("products").delete().eq("id", productId)

  if (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }

  revalidatePath("/admin/products")

  return NextResponse.redirect(new URL("/admin/products", request.url))
}
