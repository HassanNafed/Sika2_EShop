"use server"

import { revalidatePath } from "next/cache"
import { getServerClient } from "@/lib/supabase"

export async function createCategory(categoryData: any) {
  const supabase = getServerClient()

  const { error } = await supabase.from("categories").insert([categoryData])

  if (error) {
    console.error("Error creating category:", error)
    throw new Error("Failed to create category")
  }

  revalidatePath("/admin/categories")
  return { success: true }
}

export async function updateCategory(id: number, categoryData: any) {
  const supabase = getServerClient()

  const { error } = await supabase.from("categories").update(categoryData).eq("id", id)

  if (error) {
    console.error("Error updating category:", error)
    throw new Error("Failed to update category")
  }

  revalidatePath("/admin/categories")
  return { success: true }
}

export async function deleteCategory(id: number) {
  const supabase = getServerClient()

  const { error } = await supabase.from("categories").delete().eq("id", id)

  if (error) {
    console.error("Error deleting category:", error)
    throw new Error("Failed to delete category")
  }

  revalidatePath("/admin/categories")
  return { success: true }
}
