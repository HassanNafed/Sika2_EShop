"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react"

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Process form submission
    setFormSubmitted(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              {!formSubmitted ? (
                <>
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <select id="subject" className="w-full p-2 border rounded-md" required>
                        <option value="">Select a subject</option>
                        <option value="product-inquiry">Product Inquiry</option>
                        <option value="technical-support">Technical Support</option>
                        <option value="order-status">Order Status</option>
                        <option value="distributor-inquiry">Distributor Inquiry</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="How can we help you?" className="min-h-[150px]" required />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="privacy" className="rounded" required />
                      <Label htmlFor="privacy" className="text-sm">
                        I agree to the processing of my personal data according to the Privacy Policy
                      </Label>
                    </div>

                    <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
                      Send Message
                    </Button>
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold mb-4">Message Sent Successfully!</h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for contacting us. We've received your message and will get back to you shortly.
                  </p>
                  <Button variant="outline" onClick={() => setFormSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">Contact Information</h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-red-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Head Office</h3>
                    <p className="text-gray-600">
                      123 Construction Road, Industrial Area
                      <br />
                      Cairo, Egypt 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-red-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-gray-600">+20 2 1234 5678</p>
                    <p className="text-gray-600">+20 2 8765 4321</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-red-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600">info@sika-egypt.com</p>
                    <p className="text-gray-600">support@sika-egypt.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-red-600 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Working Hours</h3>
                    <p className="text-gray-600">Monday - Thursday: 8:00 AM - 5:00 PM</p>
                    <p className="text-gray-600">Friday: Closed</p>
                    <p className="text-gray-600">Saturday - Sunday: 9:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Regional Offices</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Alexandria Office</h3>
                  <p className="text-gray-600">
                    45 El Horreya Road, Sidi Gaber
                    <br />
                    Alexandria, Egypt
                  </p>
                  <p className="text-gray-600">+20 3 4567 8901</p>
                </div>

                <div>
                  <h3 className="font-medium">Upper Egypt Office</h3>
                  <p className="text-gray-600">
                    12 Corniche El Nil
                    <br />
                    Luxor, Egypt
                  </p>
                  <p className="text-gray-600">+20 95 3456 7890</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Our Location</h2>
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=500&width=1000&text=Map"
                alt="Office Location Map"
                width={1000}
                height={500}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline">Get Directions</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
