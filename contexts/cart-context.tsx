"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { getBrowserClient } from "@/lib/supabase"
import { useAuth } from "./auth-context"

export type CartItem = {
  id: number
  product_id: number
  quantity: number
  name: string
  price: number
  image_url: string
  slug: string
}

type CartContextType = {
  items: CartItem[]
  addItem: (product: any, quantity: number) => Promise<void>
  removeItem: (productId: number) => Promise<void>
  updateQuantity: (productId: number, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  isLoading: boolean
  subtotal: number
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const supabase = getBrowserClient()

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal + (subtotal > 0 ? 50 : 0) // Add shipping if cart not empty
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)

  // Load cart items from local storage or database
  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true)

      if (user) {
        // If logged in, load from database
        const { data, error } = await supabase
          .from("cart_items")
          .select(
            `
            id,
            product_id,
            quantity,
            products (
              name,
              price,
              image_url,
              slug
            )
          `,
          )
          .eq("user_id", user.id)

        if (!error && data) {
          const cartItems: CartItem[] = data.map((item) => ({
            id: item.id,
            product_id: item.product_id,
            quantity: item.quantity,
            name: item.products.name,
            price: item.products.price,
            image_url: item.products.image_url,
            slug: item.products.slug,
          }))
          setItems(cartItems)
        }
      } else {
        // If not logged in, load from local storage
        const storedCart = localStorage.getItem("cart")
        if (storedCart) {
          setItems(JSON.parse(storedCart))
        }
      }

      setIsLoading(false)
    }

    loadCart()
  }, [user, supabase])

  // Save cart to local storage when it changes
  useEffect(() => {
    if (!user && !isLoading) {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items, user, isLoading])

  // Add item to cart
  const addItem = async (product: any, quantity: number) => {
    // Check if item already exists in cart
    const existingItemIndex = items.findIndex((item) => item.product_id === product.id)

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      await updateQuantity(product.id, items[existingItemIndex].quantity + quantity)
    } else {
      // Add new item
      const newItem: CartItem = {
        id: Date.now(), // Temporary ID for local storage
        product_id: product.id,
        quantity,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        slug: product.slug,
      }

      if (user) {
        // If logged in, save to database
        const { data, error } = await supabase
          .from("cart_items")
          .insert({
            user_id: user.id,
            product_id: product.id,
            quantity,
          })
          .select()

        if (!error && data && data[0]) {
          newItem.id = data[0].id
        }
      }

      setItems([...items, newItem])
    }
  }

  // Remove item from cart
  const removeItem = async (productId: number) => {
    const itemToRemove = items.find((item) => item.product_id === productId)

    if (!itemToRemove) return

    if (user) {
      // If logged in, remove from database
      await supabase.from("cart_items").delete().eq("user_id", user.id).eq("product_id", productId)
    }

    setItems(items.filter((item) => item.product_id !== productId))
  }

  // Update item quantity
  const updateQuantity = async (productId: number, quantity: number) => {
    if (quantity < 1) {
      await removeItem(productId)
      return
    }

    if (user) {
      // If logged in, update in database
      await supabase.from("cart_items").update({ quantity }).eq("user_id", user.id).eq("product_id", productId)
    }

    setItems(items.map((item) => (item.product_id === productId ? { ...item, quantity } : item)))
  }

  // Clear cart
  const clearCart = async () => {
    if (user) {
      // If logged in, clear from database
      await supabase.from("cart_items").delete().eq("user_id", user.id)
    }

    setItems([])
  }

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isLoading,
    subtotal,
    total,
    itemCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
