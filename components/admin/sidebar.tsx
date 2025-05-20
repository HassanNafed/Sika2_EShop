"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Tag,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"

export default function AdminSidebar() {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    products: true,
    orders: true,
  })

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/")

  return (
    <div className="w-64 bg-white border-r h-full flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <Link href="/admin">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start",
              isActive("/admin") &&
                !isActive("/admin/products") &&
                !isActive("/admin/orders") &&
                !isActive("/admin/users") &&
                "bg-gray-100",
            )}
          >
            <LayoutDashboard className="mr-2 h-5 w-5" />
            Dashboard
          </Button>
        </Link>

        <Collapsible open={openSections.products} onOpenChange={() => toggleSection("products")}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn("w-full justify-start", isActive("/admin/products") && "bg-gray-100")}
            >
              <Package className="mr-2 h-5 w-5" />
              Products
              {openSections.products ? (
                <ChevronDown className="ml-auto h-5 w-5" />
              ) : (
                <ChevronRight className="ml-auto h-5 w-5" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-9 space-y-1">
            <Link href="/admin/products">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  isActive("/admin/products") && !isActive("/admin/products/new") && "bg-gray-100",
                )}
                size="sm"
              >
                All Products
              </Button>
            </Link>
            <Link href="/admin/products/new">
              <Button
                variant="ghost"
                className={cn("w-full justify-start", isActive("/admin/products/new") && "bg-gray-100")}
                size="sm"
              >
                Add New
              </Button>
            </Link>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={openSections.categories} onOpenChange={() => toggleSection("categories")}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn("w-full justify-start", isActive("/admin/categories") && "bg-gray-100")}
            >
              <Tag className="mr-2 h-5 w-5" />
              Categories
              {openSections.categories ? (
                <ChevronDown className="ml-auto h-5 w-5" />
              ) : (
                <ChevronRight className="ml-auto h-5 w-5" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-9 space-y-1">
            <Link href="/admin/categories">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  isActive("/admin/categories") && !isActive("/admin/categories/new") && "bg-gray-100",
                )}
                size="sm"
              >
                All Categories
              </Button>
            </Link>
            <Link href="/admin/categories/new">
              <Button
                variant="ghost"
                className={cn("w-full justify-start", isActive("/admin/categories/new") && "bg-gray-100")}
                size="sm"
              >
                Add New
              </Button>
            </Link>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={openSections.orders} onOpenChange={() => toggleSection("orders")}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className={cn("w-full justify-start", isActive("/admin/orders") && "bg-gray-100")}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Orders
              {openSections.orders ? (
                <ChevronDown className="ml-auto h-5 w-5" />
              ) : (
                <ChevronRight className="ml-auto h-5 w-5" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-9 space-y-1">
            <Link href="/admin/orders">
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  isActive("/admin/orders") && !pathname.match(/\/admin\/orders\/\d+/) && "bg-gray-100",
                )}
                size="sm"
              >
                All Orders
              </Button>
            </Link>
          </CollapsibleContent>
        </Collapsible>

        <Link href="/admin/users">
          <Button variant="ghost" className={cn("w-full justify-start", isActive("/admin/users") && "bg-gray-100")}>
            <Users className="mr-2 h-5 w-5" />
            Users
          </Button>
        </Link>

        <Link href="/admin/settings">
          <Button variant="ghost" className={cn("w-full justify-start", isActive("/admin/settings") && "bg-gray-100")}>
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
        </Link>
      </nav>

      <div className="p-4 border-t">
        <form action="/admin/logout" method="POST">
          <Button variant="ghost" className="w-full justify-start text-red-600" type="submit">
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </form>
      </div>
    </div>
  )
}
