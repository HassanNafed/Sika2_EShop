"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Filter, Search, X, Heart, ChevronDown, ChevronUp } from "lucide-react"
import { getBrowserClient } from "@/lib/supabase"

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Categories", "Price Range"])
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const supabase = getBrowserClient()

      // Fetch categories
      const { data: categoriesData } = await supabase.from("categories").select("id, name, slug").order("name")

      if (categoriesData) {
        setCategories(categoriesData)
      }

      // Build query for products
      let query = supabase
        .from("products")
        .select(`
          *,
          categories (
            name,
            slug
          )
        `)
        .order("created_at", { ascending: false })

      // Apply category filters if any
      const categoryFilters = activeFilters.filter((filter) => categoriesData?.some((cat) => cat.name === filter))

      if (categoryFilters.length > 0) {
        const categoryIds = categoriesData?.filter((cat) => categoryFilters.includes(cat.name)).map((cat) => cat.id)

        query = query.in("category_id", categoryIds)
      }

      // Apply price filters if any
      const priceFilters = activeFilters.filter((filter) => filter.includes("EGP") || filter.includes("Under"))

      if (priceFilters.length > 0) {
        priceFilters.forEach((filter) => {
          if (filter === "Under EGP 100") {
            query = query.lt("price", 100)
          } else if (filter === "EGP 100 - 250") {
            query = query.gte("price", 100).lte("price", 250)
          } else if (filter === "EGP 250 - 500") {
            query = query.gte("price", 250).lte("price", 500)
          } else if (filter === "Over EGP 500") {
            query = query.gt("price", 500)
          }
        })
      }

      // Apply search query if any
      if (searchQuery) {
        query = query.ilike("name", `%${searchQuery}%`)
      }

      const { data: productsData } = await query

      if (productsData) {
        setProducts(productsData)
      }

      setLoading(false)
    }

    fetchData()
  }, [activeFilters, searchQuery])

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  const toggleCategory = (category: string) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter((c) => c !== category))
    } else {
      setExpandedCategories([...expandedCategories, category])
    }
  }

  const isCategoryExpanded = (category: string) => {
    return expandedCategories.includes(category)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // The useEffect will handle the search
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
              <div
                className="flex items-center justify-between cursor-pointer mb-2"
                onClick={() => toggleCategory("Categories")}
              >
                <h4 className="font-medium">Categories</h4>
                {isCategoryExpanded("Categories") ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
              {isCategoryExpanded("Categories") && (
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${category.id}`}
                        className="mr-2"
                        onChange={() => addFilter(category.name)}
                        checked={activeFilters.includes(category.name)}
                      />
                      <label htmlFor={`category-${category.id}`}>{category.name}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t pt-4 pb-2">
              <div
                className="flex items-center justify-between cursor-pointer mb-2"
                onClick={() => toggleCategory("Price Range")}
              >
                <h4 className="font-medium">Price Range</h4>
                {isCategoryExpanded("Price Range") ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
              {isCategoryExpanded("Price Range") && (
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
              )}
            </div>

            <Button className="w-full mt-4" onClick={() => {}}>
              Apply Filters
            </Button>
          </div>
        </div>

        <div className="w-full md:w-3/4">
          <div className="mb-6">
            <form onSubmit={handleSearch} className="flex gap-4 mb-4">
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
              <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
                Search
              </Button>
            </form>

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

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md h-80 animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard
                    key={product.id}
                    image={
                      product.image_url ||
                      `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(product.name)}`
                    }
                    title={product.name}
                    price={`EGP ${product.price}`}
                    isBestseller={product.is_bestseller}
                    category={product.categories?.name || "Uncategorized"}
                    slug={product.slug}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-gray-500">No products found matching your criteria.</p>
                </div>
              )}
            </div>
          )}
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
  slug,
}: {
  image: string
  title: string
  price: string
  isBestseller: boolean
  category: string
  slug: string
}) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        {isBestseller && (
          <div className="absolute top-2 left-2 bg-yellow-200 text-black text-xs font-bold px-3 py-1 rounded-full">
            Bestseller
          </div>
        )}
        <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
          <Heart className="h-5 w-5 text-gray-400 hover:text-red-600" />
        </button>
        <Link href={`/products/${slug}`}>
          <div className="aspect-square overflow-hidden p-4">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              width={300}
              height={300}
              className="object-contain w-full h-full"
            />
          </div>
        </Link>
      </div>
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-gray-500">{category}</span>
        </div>
        <Link href={`/products/${slug}`}>
          <h3 className="font-bold text-lg mb-1 hover:text-red-600">{title}</h3>
        </Link>
        <p className="text-gray-700 mb-4">{price}</p>
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
