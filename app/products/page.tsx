"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Filter, Grid3X3, LayoutList } from "lucide-react"
import { getBrowserClient } from "@/lib/supabase"
import { ProductCard } from "@/components/product-card"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categorySlug = searchParams.get("category")
  const searchQuery = searchParams.get("q")

  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("newest")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categorySlug ? [categorySlug] : [])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)
  const productsPerPage = 12

  useEffect(() => {
    const fetchCategories = async () => {
      const supabase = getBrowserClient()
      const { data } = await supabase.from("categories").select("*").order("name")
      if (data) {
        setCategories(data)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      const supabase = getBrowserClient()

      // Start building the query
      let query = supabase.from("products").select(
        `
          *,
          categories (
            id,
            name,
            slug
          )
        `,
        { count: "exact" },
      )

      // Apply category filter
      if (selectedCategories.length > 0) {
        query = query.in(
          "category_id",
          categories.filter((c) => selectedCategories.includes(c.slug)).map((c) => c.id),
        )
      }

      // Apply search filter
      if (searchQuery) {
        query = query.ilike("name", `%${searchQuery}%`)
      }

      // Apply price filter
      query = query.gte("price", priceRange[0]).lte("price", priceRange[1])

      // Apply sorting
      switch (sortBy) {
        case "price-low-high":
          query = query.order("price", { ascending: true })
          break
        case "price-high-low":
          query = query.order("price", { ascending: false })
          break
        case "name-a-z":
          query = query.order("name", { ascending: true })
          break
        case "name-z-a":
          query = query.order("name", { ascending: false })
          break
        case "bestselling":
          query = query.order("is_bestseller", { ascending: false }).order("id", { ascending: false })
          break
        case "newest":
        default:
          query = query.order("id", { ascending: false })
          break
      }

      // Apply pagination
      const from = (currentPage - 1) * productsPerPage
      const to = from + productsPerPage - 1
      query = query.range(from, to)

      // Execute the query
      const { data, count, error } = await query

      if (error) {
        console.error("Error fetching products:", error)
      } else {
        setProducts(data || [])
        setTotalProducts(count || 0)
        setTotalPages(Math.ceil((count || 0) / productsPerPage))
      }

      setLoading(false)
    }

    // Only fetch if we have categories loaded
    if (categories.length > 0) {
      fetchProducts()
    }
  }, [categories, selectedCategories, searchQuery, sortBy, priceRange, currentPage])

  const handleCategoryChange = (slug: string) => {
    setSelectedCategories((prev) => (prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]))
    setCurrentPage(1)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    setCurrentPage(1)
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Filters</h2>
              <Filter className="h-5 w-5" />
            </div>

            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <Checkbox
                        id={`category-${category.slug}`}
                        checked={selectedCategories.includes(category.slug)}
                        onCheckedChange={() => handleCategoryChange(category.slug)}
                      />
                      <Label htmlFor={`category-${category.slug}`} className="ml-2 text-sm cursor-pointer">
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <Slider
                  defaultValue={[0, 1000]}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={handlePriceChange}
                  className="my-6"
                />
                <div className="flex items-center justify-between">
                  <span>EGP {priceRange[0]}</span>
                  <span>EGP {priceRange[1]}</span>
                </div>
              </div>

              {/* Other Filters */}
              <div>
                <h3 className="font-medium mb-3">Availability</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox id="in-stock" />
                    <Label htmlFor="in-stock" className="ml-2 text-sm cursor-pointer">
                      In Stock
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="on-sale" />
                    <Label htmlFor="on-sale" className="ml-2 text-sm cursor-pointer">
                      On Sale
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="w-full md:w-3/4">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold">
                  {searchQuery
                    ? `Search Results for "${searchQuery}"`
                    : selectedCategories.length > 0
                      ? `${
                          categories.find((c) => c.slug === selectedCategories[0])?.name || "Products"
                        } ${selectedCategories.length > 1 ? "& more" : ""}`
                      : "All Products"}
                </h1>
                <p className="text-sm text-gray-500">
                  Showing {products.length} of {totalProducts} products
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    className="rounded-r-none"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    className="rounded-l-none"
                    onClick={() => setViewMode("list")}
                  >
                    <LayoutList className="h-4 w-4" />
                  </Button>
                </div>

                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                    <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                    <SelectItem value="name-a-z">Name: A to Z</SelectItem>
                    <SelectItem value="name-z-a">Name: Z to A</SelectItem>
                    <SelectItem value="bestselling">Best Selling</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="aspect-square bg-gray-200 animate-pulse"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                    <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col sm:flex-row"
                    >
                      <div className="sm:w-1/3">
                        <Link href={`/products/${product.slug}`}>
                          <div className="aspect-square">
                            <Image
                              src={
                                product.image_url ||
                                `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(product.name) || "/placeholder.svg"}`
                              }
                              alt={product.name}
                              width={300}
                              height={300}
                              className="object-contain w-full h-full"
                            />
                          </div>
                        </Link>
                      </div>
                      <div className="p-4 sm:w-2/3">
                        <div className="mb-2">
                          <span className="text-xs text-gray-500">{product.categories?.name || "Uncategorized"}</span>
                        </div>
                        <Link href={`/products/${product.slug}`}>
                          <h3 className="font-bold text-lg mb-2 hover:text-red-600">{product.name}</h3>
                        </Link>
                        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between">
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
                          <Button className="bg-red-600 hover:bg-red-700 text-white">Add to Cart</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage > 1) handlePageChange(currentPage - 1)
                        }}
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1
                      // Show first page, last page, current page, and pages around current page
                      if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              isActive={page === currentPage}
                              onClick={(e) => {
                                e.preventDefault()
                                handlePageChange(page)
                              }}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      } else if (
                        (page === currentPage - 2 && currentPage > 3) ||
                        (page === currentPage + 2 && currentPage < totalPages - 2)
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )
                      }
                      return null
                    })}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage < totalPages) handlePageChange(currentPage + 1)
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-xl font-bold mb-2">No products found</h2>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria.</p>
              <Button
                onClick={() => {
                  setSelectedCategories([])
                  setPriceRange([0, 1000])
                  setSortBy("newest")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
