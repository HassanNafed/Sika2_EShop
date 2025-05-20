"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Package, Heart, MapPin, CreditCard, Bell, LogOut, Edit, Save, Eye } from "lucide-react"

export default function AccountPage() {
  const [editing, setEditing] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-6 text-center border-b">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=100&width=100&text=JD"
                  alt="Profile"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
              <h2 className="text-xl font-bold">John Doe</h2>
              <p className="text-gray-600">john.doe@example.com</p>
            </div>

            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/account"
                    className="flex items-center p-2 rounded-md hover:bg-gray-100 text-red-600 font-medium"
                  >
                    <User className="mr-3 h-5 w-5" />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link href="/account/orders" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                    <Package className="mr-3 h-5 w-5" />
                    Orders
                  </Link>
                </li>
                <li>
                  <Link href="/account/wishlist" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                    <Heart className="mr-3 h-5 w-5" />
                    Wishlist
                  </Link>
                </li>
                <li>
                  <Link href="/account/addresses" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                    <MapPin className="mr-3 h-5 w-5" />
                    Addresses
                  </Link>
                </li>
                <li>
                  <Link href="/account/payment-methods" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                    <CreditCard className="mr-3 h-5 w-5" />
                    Payment Methods
                  </Link>
                </li>
                <li>
                  <Link href="/account/notifications" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                    <Bell className="mr-3 h-5 w-5" />
                    Notifications
                  </Link>
                </li>
                <li className="pt-4 border-t">
                  <Link
                    href="/auth/logout"
                    className="flex items-center p-2 rounded-md hover:bg-gray-100 text-gray-600"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="w-full lg:w-3/4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Profile Information</h2>
                <Button variant="outline" size="sm" onClick={() => setEditing(!editing)}>
                  {editing ? (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>

              <Tabs defaultValue="personal">
                <TabsList className="w-full border-b justify-start mb-6">
                  <TabsTrigger value="personal" className="text-lg">
                    Personal Information
                  </TabsTrigger>
                  <TabsTrigger value="security" className="text-lg">
                    Security
                  </TabsTrigger>
                  <TabsTrigger value="preferences" className="text-lg">
                    Preferences
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" defaultValue="John" disabled={!editing} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" defaultValue="Doe" disabled={!editing} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" disabled={!editing} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+20 123 456 7890" disabled={!editing} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input id="company" defaultValue="Construction Co." disabled={!editing} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="profession">Profession (Optional)</Label>
                    <Input id="profession" defaultValue="Contractor" disabled={!editing} />
                  </div>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" placeholder="••••••••" disabled={!editing} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" placeholder="••••••••" disabled={!editing} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" placeholder="••••••••" disabled={!editing} />
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-bold mb-4">Two-Factor Authentication</h3>
                    <p className="text-gray-600 mb-4">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                    <Button variant="outline" disabled={!editing}>
                      Enable Two-Factor Authentication
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="preferences" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-bold">Email Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="order-updates">Order Updates</Label>
                        <input
                          type="checkbox"
                          id="order-updates"
                          className="toggle"
                          defaultChecked
                          disabled={!editing}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="promotions">Promotions and Discounts</Label>
                        <input type="checkbox" id="promotions" className="toggle" defaultChecked disabled={!editing} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="product-updates">Product Updates</Label>
                        <input type="checkbox" id="product-updates" className="toggle" disabled={!editing} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="newsletter">Newsletter</Label>
                        <input type="checkbox" id="newsletter" className="toggle" defaultChecked disabled={!editing} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-bold">Language and Region</h3>
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <select
                        id="language"
                        className="w-full p-2 border rounded-md"
                        defaultValue="en"
                        disabled={!editing}
                      >
                        <option value="en">English</option>
                        <option value="ar">Arabic</option>
                        <option value="fr">French</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <select
                        id="currency"
                        className="w-full p-2 border rounded-md"
                        defaultValue="egp"
                        disabled={!editing}
                      >
                        <option value="egp">Egyptian Pound (EGP)</option>
                        <option value="usd">US Dollar (USD)</option>
                        <option value="eur">Euro (EUR)</option>
                      </select>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-4">Order #</th>
                      <th className="text-left pb-4">Date</th>
                      <th className="text-left pb-4">Status</th>
                      <th className="text-right pb-4">Total</th>
                      <th className="text-right pb-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-4">#12345</td>
                      <td className="py-4">May 15, 2025</td>
                      <td className="py-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Delivered</span>
                      </td>
                      <td className="py-4 text-right">EGP 1,260</td>
                      <td className="py-4 text-right">
                        <Button variant="link" size="sm" className="h-auto p-0">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4">#12344</td>
                      <td className="py-4">May 10, 2025</td>
                      <td className="py-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Shipped</span>
                      </td>
                      <td className="py-4 text-right">EGP 850</td>
                      <td className="py-4 text-right">
                        <Button variant="link" size="sm" className="h-auto p-0">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-4">#12343</td>
                      <td className="py-4">May 5, 2025</td>
                      <td className="py-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Delivered</span>
                      </td>
                      <td className="py-4 text-right">EGP 2,100</td>
                      <td className="py-4 text-right">
                        <Button variant="link" size="sm" className="h-auto p-0">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 text-right">
                <Button variant="link" className="h-auto p-0">
                  View All Orders
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
