"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bell, Mail, Tag, Truck, CreditCard, AlertCircle, MessageSquare, Info } from "lucide-react"

export default function NotificationsPage() {
  const [emailNotifications, setEmailNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    productUpdates: false,
    newsletter: true,
    accountSecurity: true,
  })

  const [pushNotifications, setPushNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    productUpdates: false,
    accountSecurity: true,
  })

  const [recentNotifications, setRecentNotifications] = useState([
    {
      id: 1,
      type: "order",
      title: "Order #12345 Shipped",
      message: "Your order has been shipped and is on its way to you.",
      date: "May 18, 2025",
      read: false,
    },
    {
      id: 2,
      type: "promotion",
      title: "Special Offer: 15% Off Waterproofing Products",
      message: "Use code WATER15 at checkout to get 15% off all waterproofing products.",
      date: "May 15, 2025",
      read: true,
    },
    {
      id: 3,
      type: "account",
      title: "Password Changed Successfully",
      message: "Your account password was changed successfully.",
      date: "May 10, 2025",
      read: true,
    },
    {
      id: 4,
      type: "product",
      title: "New Product: SikaFlex Pro-3",
      message: "We've added a new product to our catalog. Check out SikaFlex Pro-3 for advanced joint sealing.",
      date: "May 5, 2025",
      read: true,
    },
    {
      id: 5,
      type: "order",
      title: "Order #12344 Delivered",
      message: "Your order has been delivered. Thank you for shopping with us!",
      date: "May 3, 2025",
      read: true,
    },
  ])

  const handleToggleEmailNotification = (key: keyof typeof emailNotifications) => {
    setEmailNotifications({
      ...emailNotifications,
      [key]: !emailNotifications[key],
    })
  }

  const handleTogglePushNotification = (key: keyof typeof pushNotifications) => {
    setPushNotifications({
      ...pushNotifications,
      [key]: !pushNotifications[key],
    })
  }

  const markAsRead = (id: number) => {
    setRecentNotifications(
      recentNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    )
  }

  const markAllAsRead = () => {
    setRecentNotifications(recentNotifications.map((notification) => ({ ...notification, read: true })))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return <Truck className="h-5 w-5 text-blue-600" />
      case "promotion":
        return <Tag className="h-5 w-5 text-green-600" />
      case "account":
        return <CreditCard className="h-5 w-5 text-purple-600" />
      case "product":
        return <Info className="h-5 w-5 text-orange-600" />
      default:
        return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Notifications</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Recent Notifications</h2>
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  Mark All as Read
                </Button>
              </div>

              {recentNotifications.length > 0 ? (
                <div className="space-y-4">
                  {recentNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`border rounded-lg p-4 ${notification.read ? "bg-white" : "bg-blue-50"}`}
                    >
                      <div className="flex items-start">
                        <div className="mr-4 mt-1">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <h3 className={`font-bold ${notification.read ? "" : "text-blue-800"}`}>
                              {notification.title}
                            </h3>
                            <span className="text-xs text-gray-500">{notification.date}</span>
                          </div>
                          <p className="text-gray-700 mt-1">{notification.message}</p>
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-2 h-auto p-0 text-blue-600"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold mb-2">No Notifications</h3>
                  <p className="text-gray-600">You don't have any notifications at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">Notification Settings</h2>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center mb-4">
                    <Mail className="h-5 w-5 text-gray-600 mr-2" />
                    <h3 className="font-bold">Email Notifications</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label htmlFor="email-order-updates" className="text-sm">
                        Order Updates
                      </label>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input
                          type="checkbox"
                          id="email-order-updates"
                          className="toggle"
                          checked={emailNotifications.orderUpdates}
                          onChange={() => handleToggleEmailNotification("orderUpdates")}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label htmlFor="email-promotions" className="text-sm">
                        Promotions and Discounts
                      </label>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input
                          type="checkbox"
                          id="email-promotions"
                          className="toggle"
                          checked={emailNotifications.promotions}
                          onChange={() => handleToggleEmailNotification("promotions")}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label htmlFor="email-product-updates" className="text-sm">
                        Product Updates
                      </label>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input
                          type="checkbox"
                          id="email-product-updates"
                          className="toggle"
                          checked={emailNotifications.productUpdates}
                          onChange={() => handleToggleEmailNotification("productUpdates")}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label htmlFor="email-newsletter" className="text-sm">
                        Newsletter
                      </label>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input
                          type="checkbox"
                          id="email-newsletter"
                          className="toggle"
                          checked={emailNotifications.newsletter}
                          onChange={() => handleToggleEmailNotification("newsletter")}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label htmlFor="email-account-security" className="text-sm">
                        Account Security
                      </label>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input
                          type="checkbox"
                          id="email-account-security"
                          className="toggle"
                          checked={emailNotifications.accountSecurity}
                          onChange={() => handleToggleEmailNotification("accountSecurity")}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="flex items-center mb-4">
                    <Bell className="h-5 w-5 text-gray-600 mr-2" />
                    <h3 className="font-bold">Push Notifications</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label htmlFor="push-order-updates" className="text-sm">
                        Order Updates
                      </label>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input
                          type="checkbox"
                          id="push-order-updates"
                          className="toggle"
                          checked={pushNotifications.orderUpdates}
                          onChange={() => handleTogglePushNotification("orderUpdates")}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label htmlFor="push-promotions" className="text-sm">
                        Promotions and Discounts
                      </label>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input
                          type="checkbox"
                          id="push-promotions"
                          className="toggle"
                          checked={pushNotifications.promotions}
                          onChange={() => handleTogglePushNotification("promotions")}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label htmlFor="push-product-updates" className="text-sm">
                        Product Updates
                      </label>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input
                          type="checkbox"
                          id="push-product-updates"
                          className="toggle"
                          checked={pushNotifications.productUpdates}
                          onChange={() => handleTogglePushNotification("productUpdates")}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label htmlFor="push-account-security" className="text-sm">
                        Account Security
                      </label>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input
                          type="checkbox"
                          id="push-account-security"
                          className="toggle"
                          checked={pushNotifications.accountSecurity}
                          onChange={() => handleTogglePushNotification("accountSecurity")}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 p-4 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-blue-800">
                  Some notifications, such as order confirmations and security alerts, cannot be disabled as they
                  contain important information about your account and orders.
                </p>
              </div>

              <div className="mt-6">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Save Preferences</Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <MessageSquare className="h-5 w-5 text-gray-600 mr-2" />
                <h3 className="font-bold">Need Help?</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                If you're having trouble with notifications or have questions about your account, our support team is
                here to help.
              </p>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
