"use server"

import { revalidatePath } from "next/cache"
import { getServerClient } from "@/lib/supabase"

export async function updateOrderStatus(id: number, status: string) {
  const supabase = getServerClient()

  const { error } = await supabase
    .from("orders")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)

  if (error) {
    console.error("Error updating order status:", error)
    throw new Error("Failed to update order status")
  }

  revalidatePath(`/admin/orders/${id}`)
  revalidatePath("/admin/orders")
  return { success: true }
}
