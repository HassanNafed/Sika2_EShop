"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Filter, Search, X } from "lucide-react"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="w-full md:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Filters</h3>
              <Filter className="h-5 w-5" />
            </div>

            <div className="border-t pt-4 pb-2">
              <h4 className="font-medium mb-2">Categories</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="waterproofing"
                    className="mr-2"
                    onChange={() => addFilter("Waterproofing")}
                    checked={activeFilters.includes("Waterproofing")}
                  />
                  <label htmlFor="waterproofing">Waterproofing</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="concrete"
                    className="mr-2"
                    onChange={() => addFilter("Concrete Repair")}
                    checked={activeFilters.includes("Concrete Repair")}
                  />
                  <label htmlFor="concrete">Concrete Repair</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="flooring"
                    className="mr-2"
                    onChange={() => addFilter("Flooring")}
                    checked={activeFilters.includes("Flooring")}
                  />
                  <label htmlFor="flooring">Flooring</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="roofing"
                    className="mr-2"
                    onChange={() => addFilter("Roofing")}
                    checked={activeFilters.includes("Roofing")}
                  />
                  <label htmlFor="roofing">Roofing</label>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 pb-2">
              <h4 className="font-medium mb-2">Price Range</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="price1"
                    className="mr-2"
                    onChange={() => addFilter("Under EGP 100")}
                    checked={activeFilters.includes("Under EGP 100")}
                  />
                  <label htmlFor="price1">Under EGP 100</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="price2"
                    className="mr-2"
                    onChange={() => addFilter("EGP 100 - 250")}
                    checked={activeFilters.includes("EGP 100 - 250")}
                  />
                  <label htmlFor="price2">EGP 100 - 250</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="price3"
                    className="mr-2"
                    onChange={() => addFilter("EGP 250 - 500")}
                    checked={activeFilters.includes("EGP 250 - 500")}
                  />
                  <label htmlFor="price3">EGP 250 - 500</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="price4"
                    className="mr-2"
                    onChange={() => addFilter("Over EGP 500")}
                    checked={activeFilters.includes("Over EGP 500")}
                  />
                  <label htmlFor="price4">Over EGP 500</label>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 pb-2">
              <h4 className="font-medium mb-2">Brand</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="sika"
                    className="mr-2"
                    onChange={() => addFilter("Sika")}
                    checked={activeFilters.includes("Sika")}
                  />
                  <label htmlFor="sika">Sika</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="basf"
                    className="mr-2"
                    onChange={() => addFilter("BASF")}
                    checked={activeFilters.includes("BASF")}
                  />
                  <label htmlFor="basf">BASF</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="mapei"
                    className="mr-2"
                    onChange={() => addFilter("Mapei")}
                    checked={activeFilters.includes("Mapei")}
                  />
                  <label htmlFor="mapei">Mapei</label>
                </div>
              </div>
            </div>

            <Button className="w-full mt-4">Apply Filters</Button>
          </div>
        </div>

        <div className="w-full md:w-3/4">
          <div className="mb-6">
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <Button className="bg-red-600 hover:bg-red-700 text-white">Search</Button>
            </div>

            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeFilters.map((filter) => (
                  <div key={filter} className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    {filter}
                    <button onClick={() => removeFilter(filter)} className="ml-2 text-gray-500 hover:text-gray-700">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                <button onClick={() => setActiveFilters([])} className="text-sm text-red-600 hover:underline">
                  Clear all
                </button>
              </div>
            )}

            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">
                {searchQuery ? `Search results for "${searchQuery}"` : "All Products"}
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select className="border rounded-md p-2 text-sm">
                  <option>Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCard
              image="/placeholder.svg?height=300&width=300&text=SikaTop+Seal-107"
              title="SikaTop Seal-107"
              price="EGP 230"
              isBestseller={true}
              category="Waterproofing"
            />
            <ProductCard
              image="/placeholder.svg?height=300&width=300&text=Sika+MonoTop-610"
              title="Sika MonoTop-610"
              price="EGP 250"
              isBestseller={true}
              category="Concrete Repair"
            />
            <ProductCard
              image="/placeholder.svg?height=300&width=300&text=SikaFloor+Level"
              title="SikaFloor Level"
              price="EGP 230"
              isBestseller={true}
              category="Flooring"
            />
            <ProductCard
              image="/placeholder.svg?height=300&width=300&text=Sikaflex-11+FC+"
              title="Sikaflex-11 FC+"
              price="EGP 500"
              isBestseller={false}
              category="Sealants"
            />
            <ProductCard
              image="/placeholder.svg?height=300&width=300&text=Sika+Waterproof+Membrane"
              title="Sika Waterproof Membrane"
              price="EGP 350"
              isBestseller={false}
              category="Waterproofing"
            />
            <ProductCard
              image="/placeholder.svg?height=300&width=300&text=SikaBond+Adhesive"
              title="SikaBond Construction Adhesive"
              price="EGP 180"
              isBestseller={false}
              category="Adhesives"
            />
          </div>

          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" disabled>
                &lt;
              </Button>
              <Button variant="default" size="icon">
                1
              </Button>
              <Button variant="outline" size="icon">
                2
              </Button>
              <Button variant="outline" size="icon">
                3
              </Button>
              <Button variant="outline" size="icon">
                &gt;
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductCard({
  image,
  title,
  price,
  isBestseller,
  category,
}: {
  image: string
  title: string
  price: string
  isBestseller: boolean
  category: string
}) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      {isBestseller && (
        <div className="bg-yellow-200 text-black text-xs font-bold px-3 py-1 inline-block mb-2 ml-2 mt-2">
          Bestseller
        </div>
      )}
      <div className="p-4">
        <div className="aspect-square overflow-hidden mb-4">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={300}
            height={300}
            className="object-contain w-full h-full"
          />
        </div>
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
