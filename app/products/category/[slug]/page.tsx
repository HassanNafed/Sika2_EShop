import { createServerClient } from "@/lib/supabase"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ArrowLeft } from "lucide-react"

// Function to fetch category by slug
async function getCategory(slug: string) {
  const supabase = createServerClient()
  const { data, error } = await supabase.from("categories").select("*").eq("slug", slug).single()

  if (error || !data) {
    return null
  }

  return data
}

// Function to fetch products by category
async function getProductsByCategory(categoryId: number) {
  const supabase = createServerClient()
  const { data, error } = await supabase.from("products").select("*").eq("category_id", categoryId).order("name")

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return data
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await getCategory(params.slug)

  if (!category) {
    notFound()
  }

  const products = await getProductsByCategory(category.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/products" className="flex items-center text-red-600 hover:underline mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Products
        </Link>
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-gray-600">{category.description}</p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1"
            >
              <Link href={`/products/${product.slug}`}>
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={
                      product.image_url ||
                      `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(product.name)}`
                    }
                    alt={product.name}
                    width={300}
                    height={300}
                    className="object-contain w-full h-full"
                  />
                </div>
              </Link>
              <div className="p-4">
                <Link href={`/products/${product.slug}`}>
                  <h3 className="font-bold text-lg mb-1 hover:text-red-600">{product.name}</h3>
                </Link>
                <p className="text-gray-700 mb-4">EGP {product.price}</p>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-bold mb-2">No products found</h2>
          <p className="text-gray-600 mb-4">There are currently no products in this category.</p>
          <Button asChild>
            <Link href="/products">Browse All Products</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
