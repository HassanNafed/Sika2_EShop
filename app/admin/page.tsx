import type React from "react"
import { getServerClient } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, Users, Store } from "lucide-react"

export default async function AdminDashboardPage() {
  const supabase = getServerClient()

  // Fetch counts
  const { count: productsCount } = await supabase.from("products").select("*", { count: "exact", head: true })

  const { count: categoriesCount } = await supabase.from("categories").select("*", { count: "exact", head: true })

  const { count: ordersCount } = await supabase.from("orders").select("*", { count: "exact", head: true })

  const { count: usersCount } = await supabase.from("users").select("*", { count: "exact", head: true })

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Products"
          value={productsCount || 0}
          icon={<Package className="h-8 w-8 text-blue-500" />}
          href="/admin/products"
        />
        <DashboardCard
          title="Categories"
          value={categoriesCount || 0}
          icon={<Store className="h-8 w-8 text-green-500" />}
          href="/admin/categories"
        />
        <DashboardCard
          title="Orders"
          value={ordersCount || 0}
          icon={<ShoppingCart className="h-8 w-8 text-yellow-500" />}
          href="/admin/orders"
        />
        <DashboardCard
          title="Users"
          value={usersCount || 0}
          icon={<Users className="h-8 w-8 text-purple-500" />}
          href="/admin/users"
        />
      </div>
    </div>
  )
}

function DashboardCard({
  title,
  value,
  icon,
  href,
}: {
  title: string
  value: number
  icon: React.ReactNode
  href: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground pt-1">
          <a href={href} className="text-blue-500 hover:underline">
            View all
          </a>
        </p>
      </CardContent>
    </Card>
  )
}
