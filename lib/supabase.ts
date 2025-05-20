import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for the browser
let browserClient: ReturnType<typeof createClient> | null = null

export function getBrowserClient() {
  if (!browserClient) {
    browserClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  }
  return browserClient
}

// For server components
export function getServerClient() {
  return createClient(
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
      },
    },
  )
}

// Keep the createServerClient function for backward compatibility
export function createServerClient() {
  return getServerClient()
}
