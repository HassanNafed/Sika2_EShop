import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getServerClient } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"
import { ArrowLeft, Download, Truck, CheckCircle, Package } from "lucide-react"
import Image from "next/image"
import OrderStatusForm from "@/components/admin/order-status-form"

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const orderId = Number.parseInt(params.id)

  if (isNaN(orderId)) {
    notFound()
  }

  const supabase = getServerClient()

  // Get order data
  const { data: order, error } = await supabase
    .from("orders")
    .select(`
      *,
      users (
        id,
        name,
        email,
        phone
      )
    `)
    .eq("id", orderId)
    .single()

  if (error || !order) {
    notFound()
  }

  // Get order items
  const { data: orderItems } = await supabase
    .from("order_items")
    .select(`
      *,
      products (
        id,
        name,
        image_url,
        slug
      )
    `)
    .eq("order_id", orderId)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/orders" className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Orders
          </Link>
          <h1 className="text-3xl font-bold">Order #{order.id}</h1>
          <p className="text-gray-500">
            Placed on {new Date(order.created_at).toLocaleDateString()} at{" "}
            {new Date(order.created_at).toLocaleTimeString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Contact Details</h3>
                <p>{order.users?.name || "Guest"}</p>
                <p>{order.users?.email || "N/A"}</p>
                <p>{order.users?.phone || "N/A"}</p>
              </div>

              <div>
                <h3 className="font-medium">Shipping Address</h3>
                <p>{order.shipping_address || "N/A"}</p>
                <p>
                  {order.shipping_city}
                  {order.shipping_state ? `, ${order.shipping_state}` : ""}
                  {order.shipping_postal_code ? ` ${order.shipping_postal_code}` : ""}
                </p>
                <p>{order.shipping_country || "Egypt"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Payment</h3>
                <p>Method: {order.payment_method || "N/A"}</p>
                <p>
                  Status:
                  <span
                    className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      order.payment_status === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.payment_status}
                  </span>
                </p>
              </div>

              <div>
                <h3 className="font-medium">Shipping</h3>
                <p>Method: {order.shipping_method || "Standard Delivery"}</p>
                <p>Cost: {formatCurrency(order.shipping_cost || 0)}</p>
              </div>

              {order.notes && (
                <div>
                  <h3 className="font-medium">Notes</h3>
                  <p className="text-sm">{order.notes}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    order.status === "delivered"
                      ? "bg-green-100 text-green-800"
                      : order.status === "processing"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "shipped"
                          ? "bg-purple-100 text-purple-800"
                          : order.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <OrderStatusForm orderId={order.id} currentStatus={order.status} />

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Order Placed</p>
                      <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {order.status !== "pending" && (
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-1 rounded-full mr-3 mt-0.5">
                        <Package className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Processing</p>
                        <p className="text-sm text-gray-500">{new Date(order.updated_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  )}

                  {(order.status === "shipped" || order.status === "delivered") && (
                    <div className="flex items-start">
                      <div className="bg-purple-100 p-1 rounded-full mr-3 mt-0.5">
                        <Truck className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">Shipped</p>
                        <p className="text-sm text-gray-500">{new Date(order.updated_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  )}

                  {order.status === "delivered" && (
                    <div className="flex items-start">
                      <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Delivered</p>
                        <p className="text-sm text-gray-500">{new Date(order.updated_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderItems && orderItems.length > 0 ? (
                orderItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="w-12 h-12 relative mr-3">
                          <Image
                            src={item.products?.image_url || "/placeholder.svg?height=48&width=48"}
                            alt={item.products?.name || "Product"}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{item.products?.name || "Product"}</p>
                          {item.products?.slug && (
                            <Link
                              href={`/admin/products/${item.products.id}`}
                              className="text-sm text-blue-600 hover:underline"
                            >
                              View Product
                            </Link>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(item.price)}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.price * item.quantity)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                    No items found
                  </TableCell>
                </TableRow>
              )}

              <TableRow>
                <TableCell colSpan={3} className="text-right font-medium">
                  Subtotal
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(orderItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={3} className="text-right font-medium">
                  Shipping
                </TableCell>
                <TableCell className="text-right">{formatCurrency(order.shipping_cost || 0)}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={3} className="text-right font-medium">
                  Total
                </TableCell>
                <TableCell className="text-right font-bold">{formatCurrency(order.total_amount)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
