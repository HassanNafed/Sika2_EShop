"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, total } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const shipping = subtotal > 0 ? 50 : 0

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {items.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-4">Product</th>
                      <th className="text-center pb-4 hidden sm:table-cell">Price</th>
                      <th className="text-center pb-4">Quantity</th>
                      <th className="text-right pb-4">Total</th>
                      <th className="text-right pb-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-4">
                          <div className="flex items-center">
                            <div className="w-16 h-16 flex-shrink-0 mr-4">
                              <Image
                                src={item.image_url || "/placeholder.svg"}
                                alt={item.name}
                                width={64}
                                height={64}
                                className="object-contain w-full h-full"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium">{item.name}</h3>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-center hidden sm:table-cell">EGP {item.price}</td>
                        <td className="py-4">
                          <div className="flex items-center justify-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-r-none"
                              onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <div className="h-8 w-12 flex items-center justify-center border-y">{item.quantity}</div>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-l-none"
                              onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                        <td className="py-4 text-right">EGP {item.price * item.quantity}</td>
                        <td className="py-4 text-right">
                          <Button variant="ghost" size="icon" onClick={() => removeItem(item.product_id)}>
                            <Trash2 className="h-5 w-5 text-red-500" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
              </div>
              <Button variant="outline">Apply Coupon</Button>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Update Cart
              </Button>
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>EGP {subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>EGP {shipping}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-bold">
                    <span>Total</span>
                    <span>EGP {total}</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white">
                  <Link href="/checkout" className="flex items-center justify-center w-full">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>We accept payment by credit card, bank transfer, or cash on delivery.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
