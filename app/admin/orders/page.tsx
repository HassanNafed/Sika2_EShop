"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getServerClient } from "@/lib/supabase"
import { Eye } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { page?: string; status?: string }
}) {
  const page = Number(searchParams.page) || 1
  const pageSize = 10
  const statusFilter = searchParams.status

  const supabase = getServerClient()

  // Build query
  let query = supabase
    .from("orders")
    .select(`
      *,
      users (
        name,
        email
      )
    `)
    .order("created_at", { ascending: false })
    .range((page - 1) * pageSize, page * pageSize - 1)

  // Apply status filter if provided
  if (statusFilter) {
    query = query.eq("status", statusFilter)
  }

  // Execute query
  const { data: orders, error } = await query

  // Get total count for pagination
  let countQuery = supabase.from("orders").select("*", { count: "exact", head: true })

  if (statusFilter) {
    countQuery = countQuery.eq("status", statusFilter)
  }

  const { count } = await countQuery

  const totalPages = Math.ceil((count || 0) / pageSize)

  // Get status counts for filter
  const { data: statusCounts } = await supabase.rpc("get_order_status_counts")

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-gray-500">Manage customer orders</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <Button variant={!statusFilter ? "default" : "outline"} size="sm" asChild>
            <Link href="/admin/orders">
              All
              <span className="ml-1 text-xs">({count || 0})</span>
            </Link>
          </Button>

          {statusOptions.map((status) => (
            <Button
              key={status.value}
              variant={statusFilter === status.value ? "default" : "outline"}
              size="sm"
              asChild
            >
              <Link href={`/admin/orders?status=${status.value}`}>
                {status.label}
                <span className="ml-1 text-xs">
                  ({statusCounts?.find((s) => s.status === status.value)?.count || 0})
                </span>
              </Link>
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            Showing {orders?.length || 0} of {count || 0} orders
          </span>
        </div>
      </div>

      <div className="bg-white rounded-md shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>{order.users?.name || "Guest"}</TableCell>
                  <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
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
                  </TableCell>
                  <TableCell>{formatCurrency(order.total_amount)}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.payment_status === "paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.payment_status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/orders/${order.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => {
                const url = new URL(window.location.href)
                url.searchParams.set("page", String(page - 1))
                window.location.href = url.toString()
              }}
            >
              Previous
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <Button
                  key={pageNum}
                  variant={pageNum === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    const url = new URL(window.location.href)
                    url.searchParams.set("page", String(pageNum))
                    window.location.href = url.toString()
                  }}
                >
                  {pageNum}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => {
                const url = new URL(window.location.href)
                url.searchParams.set("page", String(page + 1))
                window.location.href = url.toString()
              }}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
