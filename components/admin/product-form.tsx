"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Loader2 } from "lucide-react"
import { getBrowserClient } from "@/lib/supabase"

interface Category {
  id: number
  name: string
}

interface ProductFormProps {
  product?: any
  isEditing?: boolean
}

export default function ProductForm({ product, isEditing = false }: ProductFormProps) {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    description: product?.description || "",
    features: product?.features || "",
    price: product?.price || "",
    sale_price: product?.sale_price || "",
    sku: product?.sku || "",
    stock_quantity: product?.stock_quantity || 0,
    category_id: product?.category_id || "",
    image_url: product?.image_url || "",
    is_featured: product?.is_featured || false,
    is_bestseller: product?.is_bestseller || false,
  })

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      const supabase = getBrowserClient()
      const { data } = await supabase.from("categories").select("id, name").order("name")
      if (data) {
        setCategories(data)
      }
    }

    fetchCategories()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: Number.parseFloat(value) || 0 }))
  }

  const generateSlug = () => {
    const slug = formData.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")

    setFormData((prev) => ({ ...prev, slug }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = getBrowserClient()

      // Prepare data
      const productData = {
        ...formData,
        price: Number.parseFloat(formData.price.toString()),
        sale_price: formData.sale_price ? Number.parseFloat(formData.sale_price.toString()) : null,
        stock_quantity: Number.parseInt(formData.stock_quantity.toString()),
        category_id: Number.parseInt(formData.category_id.toString()),
      }

      if (isEditing) {
        // Update existing product
        const { error } = await supabase.from("products").update(productData).eq("id", product.id)

        if (error) throw error
      } else {
        // Create new product
        const { error } = await supabase.from("products").insert(productData)

        if (error) throw error
      }

      // Redirect to products page
      router.push("/admin/products")
      router.refresh()
    } catch (error: any) {
      console.error("Error saving product:", error)
      setError(error.message || "Failed to save product")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="flex space-x-2">
            <div className="flex-1">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} required />
            </div>
            <div className="flex items-end">
              <Button type="button" variant="outline" onClick={generateSlug}>
                Generate
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="features">Features (one per line)</Label>
            <Textarea
              id="features"
              name="features"
              value={formData.features}
              onChange={handleChange}
              rows={4}
              placeholder="Enter each feature on a new line"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="category_id">Category</Label>
            <Select
              value={formData.category_id.toString()}
              onValueChange={(value) => handleSelectChange("category_id", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price (EGP)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleNumberChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="sale_price">Sale Price (EGP)</Label>
              <Input
                id="sale_price"
                name="sale_price"
                type="number"
                step="0.01"
                value={formData.sale_price}
                onChange={handleNumberChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sku">SKU</Label>
              <Input id="sku" name="sku" value={formData.sku} onChange={handleChange} />
            </div>

            <div>
              <Label htmlFor="stock_quantity">Stock Quantity</Label>
              <Input
                id="stock_quantity"
                name="stock_quantity"
                type="number"
                value={formData.stock_quantity}
                onChange={handleNumberChange}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex items-center space-x-8 pt-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="is_featured"
                checked={formData.is_featured}
                onCheckedChange={(checked) => handleSwitchChange("is_featured", checked)}
              />
              <Label htmlFor="is_featured">Featured Product</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_bestseller"
                checked={formData.is_bestseller}
                onCheckedChange={(checked) => handleSwitchChange("is_bestseller", checked)}
              />
              <Label htmlFor="is_bestseller">Bestseller</Label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEditing ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  )
}
