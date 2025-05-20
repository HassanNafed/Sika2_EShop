import { notFound } from "next/navigation"
import { getServerClient } from "@/lib/supabase"
import CategoryForm from "@/components/admin/category-form"

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
  const supabase = getServerClient()

  const { data: category } = await supabase.from("categories").select("*").eq("id", params.id).single()

  if (!category) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Category</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <CategoryForm category={category} isEditing={true} />
      </div>
    </div>
  )
}
