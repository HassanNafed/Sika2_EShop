"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Trash2, Heart, Loader2 } from "lucide-react"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function WishlistPage() {
  const { items, removeItem, isLoading: wishlistLoading } = useWishlist()
  const { addItem } = useCart()
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Redirect to login if not authenticated
    if (!authLoading && !user) {
      router.push("/auth/login?redirect=/account/wishlist")
    }
  }, [user, authLoading, router])

  const handleAddToCart = async (item: any) => {
    try {
      await addItem(
        {
          id: item.product_id,
          name: item.name,
          price: item.price,
          image_url: item.image_url,
          slug: item.slug,
          stock_quantity: 999, // Assuming in stock since we don't have this info
        },
        1,
      )

      toast({
        title: "Added to cart",
        description: `${item.name} has been added to your cart.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (authLoading || !isClient) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      {wishlistLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-red-600" />
        </div>
      ) : items.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {items.map((item) => (
                <div key={item.id} className="border rounded-lg overflow-hidden">
                  <div className="relative">
                    <Link href={`/products/${item.slug}`}>
                      <div className="aspect-square overflow-hidden">
                        <Image
                          src={item.image_url || "/placeholder.svg?height=200&width=200"}
                          alt={item.name}
                          width={200}
                          height={200}
                          className="object-contain w-full h-full"
                        />
                      </div>
                    </Link>
                    <button
                      onClick={() => removeItem(item.product_id)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                    >
                      <Trash2 className="h-5 w-5 text-red-600" />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="mb-2">
                      <span className="text-xs text-gray-500">{item.category}</span>
                    </div>
                    <Link href={`/products/${item.slug}`}>
                      <h3 className="font-bold text-lg mb-1 hover:text-red-600">{item.name}</h3>
                    </Link>
                    <p className="text-gray-700 mb-4">EGP {item.price}</p>
                    {item.inStock ? (
                      <div className="flex items-center justify-between">
                        <span className="text-green-600 text-sm">In Stock</span>
                        <Button
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-red-600 text-sm">Out of Stock</span>
                        <Button disabled className="bg-gray-300 text-gray-600 cursor-not-allowed">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
            <Heart className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h2>
          <p className="text-gray-600 mb-6">Save items you like by clicking the heart icon on product pages.</p>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
