import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for the browser
let browserClient: ReturnType<typeof createClient> | null = null

export function getBrowserClient() {
  if (!browserClient) {
    browserClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  }
  return browserClient
}
