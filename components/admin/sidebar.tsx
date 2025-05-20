"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  MapPin,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export default function AdminSidebar() {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<string[]>(["products"])

  const toggleMenu = (menu: string) => {
    if (openMenus.includes(menu)) {
      setOpenMenus(openMenus.filter((item) => item !== menu))
    } else {
      setOpenMenus([...openMenus, menu])
    }
  }

  const isMenuOpen = (menu: string) => openMenus.includes(menu)

  const isActive = (path: string) => pathname === path

  const menuItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Products",
      icon: <Package className="h-5 w-5" />,
      submenu: true,
      submenuItems: [
        { title: "All Products", href: "/admin/products" },
        { title: "Add Product", href: "/admin/products/new" },
        { title: "Categories", href: "/admin/categories" },
      ],
    },
    {
      title: "Orders",
      icon: <ShoppingCart className="h-5 w-5" />,
      submenu: true,
      submenuItems: [
        { title: "All Orders", href: "/admin/orders" },
        { title: "Pending", href: "/admin/orders?status=pending" },
        { title: "Processing", href: "/admin/orders?status=processing" },
        { title: "Completed", href: "/admin/orders?status=completed" },
      ],
    },
    {
      title: "Customers",
      href: "/admin/customers",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Distributors",
      href: "/admin/distributors",
      icon: <MapPin className="h-5 w-5" />,
    },
    {
      title: "Projects",
      href: "/admin/projects",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Testimonials",
      href: "/admin/testimonials",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className="hidden md:flex md:w-64 md:flex-col h-full">
      <div className="flex flex-col flex-grow pt-5 bg-white border-r overflow-y-auto">
        <div className="flex items-center justify-center px-4 mb-6">
          <Link href="/admin" className="flex items-center">
            <Image src="/sika-logo.png" alt="Sika Admin" width={40} height={40} className="h-8 w-auto" />
            <span className="ml-2 text-xl font-bold">Admin Panel</span>
          </Link>
        </div>
        <nav className="flex-1 px-2 pb-4 space-y-1">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.title.toLowerCase())}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md group",
                      pathname.includes(`/admin/${item.title.toLowerCase()}`)
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700 hover:bg-gray-50",
                    )}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-3">{item.title}</span>
                    </div>
                    {isMenuOpen(item.title.toLowerCase()) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {isMenuOpen(item.title.toLowerCase()) && (
                    <div className="pl-10 mt-1 space-y-1">
                      {item.submenuItems?.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className={cn(
                            "block px-3 py-2 text-sm font-medium rounded-md",
                            isActive(subItem.href) ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50",
                          )}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                    isActive(item.href) ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50",
                  )}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
        <div className="p-4 border-t">
          <Link
            href="/admin/logout"
            className="flex items-center px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            <span className="ml-3">Logout</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
