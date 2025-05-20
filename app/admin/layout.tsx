import type React from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerClient } from "@/lib/supabase"
import { LayoutDashboard, Package, ShoppingCart, Users, Store, MessageSquare, LogOut, ChevronRight } from "lucide-react"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = getServerClient()

  // Check if user is authenticated and is an admin
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/admin/login")
  }

  // Get user details to check role
  const { data: user } = await supabase.from("users").select("role").eq("id", session.user.id).single()

  // If user is not an admin, redirect to home
  if (!user || user.role !== "admin") {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6">
          <Link href="/admin" className="text-xl font-bold text-red-600">
            Admin Panel
          </Link>
        </div>
        <nav className="mt-6">
          <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Main</div>
          <NavItem href="/admin" icon={<LayoutDashboard size={18} />} label="Dashboard" />
          <NavItem href="/admin/products" icon={<Package size={18} />} label="Products" />
          <NavItem href="/admin/categories" icon={<Store size={18} />} label="Categories" />
          <NavItem href="/admin/orders" icon={<ShoppingCart size={18} />} label="Orders" />
          <NavItem href="/admin/users" icon={<Users size={18} />} label="Users" />
          <NavItem href="/admin/distributors" icon={<Store size={18} />} label="Distributors" />
          <NavItem href="/admin/testimonials" icon={<MessageSquare size={18} />} label="Testimonials" />

          <div className="px-4 py-2 mt-6 text-xs font-semibold text-gray-400 uppercase">Account</div>
          <form action="/api/auth/signout" method="post">
            <button type="submit" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 w-full">
              <LogOut size={18} className="mr-3" />
              <span>Sign Out</span>
            </button>
          </form>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center text-sm text-gray-500">
              <Link href="/" className="hover:text-gray-700">
                Website
              </Link>
              <ChevronRight size={14} className="mx-1" />
              <Link href="/admin" className="hover:text-gray-700">
                Admin
              </Link>
            </div>
            <div>
              <span className="text-sm text-gray-600">Welcome, {session.user.email}</span>
            </div>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100">
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </Link>
  )
}
