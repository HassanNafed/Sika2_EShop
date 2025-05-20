"use server"

import { getServerClientWithCookies } from "@/lib/supabase-server-cookies"
import { redirect } from "next/navigation"

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const supabase = getServerClientWithCookies()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  redirect("/account")
}

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string

  const supabase = getServerClientWithCookies()

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  // Create a user record in our users table
  await supabase.from("users").insert({
    id: data.user?.id,
    email,
    name,
    role: "customer",
  })

  redirect("/account")
}

export async function signOut() {
  const supabase = getServerClientWithCookies()
  await supabase.auth.signOut()
  redirect("/")
}
