"use server"

import { revalidatePath } from "next/cache"
import { getServerClient } from "@/lib/supabase"

export async function createProduct(productData: any) {
  const supabase = getServerClient()

  const { error } = await supabase.from("products").insert([productData])

  if (error) {
    console.error("Error creating product:", error)
    throw new Error("Failed to create product")
  }

  revalidatePath("/admin/products")
  return { success: true }
}

export async function updateProduct(id: number, productData: any) {
  const supabase = getServerClient()

  const { error } = await supabase.from("products").update(productData).eq("id", id)

  if (error) {
    console.error("Error updating product:", error)
    throw new Error("Failed to update product")
  }

  revalidatePath("/admin/products")
  revalidatePath(`/products/${productData.slug}`)
  return { success: true }
}

export async function deleteProduct(id: number) {
  const supabase = getServerClient()

  const { error } = await supabase.from("products").delete().eq("id", id)

  if (error) {
    console.error("Error deleting product:", error)
    throw new Error("Failed to delete product")
  }

  revalidatePath("/admin/products")
  return { success: true }
}
