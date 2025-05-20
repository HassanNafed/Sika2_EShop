import { getServerClient } from "@/lib/supabase-server-cookies"
import Link from "next/link"
import { MapPin, Phone, Mail, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function DistributorsPage() {
  const supabase = await getServerClient()
  const { data: distributors, error } = await supabase.from("distributors").select("*").order("name")

  if (error) {
    console.error("Error fetching distributors:", error)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Our Distributors</h1>
      <p className="text-gray-600 mb-8">
        Find Sika products at these authorized distributors across Egypt. All distributors offer expert advice and
        competitive pricing.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {distributors && distributors.length > 0 ? (
          distributors.map((distributor) => (
            <div key={distributor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-bold">{distributor.name}</h2>
                  {distributor.is_verified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                      <Check className="h-3 w-3 mr-1" />
                      Verified
                    </span>
                  )}
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-gray-700">
                        {distributor.address}
                        <br />
                        {distributor.city}, {distributor.state}
                        <br />
                        {distributor.country}, {distributor.postal_code}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-500 mr-2" />
                    <p className="text-gray-700">{distributor.phone}</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-500 mr-2" />
                    <p className="text-gray-700">{distributor.email}</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button className="bg-red-600 hover:bg-red-700 text-white flex-1">
                    <Link
                      href={`https://maps.google.com/?q=${distributor.latitude},${distributor.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      View on Map
                    </Link>
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Link href={`mailto:${distributor.email}`} className="w-full">
                      Contact
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No distributors found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
