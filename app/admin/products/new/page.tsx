import ProductForm from "@/components/admin/product-form"

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <ProductForm />
      </div>
    </div>
  )
}
