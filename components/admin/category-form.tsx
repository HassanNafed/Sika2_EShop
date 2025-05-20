"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { getBrowserClient } from "@/lib/supabase"

interface CategoryFormProps {
  category?: any
  isEditing?: boolean
}

export default function CategoryForm({ category, isEditing = false }: CategoryFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: category?.name || "",
    slug: category?.slug || "",
    description: category?.description || "",
    image_url: category?.image_url || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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

      if (isEditing) {
        // Update existing category
        const { error } = await supabase.from("categories").update(formData).eq("id", category.id)

        if (error) throw error
      } else {
        // Create new category
        const { error } = await supabase.from("categories").insert(formData)

        if (error) throw error
      }

      // Redirect to categories page
      router.push("/admin/categories")
      router.refresh()
    } catch (error: any) {
      console.error("Error saving category:", error)
      setError(error.message || "Failed to save category")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">{error}</div>}

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Category Name</Label>
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
          <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} />
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
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEditing ? "Update Category" : "Create Category"}
        </Button>
      </div>
    </form>
  )
}
