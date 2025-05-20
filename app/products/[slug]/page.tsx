"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  ChevronRight,
  FileText,
  Download,
  CheckCircle,
  AlertCircle,
  Minus,
  Plus,
} from "lucide-react"
import { getBrowserClient } from "@/lib/supabase"
import { notFound } from "next/navigation"

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<any>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [mainImage, setMainImage] = useState("")

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      const supabase = getBrowserClient()

      // Fetch product data
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          categories (
            id,
            name,
            slug
          )
        `)
        .eq("slug", params.slug)
        .single()

      if (error || !data) {
        console.error("Error fetching product:", error)
        notFound()
        return
      }

      setProduct(data)
      setMainImage(data.image_url || `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(data.name)}`)

      if (data.additional_images && data.additional_images.length > 0) {
        setMainImage(data.additional_images[0])
      }

      // Set default size if available
      if (data.technical_data && data.technical_data.sizes && data.technical_data.sizes.length > 0) {
        setSelectedSize(data.technical_data.sizes[0])
      }

      // Fetch related products
      if (data.category_id) {
        const { data: related } = await supabase
          .from("products")
          .select(`
            id,
            name,
            slug,
            price,
            image_url,
            categories (
              name
            )
          `)
          .eq("category_id", data.category_id)
          .neq("id", data.id)
          .limit(4)

        if (related) {
          setRelatedProducts(related)
        }
      }

      setLoading(false)
    }

    fetchProduct()
  }, [params.slug])

  const incrementQuantity = () => {
    setQuantity(quantity + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 animate-pulse">
          <div className="w-full lg:w-1/2">
            <div className="bg-gray-200 rounded-lg h-96"></div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="bg-gray-200 h-8 w-3/4 mb-4 rounded"></div>
            <div className="bg-gray-200 h-6 w-1/2 mb-6 rounded"></div>
            <div className="bg-gray-200 h-24 w-full mb-6 rounded"></div>
            <div className="bg-gray-200 h-10 w-full rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return notFound()
  }

  // Parse technical data
  const specifications = product.technical_data?.specifications || {}
  const features = product.features ? product.features.split("\n").filter(Boolean) : []
  const productImages = [
    product.image_url || `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(product.name)}`,
  ]

  if (product.additional_images && Array.isArray(product.additional_images)) {
    productImages.push(...product.additional_images)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
            <div className="aspect-square relative">
              <Image
                src={mainImage || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {productImages.map((image, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer ${
                  mainImage === image ? "ring-2 ring-red-600" : ""
                }`}
                onClick={() => setMainImage(image)}
              >
                <div className="aspect-square relative">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 25vw, 12vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
            <div className="mb-4">
              <div className="flex items-center mb-2">
                {product.categories && (
                  <>
                    <Link
                      href={`/products?category=${product.categories.slug}`}
                      className="text-sm text-gray-500 hover:underline"
                    >
                      {product.categories.name}
                    </Link>
                    <ChevronRight className="h-3 w-3 mx-1 text-gray-400" />
                  </>
                )}
                <span className="text-sm text-gray-500">{product.brand || "Brand"}</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating || "0.0"}</span>
                <span className="mx-2 text-gray-400">|</span>
                <Link href="#reviews" className="text-sm text-gray-600 hover:underline">
                  {product.review_count || 0} Reviews
                </Link>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-2">
                {product.sale_price && product.sale_price < product.price && (
                  <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded mr-2">
                    {Math.round(((product.price - product.sale_price) / product.price) * 100)}% OFF
                  </span>
                )}
                {product.stock_quantity > 0 ? (
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">In Stock</span>
                ) : (
                  <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded">Out of Stock</span>
                )}
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-red-600">
                  EGP {product.sale_price && product.sale_price < product.price ? product.sale_price : product.price}
                </span>
                {product.sale_price && product.sale_price < product.price && (
                  <span className="text-gray-500 line-through ml-2">EGP {product.price}</span>
                )}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>

            {product.technical_data?.sizes && product.technical_data.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold mb-2">Size</h3>
                <div className="flex space-x-2">
                  {product.technical_data.sizes.map((size: string) => (
                    <button
                      key={size}
                      className={`px-4 py-2 border rounded-md ${
                        selectedSize === size
                          ? "border-red-600 bg-red-50 text-red-600"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="font-bold mb-2">Quantity</h3>
              <div className="flex items-center">
                <button
                  className="border border-gray-300 rounded-l-md p-2 hover:bg-gray-100"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <div className="border-t border-b border-gray-300 py-2 px-4">{quantity}</div>
                <button
                  className="border border-gray-300 rounded-r-md p-2 hover:bg-gray-100"
                  onClick={incrementQuantity}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white" disabled={product.stock_quantity <= 0}>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" className="flex-1">
                <Heart className="h-4 w-4 mr-2" />
                Add to Wishlist
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <Truck className="h-5 w-5 text-gray-600 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Free shipping</p>
                  <p className="text-gray-600">For orders over EGP 2,000</p>
                </div>
              </div>
              <div className="flex items-start">
                <ShieldCheck className="h-5 w-5 text-gray-600 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">Quality Guarantee</p>
                  <p className="text-gray-600">100% original products</p>
                </div>
              </div>
              <div className="flex items-start">
                <RotateCcw className="h-5 w-5 text-gray-600 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">14-Day Returns</p>
                  <p className="text-gray-600">Shop with confidence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Tabs defaultValue="features">
            <TabsList className="w-full border-b justify-start p-0">
              <TabsTrigger value="features" className="px-6 py-3 rounded-none">
                Features
              </TabsTrigger>
              <TabsTrigger value="specifications" className="px-6 py-3 rounded-none">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="application" className="px-6 py-3 rounded-none">
                Application
              </TabsTrigger>
              <TabsTrigger value="reviews" className="px-6 py-3 rounded-none">
                Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent value="features" className="p-6">
              <h3 className="text-xl font-bold mb-4">Key Features</h3>
              <ul className="space-y-2">
                {features.length > 0 ? (
                  features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))
                ) : (
                  <li>No features specified for this product.</li>
                )}
              </ul>
            </TabsContent>
            <TabsContent value="specifications" className="p-6">
              <h3 className="text-xl font-bold mb-4">Technical Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(specifications).length > 0 ? (
                  Object.entries(specifications).map(([key, value]) => (
                    <div key={key} className="border-b pb-2">
                      <span className="font-medium">{key}:</span> {value}
                    </div>
                  ))
                ) : (
                  <div>No specifications available for this product.</div>
                )}
              </div>
              {product.technical_data?.datasheet_url && (
                <div className="mt-6 flex items-center">
                  <FileText className="h-5 w-5 text-gray-600 mr-2" />
                  <Button variant="link" className="p-0 h-auto text-red-600" asChild>
                    <a href={product.technical_data.datasheet_url} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4 mr-2" />
                      Download Technical Data Sheet
                    </a>
                  </Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="application" className="p-6">
              <h3 className="text-xl font-bold mb-4">Application Guidelines</h3>
              <div className="space-y-4">
                {product.technical_data?.application ? (
                  <div dangerouslySetInnerHTML={{ __html: product.technical_data.application }} />
                ) : (
                  <p>No application guidelines available for this product.</p>
                )}
                <div className="bg-yellow-50 p-4 rounded-md flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm text-yellow-800">
                    Always refer to the most recent product data sheet and safety data sheet before use. Application
                    should be carried out by trained personnel only.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="p-6" id="reviews">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Customer Reviews</h3>
                <Button className="bg-red-600 hover:bg-red-700 text-white">Write a Review</Button>
              </div>

              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="w-full md:w-1/3">
                  <div className="text-center">
                    <div className="text-5xl font-bold mb-2">{product.rating || "0.0"}</div>
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < Math.floor(product.rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">{product.review_count || 0} reviews</p>
                  </div>
                </div>

                <div className="w-full md:w-2/3">
                  <p className="text-center text-gray-500">No reviews yet. Be the first to review this product!</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1"
              >
                <Link href={`/products/${relatedProduct.slug}`}>
                  <div className="aspect-square overflow-hidden p-4">
                    <Image
                      src={
                        relatedProduct.image_url ||
                        `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(relatedProduct.name)}`
                      }
                      alt={relatedProduct.name}
                      width={300}
                      height={300}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs text-gray-500">{relatedProduct.categories?.name || "Uncategorized"}</span>
                  </div>
                  <Link href={`/products/${relatedProduct.slug}`}>
                    <h3 className="font-bold text-lg mb-1 hover:text-red-600">{relatedProduct.name}</h3>
                  </Link>
                  <p className="text-gray-700 mb-4">EGP {relatedProduct.price}</p>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
