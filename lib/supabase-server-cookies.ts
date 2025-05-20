import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

// This file should ONLY be imported in Server Components or Route Handlers
// It uses next/headers which is not compatible with Client Components

export function getServerClient() {
  const cookieStore = cookies()

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
      },
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: { path: string; maxAge: number; domain?: string }) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: { path: string; domain?: string }) {
          cookieStore.set({ name, value: "", ...options, maxAge: 0 })
        },
      },
    },
  )
}

// Keep the original function for backward compatibility
export function getServerClientWithCookies() {
  return getServerClient()
}
