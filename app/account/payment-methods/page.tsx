"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Plus, Edit, Trash2, Check, AlertCircle } from "lucide-react"

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "credit-card",
      default: true,
      cardNumber: "**** **** **** 1234",
      cardHolder: "John Doe",
      expiryDate: "12/25",
      cardType: "Visa",
    },
    {
      id: 2,
      type: "credit-card",
      default: false,
      cardNumber: "**** **** **** 5678",
      cardHolder: "John Doe",
      expiryDate: "09/26",
      cardType: "Mastercard",
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingMethodId, setEditingMethodId] = useState<number | null>(null)

  const handleSetDefault = (id: number) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        default: method.id === id,
      })),
    )
  }

  const handleDelete = (id: number) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
  }

  const handleEdit = (id: number) => {
    setEditingMethodId(id)
    setShowAddForm(false)
  }

  const handleCancelEdit = () => {
    setEditingMethodId(null)
  }

  const handleAddNew = () => {
    setShowAddForm(true)
    setEditingMethodId(null)
  }

  const handleCancelAdd = () => {
    setShowAddForm(false)
  }

  const getCardIcon = (cardType: string) => {
    // In a real application, you would use actual card brand icons
    return <CreditCard className="h-8 w-8 text-gray-600" />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Payment Methods</h1>
        {!showAddForm && editingMethodId === null && (
          <Button onClick={handleAddNew} className="bg-red-600 hover:bg-red-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add New Payment Method
          </Button>
        )}
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Add New Payment Method</h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="1234 5678 9012 3456" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-holder">Cardholder Name</Label>
                <Input id="card-holder" placeholder="John Doe" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry-date">Expiry Date</Label>
                  <Input id="expiry-date" placeholder="MM/YY" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" required />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="default-payment" className="rounded" />
                <Label htmlFor="default-payment">Set as default payment method</Label>
              </div>

              <div className="bg-blue-50 p-4 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-blue-800">
                  Your card information is securely processed. We do not store your full card details on our servers.
                </p>
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={handleCancelAdd}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
                  Save Payment Method
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingMethodId !== null && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Edit Payment Method</h2>
            <form className="space-y-6">
              {paymentMethods
                .filter((method) => method.id === editingMethodId)
                .map((method) => (
                  <div key={method.id}>
                    <div className="space-y-2">
                      <Label htmlFor="edit-card-number">Card Number</Label>
                      <Input id="edit-card-number" value={method.cardNumber} disabled />
                      <p className="text-xs text-gray-500">For security reasons, you cannot edit the card number.</p>
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label htmlFor="edit-card-holder">Cardholder Name</Label>
                      <Input id="edit-card-holder" defaultValue={method.cardHolder} required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-expiry-date">Expiry Date</Label>
                        <Input id="edit-expiry-date" defaultValue={method.expiryDate} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-cvv">CVV</Label>
                        <Input id="edit-cvv" placeholder="123" required />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mt-4">
                      <input
                        type="checkbox"
                        id="edit-default-payment"
                        className="rounded"
                        defaultChecked={method.default}
                      />
                      <Label htmlFor="edit-default-payment">Set as default payment method</Label>
                    </div>
                  </div>
                ))}

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={handleCancelEdit}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
                  Update Payment Method
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`bg-white rounded-lg shadow-md overflow-hidden ${method.default ? "border-2 border-red-600" : ""}`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  {getCardIcon(method.cardType)}
                  <div className="ml-2">
                    <h3 className="font-bold text-lg">{method.cardType}</h3>
                    {method.default && (
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Default</span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(method.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(method.id)}>
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>

              <div className="space-y-1 text-gray-700">
                <p className="font-medium">{method.cardNumber}</p>
                <p>{method.cardHolder}</p>
                <p>Expires: {method.expiryDate}</p>
              </div>

              {!method.default && (
                <div className="mt-4">
                  <Button variant="outline" size="sm" onClick={() => handleSetDefault(method.id)}>
                    <Check className="h-4 w-4 mr-2" />
                    Set as Default
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Payment Security</h2>
          <div className="space-y-4">
            <p>We take the security of your payment information seriously. Here's how we protect your data:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All payment information is encrypted using industry-standard SSL technology.</li>
              <li>We comply with PCI DSS (Payment Card Industry Data Security Standard) requirements.</li>
              <li>We do not store your full card details on our servers.</li>
              <li>Our payment processing is handled by trusted third-party providers.</li>
            </ul>
            <p className="text-sm text-gray-600">
              If you have any questions or concerns about payment security, please contact our customer support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
