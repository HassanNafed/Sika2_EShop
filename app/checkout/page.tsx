"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Building, Truck, ShieldCheck, CheckCircle2 } from "lucide-react"

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [orderComplete, setOrderComplete] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Process payment and complete order
      setOrderComplete(true)
    }
  }

  if (orderComplete) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your order. We've received your payment and will process your order shortly. You will receive
            an email confirmation with your order details.
          </p>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Order #12345</h2>
            <div className="border-b pb-4 mb-4">
              <p className="text-gray-600">Order Date: May 19, 2025</p>
              <p className="text-gray-600">Estimated Delivery: May 25-27, 2025</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>EGP 1,210</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>EGP 50</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>EGP 1,260</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Link href="/account/orders">View Order</Link>
            </Button>
            <Button variant="outline">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-6">
              <div className="flex mb-8">
                <div className={`flex-1 text-center ${step >= 1 ? "text-red-600 font-bold" : ""}`}>
                  <div
                    className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 1 ? "bg-red-600 text-white" : "bg-gray-200"}`}
                  >
                    1
                  </div>
                  <span className="text-sm mt-1 block">Shipping</span>
                </div>
                <div className={`flex-1 text-center ${step >= 2 ? "text-red-600 font-bold" : ""}`}>
                  <div
                    className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 2 ? "bg-red-600 text-white" : "bg-gray-200"}`}
                  >
                    2
                  </div>
                  <span className="text-sm mt-1 block">Review</span>
                </div>
                <div className={`flex-1 text-center ${step >= 3 ? "text-red-600 font-bold" : ""}`}>
                  <div
                    className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center ${step >= 3 ? "bg-red-600 text-white" : "bg-gray-200"}`}
                  >
                    3
                  </div>
                  <span className="text-sm mt-1 block">Payment</span>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold mb-4">Shipping Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input id="address" required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State/Governorate</Label>
                        <Input id="state" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">Postal Code</Label>
                        <Input id="zip" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Order Notes (Optional)</Label>
                      <textarea
                        id="notes"
                        className="w-full min-h-[100px] p-2 border rounded-md"
                        placeholder="Special instructions for delivery or product requirements"
                      ></textarea>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold mb-4">Review Your Order</h2>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-md">
                        <div className="flex items-center">
                          <div className="w-16 h-16 flex-shrink-0 mr-4">
                            <Image
                              src="/placeholder.svg?height=100&width=100&text=SikaTop+Seal-107"
                              alt="SikaTop Seal-107"
                              width={64}
                              height={64}
                              className="object-contain w-full h-full"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">SikaTop Seal-107</h3>
                            <p className="text-sm text-gray-600">25 kg × 2</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">EGP 460</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-md">
                        <div className="flex items-center">
                          <div className="w-16 h-16 flex-shrink-0 mr-4">
                            <Image
                              src="/placeholder.svg?height=100&width=100&text=Sika+MonoTop-610"
                              alt="Sika MonoTop-610"
                              width={64}
                              height={64}
                              className="object-contain w-full h-full"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">Sika MonoTop-610</h3>
                            <p className="text-sm text-gray-600">25 kg × 1</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">EGP 250</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-md">
                        <div className="flex items-center">
                          <div className="w-16 h-16 flex-shrink-0 mr-4">
                            <Image
                              src="/placeholder.svg?height=100&width=100&text=Sikaflex-11+FC+"
                              alt="Sikaflex-11 FC+"
                              width={64}
                              height={64}
                              className="object-contain w-full h-full"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">Sikaflex-11 FC+</h3>
                            <p className="text-sm text-gray-600">300 ml × 1</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">EGP 500</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="font-bold mb-2">Shipping Address</h3>
                      <p>John Doe</p>
                      <p>123 Construction St, Apt 4</p>
                      <p>Cairo, Egypt 12345</p>
                      <p>+20 123 456 7890</p>
                      <Button variant="link" className="p-0 h-auto text-red-600" onClick={() => setStep(1)}>
                        Edit
                      </Button>
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="font-bold mb-2">Shipping Method</h3>
                      <RadioGroup defaultValue="standard">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard">Standard Delivery (3-5 business days) - EGP 50</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express">Express Delivery (1-2 business days) - EGP 100</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold mb-4">Payment Method</h2>

                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                      <div
                        className={`border rounded-md p-4 ${paymentMethod === "credit-card" ? "border-red-600" : ""}`}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="credit-card" id="credit-card" />
                          <Label htmlFor="credit-card" className="flex items-center">
                            <CreditCard className="mr-2 h-5 w-5" />
                            Credit/Debit Card
                          </Label>
                        </div>

                        {paymentMethod === "credit-card" && (
                          <div className="mt-4 space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="card-number">Card Number</Label>
                              <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <Input id="expiry" placeholder="MM/YY" required />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="cvv">CVV</Label>
                                <Input id="cvv" placeholder="123" required />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="card-name">Name on Card</Label>
                              <Input id="card-name" required />
                            </div>
                          </div>
                        )}
                      </div>

                      <div
                        className={`border rounded-md p-4 ${paymentMethod === "bank-transfer" ? "border-red-600" : ""}`}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                          <Label htmlFor="bank-transfer" className="flex items-center">
                            <Building className="mr-2 h-5 w-5" />
                            Bank Transfer
                          </Label>
                        </div>

                        {paymentMethod === "bank-transfer" && (
                          <div className="mt-4 space-y-2 text-sm">
                            <p>Please transfer the total amount to the following bank account:</p>
                            <p>
                              <strong>Bank:</strong> Construction Bank of Egypt
                            </p>
                            <p>
                              <strong>Account Name:</strong> Sika Egypt
                            </p>
                            <p>
                              <strong>Account Number:</strong> 1234567890
                            </p>
                            <p>
                              <strong>Reference:</strong> Your order number will be provided after submission
                            </p>
                            <p className="text-red-600 mt-2">
                              Note: Your order will be processed after we receive your payment.
                            </p>
                          </div>
                        )}
                      </div>

                      <div
                        className={`border rounded-md p-4 ${paymentMethod === "cash-on-delivery" ? "border-red-600" : ""}`}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cash-on-delivery" id="cash-on-delivery" />
                          <Label htmlFor="cash-on-delivery" className="flex items-center">
                            <Truck className="mr-2 h-5 w-5" />
                            Cash on Delivery
                          </Label>
                        </div>

                        {paymentMethod === "cash-on-delivery" && (
                          <div className="mt-4 space-y-2 text-sm">
                            <p>Pay with cash upon delivery of your order.</p>
                            <p>Additional fee: EGP 25</p>
                          </div>
                        )}
                      </div>
                    </RadioGroup>

                    <div className="flex items-center space-x-2 mt-6">
                      <Checkbox id="terms" required />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <Link href="/terms" className="text-red-600 hover:underline">
                          Terms and Conditions
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-red-600 hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  {step > 1 ? (
                    <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                      Back
                    </Button>
                  ) : (
                    <Button type="button" variant="outline" asChild>
                      <Link href="/cart">Back to Cart</Link>
                    </Button>
                  )}

                  <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
                    {step < 3 ? "Continue" : "Place Order"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-6">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal (4 items)</span>
                  <span>EGP 1,210</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>EGP 50</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>EGP 1,260</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-start">
                  <Truck className="h-5 w-5 mr-2 text-gray-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Free shipping on orders over EGP 2,000</h3>
                    <p className="text-sm text-gray-600">Add EGP 790 more to qualify</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <ShieldCheck className="h-5 w-5 mr-2 text-gray-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Secure Payment</h3>
                    <p className="text-sm text-gray-600">Your payment information is secure</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Our customer service is available Monday to Friday, 9am to 5pm.
                </p>
                <Link href="/contact" className="text-red-600 hover:underline text-sm">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
