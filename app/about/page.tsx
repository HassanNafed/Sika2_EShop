import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">About Us</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="aspect-video w-full">
            <Image
              src="/placeholder.svg?height=500&width=1000&text=Company+Overview"
              alt="Company Overview"
              width={1000}
              height={500}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="mb-4">
              Founded in 1910, Sika is a specialty chemicals company with a leading position in the development and
              production of systems and products for bonding, sealing, damping, reinforcing, and protecting in the
              building sector and motor vehicle industry.
            </p>
            <p className="mb-4">
              Sika has subsidiaries in more than 100 countries around the world and manufactures in over 300 factories.
              Sika employs more than 25,000 people and generated sales of CHF 8.1 billion in fiscal 2019.
            </p>
            <p>
              In Egypt, Sika has been present since 1997 and has grown to become one of the leading suppliers of
              specialty chemicals for the construction industry, offering a wide range of high-quality products and
              solutions.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Our Mission & Values</h2>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Mission</h3>
              <p>
                Our mission is to provide innovative solutions that enhance the performance, durability, and aesthetic
                appeal of buildings and infrastructure projects, while promoting sustainability and environmental
                responsibility.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-bold mb-2">Quality</h3>
                <p className="text-sm">
                  We are committed to delivering products and services of the highest quality that meet or exceed our
                  customers' expectations.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-bold mb-2">Innovation</h3>
                <p className="text-sm">
                  We continuously strive to develop new products and solutions that address the evolving needs of the
                  construction industry.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-bold mb-2">Sustainability</h3>
                <p className="text-sm">
                  We are dedicated to minimizing our environmental footprint and promoting sustainable construction
                  practices.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-bold mb-2">Integrity</h3>
                <p className="text-sm">We conduct our business with honesty, transparency, and ethical standards.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-bold mb-2">Customer Focus</h3>
                <p className="text-sm">
                  We put our customers at the center of everything we do, striving to understand and meet their needs.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-bold mb-2">Teamwork</h3>
                <p className="text-sm">
                  We believe in the power of collaboration and work together to achieve common goals.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Our Team</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <Image
                    src="/placeholder.svg?height=128&width=128&text=CEO"
                    alt="CEO"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="font-bold">Ahmed Hassan</h3>
                <p className="text-sm text-gray-600">Chief Executive Officer</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <Image
                    src="/placeholder.svg?height=128&width=128&text=CTO"
                    alt="CTO"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="font-bold">Mohamed Ibrahim</h3>
                <p className="text-sm text-gray-600">Chief Technical Officer</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <Image
                    src="/placeholder.svg?height=128&width=128&text=COO"
                    alt="COO"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="font-bold">Sara Ahmed</h3>
                <p className="text-sm text-gray-600">Chief Operations Officer</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <Image
                    src="/placeholder.svg?height=128&width=128&text=Sales"
                    alt="Sales Director"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="font-bold">Khaled Mahmoud</h3>
                <p className="text-sm text-gray-600">Sales Director</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <Image
                    src="/placeholder.svg?height=128&width=128&text=Marketing"
                    alt="Marketing Director"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="font-bold">Nour El-Din</h3>
                <p className="text-sm text-gray-600">Marketing Director</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                  <Image
                    src="/placeholder.svg?height=128&width=128&text=R%26D"
                    alt="R&D Manager"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="font-bold">Laila Farouk</h3>
                <p className="text-sm text-gray-600">R&D Manager</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Our Facilities</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Image
                  src="/placeholder.svg?height=300&width=500&text=Manufacturing+Plant"
                  alt="Manufacturing Plant"
                  width={500}
                  height={300}
                  className="rounded-lg object-cover w-full h-auto mb-4"
                />
                <h3 className="font-bold mb-2">Manufacturing Plant</h3>
                <p className="text-sm text-gray-600">
                  Our state-of-the-art manufacturing facility in Cairo produces a wide range of construction chemicals
                  and materials, adhering to the highest quality standards.
                </p>
              </div>
              <div>
                <Image
                  src="/placeholder.svg?height=300&width=500&text=R%26D+Center"
                  alt="R&D Center"
                  width={500}
                  height={300}
                  className="rounded-lg object-cover w-full h-auto mb-4"
                />
                <h3 className="font-bold mb-2">Research & Development Center</h3>
                <p className="text-sm text-gray-600">
                  Our R&D center is equipped with advanced testing equipment and staffed by experienced scientists and
                  engineers who work on developing innovative solutions.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Image
                  src="/placeholder.svg?height=300&width=500&text=Training+Center"
                  alt="Training Center"
                  width={500}
                  height={300}
                  className="rounded-lg object-cover w-full h-auto mb-4"
                />
                <h3 className="font-bold mb-2">Training Center</h3>
                <p className="text-sm text-gray-600">
                  Our training center provides comprehensive programs for contractors, engineers, and distributors to
                  enhance their knowledge of our products and application techniques.
                </p>
              </div>
              <div>
                <Image
                  src="/placeholder.svg?height=300&width=500&text=Distribution+Center"
                  alt="Distribution Center"
                  width={500}
                  height={300}
                  className="rounded-lg object-cover w-full h-auto mb-4"
                />
                <h3 className="font-bold mb-2">Distribution Center</h3>
                <p className="text-sm text-gray-600">
                  Our distribution center ensures efficient delivery of our products throughout Egypt and neighboring
                  countries, with a focus on reliability and timeliness.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Certifications & Achievements</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4">
                  <Image
                    src="/placeholder.svg?height=96&width=96&text=ISO+9001"
                    alt="ISO 9001"
                    width={96}
                    height={96}
                    className="object-contain w-full h-full"
                  />
                </div>
                <h3 className="font-bold text-sm">ISO 9001:2015</h3>
                <p className="text-xs text-gray-600">Quality Management</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4">
                  <Image
                    src="/placeholder.svg?height=96&width=96&text=ISO+14001"
                    alt="ISO 14001"
                    width={96}
                    height={96}
                    className="object-contain w-full h-full"
                  />
                </div>
                <h3 className="font-bold text-sm">ISO 14001:2015</h3>
                <p className="text-xs text-gray-600">Environmental Management</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4">
                  <Image
                    src="/placeholder.svg?height=96&width=96&text=OHSAS+18001"
                    alt="OHSAS 18001"
                    width={96}
                    height={96}
                    className="object-contain w-full h-full"
                  />
                </div>
                <h3 className="font-bold text-sm">OHSAS 18001:2007</h3>
                <p className="text-xs text-gray-600">Occupational Health & Safety</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4">
                  <Image
                    src="/placeholder.svg?height=96&width=96&text=Green+Building"
                    alt="Green Building"
                    width={96}
                    height={96}
                    className="object-contain w-full h-full"
                  />
                </div>
                <h3 className="font-bold text-sm">Green Building Certified</h3>
                <p className="text-xs text-gray-600">Sustainable Products</p>
              </div>
            </div>

            <div className="text-center">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
