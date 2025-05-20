"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from "lucide-react"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"
import { toast } from "@/components/ui/use-toast"

export function ProductCard({
  product,
}: {
  product: {
    id: number
    name: string
    slug: string
    price: number
    sale_price?: number
    image_url: string
    stock_quantity: number
    is_bestseller?: boolean
    categories?: { name: string; slug: string }
  }
}) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  // Initialize with default values in case the context is not available
  const {
    addItem: addToWishlist = async () => {},
    isInWishlist = () => false,
    removeItem: removeFromWishlist = async () => {},
  } = useWishlist()

  const { addItem: addToCart = async () => {} } = useCart()

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      await addToCart(product, 1)
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleWishlistToggle = async () => {
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

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        {product.is_bestseller && (
          <div className="absolute top-2 left-2 bg-yellow-200 text-black text-xs font-bold px-3 py-1 rounded-full">
            Bestseller
          </div>
        )}
        <button onClick={handleWishlistToggle} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
          <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "text-red-600 fill-red-600" : "text-gray-400"}`} />
        </button>
        <Link href={`/products/${product.slug}`}>
          <div className="aspect-square overflow-hidden p-4">
            <Image
              src={
                product.image_url || `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(product.name)}`
              }
              alt={product.name}
              width={300}
              height={300}
              className="object-contain w-full h-full"
            />
          </div>
        </Link>
      </div>
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-gray-500">{product.categories?.name || "Uncategorized"}</span>
        </div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-bold text-lg mb-1 hover:text-red-600">{product.name}</h3>
        </Link>
        <div className="flex items-center mb-4">
          <span className="text-gray-700 font-medium">
            {product.sale_price && product.sale_price < product.price ? (
              <>
                <span className="text-red-600">EGP {product.sale_price}</span>
                <span className="text-gray-500 line-through ml-2">EGP {product.price}</span>
              </>
            ) : (
              `EGP ${product.price}`
            )}
          </span>
        </div>
        <Button
          className="w-full bg-red-600 hover:bg-red-700 text-white"
          onClick={handleAddToCart}
          disabled={isAddingToCart || product.stock_quantity <= 0}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.stock_quantity <= 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>
    </div>
  )
}
