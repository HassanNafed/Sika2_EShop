"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Trash2, Heart } from "lucide-react"

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "SikaTop Seal-107",
      price: "EGP 230",
      image: "/placeholder.svg?height=200&width=200&text=SikaTop+Seal-107",
      category: "Waterproofing",
      inStock: true,
    },
    {
      id: 2,
      name: "Sika MonoTop-610",
      price: "EGP 250",
      image: "/placeholder.svg?height=200&width=200&text=Sika+MonoTop-610",
      category: "Concrete Repair",
      inStock: true,
    },
    {
      id: 3,
      name: "SikaFloor Level",
      price: "EGP 230",
      image: "/placeholder.svg?height=200&width=200&text=SikaFloor+Level",
      category: "Flooring",
      inStock: false,
    },
    {
      id: 4,
      name: "Sikaflex-11 FC+",
      price: "EGP 500",
      image: "/placeholder.svg?height=200&width=200&text=Sikaflex-11+FC+",
      category: "Sealants",
      inStock: true,
    },
  ])

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      {wishlistItems.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="border rounded-lg overflow-hidden">
                  <div className="relative">
                    <Link href={`/products/${item.id}`}>
                      <div className="aspect-square overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={200}
                          height={200}
                          className="object-contain w-full h-full"
                        />
                      </div>
                    </Link>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                    >
                      <Trash2 className="h-5 w-5 text-red-600" />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="mb-2">
                      <span className="text-xs text-gray-500">{item.category}</span>
                    </div>
                    <Link href={`/products/${item.id}`}>
                      <h3 className="font-bold text-lg mb-1 hover:text-red-600">{item.name}</h3>
                    </Link>
                    <p className="text-gray-700 mb-4">{item.price}</p>
                    {item.inStock ? (
                      <div className="flex items-center justify-between">
                        <span className="text-green-600 text-sm">In Stock</span>
                        <Button className="bg-red-600 hover:bg-red-700 text-white">
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

      {wishlistItems.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <RecommendedProductCard
              image="/placeholder.svg?height=200&width=200&text=Sika+Waterproof+Membrane"
              title="Sika Waterproof Membrane"
              price="EGP 350"
              category="Waterproofing"
            />
            <RecommendedProductCard
              image="/placeholder.svg?height=200&width=200&text=SikaBond+Adhesive"
              title="SikaBond Construction Adhesive"
              price="EGP 180"
              category="Adhesives"
            />
            <RecommendedProductCard
              image="/placeholder.svg?height=200&width=200&text=Sika+Primer-3+N"
              title="Sika Primer-3 N"
              price="EGP 120"
              category="Primers"
            />
            <RecommendedProductCard
              image="/placeholder.svg?height=200&width=200&text=SikaGrout-212"
              title="SikaGrout-212"
              price="EGP 280"
              category="Grouting"
            />
          </div>
        </div>
      )}
    </div>
  )
}

function RecommendedProductCard({
  image,
  title,
  price,
  category,
}: {
  image: string
  title: string
  price: string
  category: string
}) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="relative">
        <div className="aspect-square overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={200}
            height={200}
            className="object-contain w-full h-full"
          />
        </div>
        <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
          <Heart className="h-5 w-5 text-gray-400 hover:text-red-600" />
        </button>
      </div>
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-gray-500">{category}</span>
        </div>
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-gray-700 mb-4">{price}</p>
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
