"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { getBrowserClient } from "@/lib/supabase"
import type { Session, User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any | null }>
  signUp: (email: string, password: string, name: string, phone?: string) => Promise<{ error: any | null }>
  signOut: () => Promise<void>
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()
  const supabase = getBrowserClient()

  useEffect(() => {
    const getSession = async () => {
      setIsLoading(true)
      const {
        data: { session },
      } = await supabase.auth.getSession()

      setSession(session)
      setUser(session?.user || null)

      if (session?.user) {
        // Check if user is admin
        const { data } = await supabase.from("users").select("role").eq("id", session.user.id).single()
        setIsAdmin(data?.role === "admin")
      }

      setIsLoading(false)

      // Listen for auth changes
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        setSession(session)
        setUser(session?.user || null)

        if (session?.user) {
          // Check if user is admin
          const { data } = await supabase.from("users").select("role").eq("id", session.user.id).single()
          setIsAdmin(data?.role === "admin")
        } else {
          setIsAdmin(false)
        }

        router.refresh()
      })

      return () => {
        authListener.subscription.unsubscribe()
      }
    }

    getSession()
  }, [router, supabase])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    return { error }
  }

  const signUp = async (email: string, password: string, name: string, phone?: string) => {
    // First register the user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error || !data.user) {
      return { error }
    }

    // Then create a record in our users table
    const { error: profileError } = await supabase.from("users").insert({
      id: data.user.id,
      email,
      name,
      phone,
      role: "customer", // Default role
    })

    return { error: profileError }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    isAdmin,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
