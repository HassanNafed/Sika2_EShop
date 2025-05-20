import { notFound } from "next/navigation"
import { getServerClient } from "@/lib/supabase"
import ProductForm from "@/components/admin/product-form"

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const supabase = getServerClient()

  const { data: product } = await supabase.from("products").select("*").eq("id", params.id).single()

  if (!product) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <ProductForm product={product} isEditing={true} />
      </div>
    </div>
  )
}
