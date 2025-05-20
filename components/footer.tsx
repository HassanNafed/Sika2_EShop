import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Phone, Mail, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/">
              <Image src="/sika-logo.png" alt="Sika Egypt" width={60} height={52} className="h-10 w-auto mb-4" />
            </Link>
            <p className="text-gray-400 mb-4">
              Sika Egypt provides high-quality construction materials and innovative solutions for building and
              infrastructure projects across Egypt and the Middle East.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products/waterproofing" className="text-gray-400 hover:text-white">
                  Waterproofing
                </Link>
              </li>
              <li>
                <Link href="/products/concrete-repair" className="text-gray-400 hover:text-white">
                  Concrete Repair
                </Link>
              </li>
              <li>
                <Link href="/products/flooring" className="text-gray-400 hover:text-white">
                  Flooring
                </Link>
              </li>
              <li>
                <Link href="/products/sealants" className="text-gray-400 hover:text-white">
                  Sealants & Adhesives
                </Link>
              </li>
              <li>
                <Link href="/products/roofing" className="text-gray-400 hover:text-white">
                  Roofing
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white">
                  View All Products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/distributors" className="text-gray-400 hover:text-white">
                  Find a Distributor
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/account" className="text-gray-400 hover:text-white">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="h-5 w-5 text-red-600 mr-2 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Construction Road, Industrial Area
                  <br />
                  Cairo, Egypt 12345
                </span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 text-red-600 mr-2 flex-shrink-0" />
                <span className="text-gray-400">+20 2 1234 5678</span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 text-red-600 mr-2 flex-shrink-0" />
                <span className="text-gray-400">info@sika-egypt.com</span>
              </li>
            </ul>

            <h3 className="font-bold text-lg mt-6 mb-4">Newsletter</h3>
            <div className="flex">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 border-gray-700 text-white rounded-r-none"
              />
              <Button className="bg-red-600 hover:bg-red-700 rounded-l-none">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Sika Egypt for Construction Chemicals S.A.E. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
