import { createServerClient } from "@/lib/supabase"
import { MapPin, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

// Function to fetch distributors
async function getDistributors() {
  const supabase = createServerClient()
  const { data, error } = await supabase.from("distributors").select("*").eq("is_verified", true).order("name")

  if (error) {
    console.error("Error fetching distributors:", error)
    return []
  }

  return data
}

export default async function DistributorsPage() {
  const distributors = await getDistributors()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Our Distributors</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find our products at these trusted distributors across Egypt and neighboring countries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {distributors.length > 0 ? (
          distributors.map((distributor) => (
            <div key={distributor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{distributor.name}</h2>
                <div className="space-y-3 mb-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                    <p className="text-gray-700">
                      {distributor.address}, {distributor.city}, {distributor.state}, {distributor.country}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-red-600 mr-2" />
                    <p className="text-gray-700">{distributor.phone}</p>
                  </div>
                  {distributor.email && (
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-red-600 mr-2" />
                      <p className="text-gray-700">{distributor.email}</p>
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">Get Directions</Button>
                  <Button variant="outline">Contact</Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No distributors found. Please check back later.</p>
          </div>
        )}
      </div>
    </div>
  )
}
