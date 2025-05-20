"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, X, Plus, Minus } from "lucide-react"

export default function ComparePage() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "SikaTop Seal-107",
      image: "/placeholder.svg?height=200&width=200&text=SikaTop+Seal-107",
      price: "EGP 230",
      category: "Waterproofing",
      features: {
        Application: "Interior & Exterior",
        Coverage: "2 kg/m² per coat",
        "Curing Time": "3-5 days",
        "Water Resistance": "Excellent",
        Adhesion: "Excellent",
        Flexibility: "Moderate",
      },
    },
    {
      id: 2,
      name: "Sika MonoTop-610",
      image: "/placeholder.svg?height=200&width=200&text=Sika+MonoTop-610",
      price: "EGP 250",
      category: "Concrete Repair",
      features: {
        Application: "Interior & Exterior",
        Coverage: "1.5-2.0 kg/m²",
        "Curing Time": "24 hours",
        "Water Resistance": "Good",
        Adhesion: "Excellent",
        Flexibility: "Low",
      },
    },
    {
      id: 3,
      name: "SikaFloor Level",
      image: "/placeholder.svg?height=200&width=200&text=SikaFloor+Level",
      price: "EGP 230",
      category: "Flooring",
      features: {
        Application: "Interior",
        Coverage: "1.5 kg/m² per mm",
        "Curing Time": "24-48 hours",
        "Water Resistance": "Moderate",
        Adhesion: "Good",
        Flexibility: "Low",
      },
    },
  ])

  const removeProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  const allFeatures = Array.from(new Set(products.flatMap((product) => Object.keys(product.features))))

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Compare Products</h1>

      {products.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left">Product</th>
                  {products.map((product) => (
                    <th key={product.id} className="p-4 text-center min-w-[250px]">
                      <div className="relative">
                        <button
                          onClick={() => removeProduct(product.id)}
                          className="absolute -top-2 -right-2 bg-gray-200 rounded-full p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <div className="flex flex-col items-center">
                          <div className="w-32 h-32 mb-4">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              width={128}
                              height={128}
                              className="object-contain w-full h-full"
                            />
                          </div>
                          <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                          <p className="font-bold text-lg mb-4">{product.price}</p>
                          <Button className="bg-red-600 hover:bg-red-700 text-white w-full">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </th>
                  ))}
                  {products.length < 4 && (
                    <th className="p-4 text-center min-w-[250px]">
                      <div className="flex flex-col items-center">
                        <div className="w-32 h-32 mb-4 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                          <Plus className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="font-bold text-lg mb-4 text-gray-400">Add Product</h3>
                        <Button variant="outline" className="w-full">
                          Add to Compare
                        </Button>
                      </div>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {allFeatures.map((feature) => (
                  <tr key={feature} className="border-b">
                    <td className="p-4 font-medium">{feature}</td>
                    {products.map((product) => (
                      <td key={`${product.id}-${feature}`} className="p-4 text-center">
                        {product.features[feature as keyof typeof product.features] || (
                          <Minus className="h-4 w-4 mx-auto text-gray-400" />
                        )}
                      </td>
                    ))}
                    {products.length < 4 && (
                      <td className="p-4 text-center">
                        <Minus className="h-4 w-4 mx-auto text-gray-400" />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
            <X className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No Products to Compare</h2>
          <p className="text-gray-600 mb-6">Add products to compare their features and specifications.</p>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Suggested Products to Compare</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SuggestedProductCard
            image="/placeholder.svg?height=200&width=200&text=Sikaflex-11+FC+"
            title="Sikaflex-11 FC+"
            price="EGP 500"
            category="Sealants"
          />
          <SuggestedProductCard
            image="/placeholder.svg?height=200&width=200&text=Sika+Waterproof+Membrane"
            title="Sika Waterproof Membrane"
            price="EGP 350"
            category="Waterproofing"
          />
          <SuggestedProductCard
            image="/placeholder.svg?height=200&width=200&text=SikaBond+Adhesive"
            title="SikaBond Construction Adhesive"
            price="EGP 180"
            category="Adhesives"
          />
          <SuggestedProductCard
            image="/placeholder.svg?height=200&width=200&text=Sika+Primer-3+N"
            title="Sika Primer-3 N"
            price="EGP 120"
            category="Primers"
          />
        </div>
      </div>
    </div>
  )
}

function SuggestedProductCard({
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
      <div className="p-4">
        <div className="aspect-square overflow-hidden mb-4">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={200}
            height={200}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="mb-2">
          <span className="text-xs text-gray-500">{category}</span>
        </div>
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-gray-700 mb-4">{price}</p>
        <Button variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add to Compare
        </Button>
      </div>
    </div>
  )
}
