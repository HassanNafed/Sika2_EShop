"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { getBrowserClient } from "@/lib/supabase"
import { useAuth } from "./auth-context"

export type WishlistItem = {
  id: number
  product_id: number
  name: string
  price: number
  image_url: string
  slug: string
  category: string
  inStock: boolean
}

type WishlistContextType = {
  items: WishlistItem[]
  addItem: (product: any) => Promise<void>
  removeItem: (productId: number) => Promise<void>
  isInWishlist: (productId: number) => boolean
  isLoading: boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const supabase = getBrowserClient()

  // Load wishlist items from local storage or database
  useEffect(() => {
    const loadWishlist = async () => {
      setIsLoading(true)

      if (user) {
        // If logged in, load from database
        const { data, error } = await supabase
          .from("wishlist_items")
          .select(
            `
            id,
            product_id,
            products (
              name,
              price,
              image_url,
              slug,
              stock_quantity,
              categories (
                name
              )
            )
          `,
          )
          .eq("user_id", user.id)

        if (!error && data) {
          const wishlistItems: WishlistItem[] = data.map((item) => ({
            id: item.id,
            product_id: item.product_id,
            name: item.products.name,
            price: item.products.price,
            image_url: item.products.image_url,
            slug: item.products.slug,
            category: item.products.categories?.name || "Uncategorized",
            inStock: item.products.stock_quantity > 0,
          }))
          setItems(wishlistItems)
        }
      } else {
        // If not logged in, load from local storage
        const storedWishlist = localStorage.getItem("wishlist")
        if (storedWishlist) {
          setItems(JSON.parse(storedWishlist))
        }
      }

      setIsLoading(false)
    }

    loadWishlist()
  }, [user, supabase])

  // Save wishlist to local storage when it changes
  useEffect(() => {
    if (!user && !isLoading) {
      localStorage.setItem("wishlist", JSON.stringify(items))
    }
  }, [items, user, isLoading])

  // Add item to wishlist
  const addItem = async (product: any) => {
    // Check if item already exists in wishlist
    if (isInWishlist(product.id)) return

    // Add new item
    const newItem: WishlistItem = {
      id: Date.now(), // Temporary ID for local storage
      product_id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      slug: product.slug,
      category: product.categories?.name || "Uncategorized",
      inStock: product.stock_quantity > 0,
    }

    if (user) {
      // If logged in, save to database
      const { data, error } = await supabase
        .from("wishlist_items")
        .insert({
          user_id: user.id,
          product_id: product.id,
        })
        .select()

      if (!error && data && data[0]) {
        newItem.id = data[0].id
      }
    }

    setItems([...items, newItem])
  }

  // Remove item from wishlist
  const removeItem = async (productId: number) => {
    if (user) {
      // If logged in, remove from database
      await supabase.from("wishlist_items").delete().eq("user_id", user.id).eq("product_id", productId)
    }

    setItems(items.filter((item) => item.product_id !== productId))
  }

  // Check if item is in wishlist
  const isInWishlist = (productId: number) => {
    return items.some((item) => item.product_id === productId)
  }

  const value = {
    items,
    addItem,
    removeItem,
    isInWishlist,
    isLoading,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
