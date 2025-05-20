"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, RotateCcw, Minus, Plus } from "lucide-react"
import { getBrowserClient } from "@/lib/supabase"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { toast } from "@/components/ui/use-toast"

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<any>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const { addItem: addToCart } = useCart()
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist()

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      const supabase = getBrowserClient()

      // Fetch product details
      const { data: product, error } = await supabase
        .from("products")
        .select(
          `
          *,
          categories (
            id,
            name,
            slug
          )
        `,
        )
        .eq("slug", params.slug)
        .single()

      if (error) {
        console.error("Error fetching product:", error)
        setLoading(false)
        return
      }

      setProduct(product)

      // Fetch related products from the same category
      if (product.category_id) {
        const { data: related } = await supabase
          .from("products")
          .select(
            `
            id,
            name,
            slug,
            price,
            sale_price,
            image_url,
            stock_quantity,
            is_bestseller,
            categories (
              name,
              slug
            )
          `,
          )
          .eq("category_id", product.category_id)
          .neq("id", product.id)
          .limit(4)

        setRelatedProducts(related || [])
      }

      setLoading(false)
    }

    fetchProduct()
  }, [params.slug])

  const handleQuantityChange = (value: number) => {
    if (value < 1) return
    if (product && value > product.stock_quantity) return
    setQuantity(value)
  }

  const handleAddToCart = async () => {
    if (!product) return

    try {
      await addToCart(product, quantity)
      toast({
        title: "Added to cart",
        description: `${quantity} x ${product.name} has been added to your cart.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleWishlistToggle = async () => {
    if (!product) return

    try {
      if (isInWishlist(product.id)) {
        await removeFromWishlist(product.id)
        toast({
          title: "Removed from wishlist",
          description: `${product.name} has been removed from your wishlist.`,
        })
      } else {
        await addToWishlist(product)
        toast({
          title: "Added to wishlist",
          description: `${product.name} has been added to your wishlist.`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update wishlist. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 bg-gray-200 animate-pulse h-96 rounded-lg"></div>
          <div className="w-full md:w-1/2 space-y-4">
            <div className="h-8 bg-gray-200 animate-pulse rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 animate-pulse rounded w-1/2"></div>
            <div className="h-24 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-10 bg-gray-200 animate-pulse rounded w-1/3"></div>
            <div className="h-12 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you are looking for does not exist or has been removed.</p>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="aspect-square relative">
              <Image
                src={
                  product.image_url || `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(product.name)}`
                }
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-2">
              <Link
                href={`/products?category=${product.categories?.slug}`}
                className="text-sm text-gray-500 hover:text-red-600"
              >
                {product.categories?.name || "Uncategorized"}
              </Link>
            </div>

            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">4.0 (24 reviews)</span>
            </div>

            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-red-600">EGP {product.price}</span>
                {product.sale_price && product.sale_price < product.price && (
                  <span className="ml-2 text-gray-500 line-through">EGP {product.sale_price}</span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {product.stock_quantity > 0 ? (
                  <span className="text-green-600">In Stock ({product.stock_quantity} available)</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </p>
            </div>

            <div className="mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-r-none"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="h-10 w-16 flex items-center justify-center border-y">{quantity}</div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-l-none"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={product.stock_quantity <= quantity}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                  <span className="text-gray-600">{product.sku}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={product.stock_quantity <= 0}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12" onClick={handleWishlistToggle}>
                  <Heart
                    className={`h-5 w-5 ${isInWishlist(product.id) ? "text-red-600 fill-red-600" : "text-gray-600"}`}
                  />
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex items-start">
                <Truck className="h-5 w-5 mr-3 text-gray-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Free Shipping</h4>
                  <p className="text-sm text-gray-600">Free shipping on orders over EGP 2,000</p>
                </div>
              </div>
              <div className="flex items-start">
                <Shield className="h-5 w-5 mr-3 text-gray-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Warranty</h4>
                  <p className="text-sm text-gray-600">1 year manufacturer warranty</p>
                </div>
              </div>
              <div className="flex items-start">
                <RotateCcw className="h-5 w-5 mr-3 text-gray-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">30-Day Returns</h4>
                  <p className="text-sm text-gray-600">Shop with confidence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="description" className="rounded-b-none">
              Description
            </TabsTrigger>
            <TabsTrigger value="features" className="rounded-b-none">
              Features
            </TabsTrigger>
            <TabsTrigger value="specifications" className="rounded-b-none">
              Specifications
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-b-none">
              Reviews
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="bg-white p-6 rounded-b-lg shadow-md">
            <div className="prose max-w-none">
              <p>{product.description}</p>
            </div>
          </TabsContent>
          <TabsContent value="features" className="bg-white p-6 rounded-b-lg shadow-md">
            <div className="prose max-w-none">
              <ul className="list-disc pl-5 space-y-2">
                {product.features?.split("\n").map((feature: string, index: number) => (
                  <li key={index}>{feature.trim()}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="bg-white p-6 rounded-b-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-b pb-2">
                <span className="font-medium">SKU:</span> {product.sku}
              </div>
              <div className="border-b pb-2">
                <span className="font-medium">Weight:</span> 25 kg
              </div>
              <div className="border-b pb-2">
                <span className="font-medium">Dimensions:</span> 30 × 30 × 10 cm
              </div>
              <div className="border-b pb-2">
                <span className="font-medium">Color:</span> Gray
              </div>
              <div className="border-b pb-2">
                <span className="font-medium">Material:</span> Cement, Additives
              </div>
              <div className="border-b pb-2">
                <span className="font-medium">Application:</span> Interior, Exterior
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="bg-white p-6 rounded-b-lg shadow-md">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Customer Reviews</h3>
                <Button>Write a Review</Button>
              </div>

              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium">Ahmed M.</span>
                    <span className="ml-auto text-xs text-gray-500">2 weeks ago</span>
                  </div>
                  <h4 className="font-medium mb-1">Excellent product, highly recommended!</h4>
                  <p className="text-sm text-gray-600">
                    I used this product for waterproofing my bathroom and it worked perfectly. Easy to apply and very
                    effective.
                  </p>
                </div>

                <div className="border-b pb-4">
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium">Mohamed K.</span>
                    <span className="ml-auto text-xs text-gray-500">1 month ago</span>
                  </div>
                  <h4 className="font-medium mb-1">Good quality product</h4>
                  <p className="text-sm text-gray-600">
                    The product quality is good, but the instructions could be clearer. Overall satisfied with the
                    purchase.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                <Link href={`/products/${relatedProduct.slug}`}>
                  <div className="aspect-square p-4">
                    <Image
                      src={
                        relatedProduct.image_url ||
                        `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(relatedProduct.name) || "/placeholder.svg"}`
                      }
                      alt={relatedProduct.name}
                      width={200}
                      height={200}
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
