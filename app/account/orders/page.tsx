import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Eye, Download, Truck, Package, CheckCircle, Clock, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <div className="flex items-center gap-2">
          <Input placeholder="Search orders..." className="max-w-xs" />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-4">Order #</th>
                  <th className="text-left pb-4">Date</th>
                  <th className="text-left pb-4">Status</th>
                  <th className="text-left pb-4 hidden md:table-cell">Items</th>
                  <th className="text-right pb-4">Total</th>
                  <th className="text-right pb-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-4">#12345</td>
                  <td className="py-4">May 15, 2025</td>
                  <td className="py-4">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Delivered</span>
                    </div>
                  </td>
                  <td className="py-4 hidden md:table-cell">3 items</td>
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
                    <div className="flex items-center">
                      <Truck className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Shipped</span>
                    </div>
                  </td>
                  <td className="py-4 hidden md:table-cell">2 items</td>
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
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Delivered</span>
                    </div>
                  </td>
                  <td className="py-4 hidden md:table-cell">5 items</td>
                  <td className="py-4 text-right">EGP 2,100</td>
                  <td className="py-4 text-right">
                    <Button variant="link" size="sm" className="h-auto p-0">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4">#12342</td>
                  <td className="py-4">April 28, 2025</td>
                  <td className="py-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Processing</span>
                    </div>
                  </td>
                  <td className="py-4 hidden md:table-cell">1 item</td>
                  <td className="py-4 text-right">EGP 500</td>
                  <td className="py-4 text-right">
                    <Button variant="link" size="sm" className="h-auto p-0">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4">#12341</td>
                  <td className="py-4">April 20, 2025</td>
                  <td className="py-4">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Delivered</span>
                    </div>
                  </td>
                  <td className="py-4 hidden md:table-cell">4 items</td>
                  <td className="py-4 text-right">EGP 1,750</td>
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

          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" disabled>
                &lt;
              </Button>
              <Button variant="default" size="icon">
                1
              </Button>
              <Button variant="outline" size="icon">
                2
              </Button>
              <Button variant="outline" size="icon">
                3
              </Button>
              <Button variant="outline" size="icon">
                &gt;
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6">Order Details - #12345</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="border rounded-md p-4">
              <h3 className="font-bold mb-2">Order Information</h3>
              <p className="text-sm">Order #: 12345</p>
              <p className="text-sm">Date: May 15, 2025</p>
              <p className="text-sm">Status: Delivered</p>
              <p className="text-sm">Payment Method: Credit Card</p>
            </div>

            <div className="border rounded-md p-4">
              <h3 className="font-bold mb-2">Shipping Address</h3>
              <p className="text-sm">John Doe</p>
              <p className="text-sm">123 Construction St, Apt 4</p>
              <p className="text-sm">Cairo, Egypt 12345</p>
              <p className="text-sm">+20 123 456 7890</p>
            </div>

            <div className="border rounded-md p-4">
              <h3 className="font-bold mb-2">Shipping Information</h3>
              <p className="text-sm">Carrier: Express Shipping</p>
              <p className="text-sm">Tracking #: EGY123456789</p>
              <p className="text-sm">Shipped: May 12, 2025</p>
              <p className="text-sm">Delivered: May 15, 2025</p>
              <Button variant="link" size="sm" className="h-auto p-0 mt-2">
                <Truck className="h-4 w-4 mr-1" />
                Track Package
              </Button>
            </div>
          </div>

          <h3 className="font-bold mb-4">Order Items</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-4">Product</th>
                  <th className="text-center pb-4">Quantity</th>
                  <th className="text-right pb-4">Price</th>
                  <th className="text-right pb-4">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-4">
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
                        <h4 className="font-medium">SikaTop Seal-107</h4>
                        <p className="text-sm text-gray-600">25 kg</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-center">2</td>
                  <td className="py-4 text-right">EGP 230</td>
                  <td className="py-4 text-right">EGP 460</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4">
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
                        <h4 className="font-medium">Sika MonoTop-610</h4>
                        <p className="text-sm text-gray-600">25 kg</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-center">1</td>
                  <td className="py-4 text-right">EGP 250</td>
                  <td className="py-4 text-right">EGP 250</td>
                </tr>
                <tr className="border-b">
                  <td className="py-4">
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
                        <h4 className="font-medium">Sikaflex-11 FC+</h4>
                        <p className="text-sm text-gray-600">300 ml</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-center">1</td>
                  <td className="py-4 text-right">EGP 500</td>
                  <td className="py-4 text-right">EGP 500</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-b">
                  <td colSpan={3} className="py-4 text-right font-medium">
                    Subtotal
                  </td>
                  <td className="py-4 text-right">EGP 1,210</td>
                </tr>
                <tr className="border-b">
                  <td colSpan={3} className="py-4 text-right font-medium">
                    Shipping
                  </td>
                  <td className="py-4 text-right">EGP 50</td>
                </tr>
                <tr>
                  <td colSpan={3} className="py-4 text-right font-bold">
                    Total
                  </td>
                  <td className="py-4 text-right font-bold">EGP 1,260</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="flex justify-end mt-6 gap-4">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Invoice
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Package className="h-4 w-4 mr-2" />
              Track Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
