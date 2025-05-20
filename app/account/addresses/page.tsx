"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Plus, Edit, Trash2, Check, Home, Building, Briefcase } from "lucide-react"

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "home",
      default: true,
      name: "John Doe",
      address: "123 Construction St, Apt 4",
      city: "Cairo",
      state: "Cairo Governorate",
      postalCode: "12345",
      country: "Egypt",
      phone: "+20 123 456 7890",
    },
    {
      id: 2,
      type: "work",
      default: false,
      name: "John Doe",
      address: "456 Business Ave, Floor 3",
      city: "Cairo",
      state: "Cairo Governorate",
      postalCode: "12345",
      country: "Egypt",
      phone: "+20 123 456 7890",
    },
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null)

  const handleSetDefault = (id: number) => {
    setAddresses(
      addresses.map((address) => ({
        ...address,
        default: address.id === id,
      })),
    )
  }

  const handleDelete = (id: number) => {
    setAddresses(addresses.filter((address) => address.id !== id))
  }

  const handleEdit = (id: number) => {
    setEditingAddressId(id)
    setShowAddForm(false)
  }

  const handleCancelEdit = () => {
    setEditingAddressId(null)
  }

  const handleAddNew = () => {
    setShowAddForm(true)
    setEditingAddressId(null)
  }

  const handleCancelAdd = () => {
    setShowAddForm(false)
  }

  const getAddressIcon = (type: string) => {
    switch (type) {
      case "home":
        return <Home className="h-5 w-5 text-gray-600" />
      case "work":
        return <Briefcase className="h-5 w-5 text-gray-600" />
      case "business":
        return <Building className="h-5 w-5 text-gray-600" />
      default:
        return <MapPin className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Addresses</h1>
        {!showAddForm && editingAddressId === null && (
          <Button onClick={handleAddNew} className="bg-red-600 hover:bg-red-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add New Address
          </Button>
        )}
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Add New Address</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address-type">Address Type</Label>
                  <select id="address-type" className="w-full p-2 border rounded-md">
                    <option value="home">Home</option>
                    <option value="work">Work</option>
                    <option value="business">Business</option>
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input id="full-name" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="street-address">Street Address</Label>
                <Input id="street-address" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Governorate</Label>
                  <Input id="state" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postal-code">Postal Code</Label>
                  <Input id="postal-code" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <select id="country" className="w-full p-2 border rounded-md" defaultValue="Egypt">
                    <option value="Egypt">Egypt</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="UAE">United Arab Emirates</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Kuwait">Kuwait</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" required />
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="default-address" className="rounded" />
                <Label htmlFor="default-address">Set as default address</Label>
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={handleCancelAdd}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
                  Save Address
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingAddressId !== null && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Edit Address</h2>
            <form className="space-y-6">
              {addresses
                .filter((address) => address.id === editingAddressId)
                .map((address) => (
                  <div key={address.id}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-address-type">Address Type</Label>
                        <select
                          id="edit-address-type"
                          className="w-full p-2 border rounded-md"
                          defaultValue={address.type}
                        >
                          <option value="home">Home</option>
                          <option value="work">Work</option>
                          <option value="business">Business</option>
                        </select>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="edit-full-name">Full Name</Label>
                        <Input id="edit-full-name" defaultValue={address.name} required />
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label htmlFor="edit-street-address">Street Address</Label>
                      <Input id="edit-street-address" defaultValue={address.address} required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-city">City</Label>
                        <Input id="edit-city" defaultValue={address.city} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-state">State/Governorate</Label>
                        <Input id="edit-state" defaultValue={address.state} required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-postal-code">Postal Code</Label>
                        <Input id="edit-postal-code" defaultValue={address.postalCode} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-country">Country</Label>
                        <select
                          id="edit-country"
                          className="w-full p-2 border rounded-md"
                          defaultValue={address.country}
                        >
                          <option value="Egypt">Egypt</option>
                          <option value="Saudi Arabia">Saudi Arabia</option>
                          <option value="UAE">United Arab Emirates</option>
                          <option value="Qatar">Qatar</option>
                          <option value="Kuwait">Kuwait</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label htmlFor="edit-phone">Phone Number</Label>
                      <Input id="edit-phone" type="tel" defaultValue={address.phone} required />
                    </div>

                    <div className="flex items-center space-x-2 mt-4">
                      <input
                        type="checkbox"
                        id="edit-default-address"
                        className="rounded"
                        defaultChecked={address.default}
                      />
                      <Label htmlFor="edit-default-address">Set as default address</Label>
                    </div>
                  </div>
                ))}

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={handleCancelEdit}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
                  Update Address
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`bg-white rounded-lg shadow-md overflow-hidden ${address.default ? "border-2 border-red-600" : ""}`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  {getAddressIcon(address.type)}
                  <div className="ml-2">
                    <h3 className="font-bold text-lg capitalize">{address.type}</h3>
                    {address.default && (
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Default</span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(address.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(address.id)}>
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>

              <div className="space-y-1 text-gray-700">
                <p className="font-medium">{address.name}</p>
                <p>{address.address}</p>
                <p>
                  {address.city}, {address.state} {address.postalCode}
                </p>
                <p>{address.country}</p>
                <p className="mt-2">{address.phone}</p>
              </div>

              {!address.default && (
                <div className="mt-4">
                  <Button variant="outline" size="sm" onClick={() => handleSetDefault(address.id)}>
                    <Check className="h-4 w-4 mr-2" />
                    Set as Default
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
