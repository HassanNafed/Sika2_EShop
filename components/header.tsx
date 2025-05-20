"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search, ShoppingCart, User, Menu, X, Heart, ChevronDown, Phone, MapPin, Mail, Bell } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-gray-100 py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                <span>+20 2 1234 5678</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                <span>info@sika-egypt.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Find a Distributor</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login" className="text-sm hover:text-red-600">
                Login
              </Link>
              <Link href="/auth/register" className="text-sm hover:text-red-600">
                Register
              </Link>
              <select className="text-sm bg-transparent border-none">
                <option value="en">English</option>
                <option value="ar">Arabic</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex items-center">
              <Image src="/sika-logo.png" alt="Sika Egypt" width={60} height={52} className="h-10 w-auto" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium hover:text-red-600 ${isActive("/") ? "text-red-600" : "text-gray-700"}`}
            >
              Home
            </Link>
            <div className="relative group">
              <button className="flex items-center font-medium text-gray-700 hover:text-red-600">
                Products
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10 hidden group-hover:block">
                <Link
                  href="/products/waterproofing"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Waterproofing
                </Link>
                <Link
                  href="/products/concrete-repair"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Concrete Repair
                </Link>
                <Link href="/products/flooring" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Flooring
                </Link>
                <Link href="/products/sealants" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Sealants & Adhesives
                </Link>
                <Link href="/products/roofing" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Roofing
                </Link>
              </div>
            </div>
            <Link
              href="/distributors"
              className={`font-medium hover:text-red-600 ${isActive("/distributors") ? "text-red-600" : "text-gray-700"}`}
            >
              Distributors
            </Link>
            <Link
              href="/about"
              className={`font-medium hover:text-red-600 ${isActive("/about") ? "text-red-600" : "text-gray-700"}`}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className={`font-medium hover:text-red-600 ${isActive("/contact") ? "text-red-600" : "text-gray-700"}`}
            >
              Contact
            </Link>
          </nav>

          {/* Search and Icons */}
          <div className="flex items-center space-x-4">
            <button onClick={toggleSearch} className="text-gray-700 hover:text-red-600">
              <Search className="h-5 w-5" />
            </button>
            <Link href="/account/wishlist" className="text-gray-700 hover:text-red-600 hidden sm:block">
              <Heart className="h-5 w-5" />
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-red-600 relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>
            <Link href="/account" className="text-gray-700 hover:text-red-600 hidden sm:block">
              <User className="h-5 w-5" />
            </Link>
            <button onClick={toggleMenu} className="text-gray-700 hover:text-red-600 lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="mt-4 relative">
            <Input type="search" placeholder="Search for products..." className="w-full pr-10" autoFocus />
            <button
              onClick={toggleSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Menu</h3>
              <button onClick={toggleMenu} className="text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="space-y-4">
              <Link
                href="/"
                className={`block py-2 ${isActive("/") ? "text-red-600 font-medium" : "text-gray-700"}`}
                onClick={toggleMenu}
              >
                Home
              </Link>
              <div>
                <button className="flex items-center justify-between w-full py-2 text-gray-700">
                  Products
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="pl-4 space-y-2 mt-2">
                  <Link href="/products/waterproofing" className="block py-1 text-gray-700" onClick={toggleMenu}>
                    Waterproofing
                  </Link>
                  <Link href="/products/concrete-repair" className="block py-1 text-gray-700" onClick={toggleMenu}>
                    Concrete Repair
                  </Link>
                  <Link href="/products/flooring" className="block py-1 text-gray-700" onClick={toggleMenu}>
                    Flooring
                  </Link>
                  <Link href="/products/sealants" className="block py-1 text-gray-700" onClick={toggleMenu}>
                    Sealants & Adhesives
                  </Link>
                  <Link href="/products/roofing" className="block py-1 text-gray-700" onClick={toggleMenu}>
                    Roofing
                  </Link>
                </div>
              </div>
              <Link
                href="/distributors"
                className={`block py-2 ${isActive("/distributors") ? "text-red-600 font-medium" : "text-gray-700"}`}
                onClick={toggleMenu}
              >
                Distributors
              </Link>
              <Link
                href="/about"
                className={`block py-2 ${isActive("/about") ? "text-red-600 font-medium" : "text-gray-700"}`}
                onClick={toggleMenu}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className={`block py-2 ${isActive("/contact") ? "text-red-600 font-medium" : "text-gray-700"}`}
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <div className="border-t pt-4 mt-4">
                <Link href="/account" className="flex items-center py-2 text-gray-700" onClick={toggleMenu}>
                  <User className="h-5 w-5 mr-2" />
                  My Account
                </Link>
                <Link href="/account/wishlist" className="flex items-center py-2 text-gray-700" onClick={toggleMenu}>
                  <Heart className="h-5 w-5 mr-2" />
                  Wishlist
                </Link>
                <Link
                  href="/account/notifications"
                  className="flex items-center py-2 text-gray-700"
                  onClick={toggleMenu}
                >
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                </Link>
              </div>
              <div className="border-t pt-4 mt-4 flex flex-col space-y-2">
                <Link href="/auth/login" className="block py-2 text-gray-700" onClick={toggleMenu}>
                  Login
                </Link>
                <Link href="/auth/register" className="block py-2 text-gray-700" onClick={toggleMenu}>
                  Register
                </Link>
                <div className="flex items-center py-2">
                  <span className="mr-2">Language:</span>
                  <select className="bg-transparent border-none">
                    <option value="en">English</option>
                    <option value="ar">Arabic</option>
                  </select>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
