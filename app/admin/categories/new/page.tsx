import CategoryForm from "@/components/admin/category-form"

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add New Category</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <CategoryForm />
      </div>
    </div>
  )
}
