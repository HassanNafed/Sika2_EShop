"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  LogIn,
  UserPlus,
  LogOut,
  Package,
  Settings,
  ShoppingBag,
  Home,
  Phone,
  Info,
} from "lucide-react"
import { getBrowserClient } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [categories, setCategories] = useState<any[]>([])
  const pathname = usePathname()
  const { user, signOut, isAdmin } = useAuth()
  const cart = useCart()
  const itemCount = cart ? cart.itemCount : 0

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      const supabase = getBrowserClient()
      const { data } = await supabase.from("categories").select("*").order("name")
      if (data) {
        setCategories(data)
      }
    }

    fetchCategories()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      {/* Top Bar */}
      <div className="bg-red-600 text-white py-1">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-sm hidden md:block">Welcome to Sika Construction Materials</div>
          <div className="flex items-center space-x-4 text-sm">
            {user ? (
              <Link href="/account" className="hover:underline flex items-center">
                <User className="h-3 w-3 mr-1" />
                My Profile
              </Link>
            ) : (
              <>
                <Link href="/auth/login" className="hover:underline flex items-center">
                  <LogIn className="h-3 w-3 mr-1" />
                  Sign In
                </Link>
                <Link href="/auth/register" className="hover:underline flex items-center">
                  <UserPlus className="h-3 w-3 mr-1" />
                  Register
                </Link>
              </>
            )}
            <Link href="/contact" className="hover:underline flex items-center">
              <Phone className="h-3 w-3 mr-1" />
              Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image src="/sika-logo.png" alt="Sika Logo" width={100} height={30} priority />
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                className="pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/account/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account" className="w-full flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/orders" className="w-full flex items-center">
                      <Package className="mr-2 h-4 w-4" />
                      <span>Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/wishlist" className="w-full flex items-center">
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Wishlist</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/addresses" className="w-full flex items-center">
                      <Home className="mr-2 h-4 w-4" />
                      <span>Addresses</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/payment-methods" className="w-full flex items-center">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      <span>Payment Methods</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/notifications" className="w-full flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Notifications</span>
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="w-full flex items-center">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Admin Panel</span>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/auth/login" className="w-full flex items-center">
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Login</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/auth/register" className="w-full flex items-center">
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span>Register</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center space-x-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>
                    <form onSubmit={handleSearch} className="mt-4 mb-6">
                      <div className="relative w-full">
                        <Input
                          type="text"
                          placeholder="Search products..."
                          className="pr-10"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                          type="submit"
                          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                        >
                          <Search className="h-4 w-4" />
                        </button>
                      </div>
                    </form>
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <div className="space-y-4">
                    <SheetClose asChild>
                      <Link href="/" className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100">
                        <Home className="mr-2 h-5 w-5" />
                        <span>Home</span>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/products" className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100">
                        <Package className="mr-2 h-5 w-5" />
                        <span>Products</span>
                      </Link>
                    </SheetClose>
                    <div className="py-2 px-3">
                      <div className="font-medium mb-2">Categories</div>
                      <div className="space-y-2 ml-7">
                        {categories.map((category) => (
                          <SheetClose key={category.id} asChild>
                            <Link
                              href={`/products?category=${category.slug}`}
                              className="block py-1 hover:text-red-600"
                            >
                              {category.name}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </div>
                    <SheetClose asChild>
                      <Link
                        href="/account/wishlist"
                        className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100"
                      >
                        <Heart className="mr-2 h-5 w-5" />
                        <span>Wishlist</span>
                      </Link>
                    </SheetClose>
                    {user ? (
                      <>
                        <SheetClose asChild>
                          <Link href="/account" className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100">
                            <User className="mr-2 h-5 w-5" />
                            <span>My Account</span>
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link
                            href="/account/orders"
                            className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100"
                          >
                            <Package className="mr-2 h-5 w-5" />
                            <span>Orders</span>
                          </Link>
                        </SheetClose>
                        {isAdmin && (
                          <SheetClose asChild>
                            <Link href="/admin" className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100">
                              <Settings className="mr-2 h-5 w-5" />
                              <span>Admin Panel</span>
                            </Link>
                          </SheetClose>
                        )}
                        <button
                          onClick={() => signOut()}
                          className="w-full flex items-center py-2 px-3 rounded-md hover:bg-gray-100 text-red-600"
                        >
                          <LogOut className="mr-2 h-5 w-5" />
                          <span>Log out</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <SheetClose asChild>
                          <Link href="/auth/login" className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100">
                            <LogIn className="mr-2 h-5 w-5" />
                            <span>Login</span>
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link
                            href="/auth/register"
                            className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100"
                          >
                            <UserPlus className="mr-2 h-5 w-5" />
                            <span>Register</span>
                          </Link>
                        </SheetClose>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-gray-100 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-6 py-1">
            <Link
              href="/"
              className={`flex items-center text-sm font-medium ${
                pathname === "/" ? "text-red-600" : "text-gray-700 hover:text-red-600"
              }`}
            >
              <Home className="mr-1 h-4 w-4" />
              Home
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={`text-sm font-medium ${
                      pathname.startsWith("/products") ? "text-red-600" : "text-gray-700"
                    } bg-transparent hover:bg-transparent focus:bg-transparent`}
                  >
                    <Package className="mr-1 h-4 w-4" />
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 gap-3 p-4 w-[400px]">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/products?category=${category.slug}`}
                          className="flex flex-col space-y-1 p-3 rounded-md hover:bg-gray-100"
                        >
                          <div className="font-medium">{category.name}</div>
                          <div className="text-xs text-gray-500 line-clamp-2">{category.description}</div>
                        </Link>
                      ))}
                      <Link
                        href="/products"
                        className="flex items-center justify-center p-3 bg-red-50 text-red-600 rounded-md hover:bg-red-100 col-span-2 mt-2"
                      >
                        View All Products
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Link
              href="/contact"
              className={`flex items-center text-sm font-medium ${
                pathname === "/contact" ? "text-red-600" : "text-gray-700 hover:text-red-600"
              }`}
            >
              <Phone className="mr-1 h-4 w-4" />
              Contact
            </Link>
            <Link
              href="/about"
              className={`flex items-center text-sm font-medium ${
                pathname === "/about" ? "text-red-600" : "text-gray-700 hover:text-red-600"
              }`}
            >
              <Info className="mr-1 h-4 w-4" />
              About Us
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
