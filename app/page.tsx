import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, ArrowRight, Shield, Truck, HeartHandshake, Award, CheckCircle, ChevronRight } from "lucide-react"

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[500px] md:h-[600px]">
          <Image
            src="/hero-banner-new.png"
            alt="Sika Construction Materials - Professional Tiling Solutions"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Professional Tiling Solutions</h1>
                <p className="text-xl text-white mb-8">
                  High-quality adhesives and grouts for perfect tile installation in any project.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Link href="/products" className="flex items-center">
                      Browse Products
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="bg-white hover:bg-gray-100 text-gray-900">
                    <Link href="/distributors" className="flex items-center">
                      Find a Distributor
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Product Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of high-quality construction materials designed for durability, performance, and
              ease of application.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <CategoryCard
              title="Waterproofing"
              image="/placeholder.svg?height=300&width=400&text=Waterproofing"
              description="Solutions for protecting structures against water ingress and damage."
              link="/products/waterproofing"
            />
            <CategoryCard
              title="Concrete Repair"
              image="/placeholder.svg?height=300&width=400&text=Concrete+Repair"
              description="Products for restoring and strengthening damaged concrete structures."
              link="/products/concrete-repair"
            />
            <CategoryCard
              title="Flooring"
              image="/placeholder.svg?height=300&width=400&text=Flooring"
              description="High-performance flooring systems for industrial and commercial applications."
              link="/products/flooring"
            />
            <CategoryCard
              title="Sealants & Adhesives"
              image="/placeholder.svg?height=300&width=400&text=Sealants"
              description="Flexible joint sealants and strong adhesives for various construction needs."
              link="/products/sealants"
            />
            <CategoryCard
              title="Roofing"
              image="/placeholder.svg?height=300&width=400&text=Roofing"
              description="Durable and weather-resistant solutions for all types of roofs."
              link="/products/roofing"
            />
            <CategoryCard
              title="Grouts & Anchors"
              image="/placeholder.svg?height=300&width=400&text=Grouts"
              description="Precision grouts and anchoring systems for structural stability."
              link="/products/grouts"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link href="/products" className="text-red-600 hover:underline flex items-center">
              View All Products
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard
              title="SikaTop Seal-107"
              image="/placeholder.svg?height=300&width=300&text=SikaTop+Seal-107"
              price="EGP 230"
              category="Waterproofing"
              isBestseller={true}
            />
            <ProductCard
              title="Sika MonoTop-610"
              image="/placeholder.svg?height=300&width=300&text=Sika+MonoTop-610"
              price="EGP 250"
              category="Concrete Repair"
              isBestseller={true}
            />
            <ProductCard
              title="SikaFloor Level"
              image="/placeholder.svg?height=300&width=300&text=SikaFloor+Level"
              price="EGP 230"
              category="Flooring"
              isBestseller={true}
            />
            <ProductCard
              title="Sikaflex-11 FC+"
              image="/placeholder.svg?height=300&width=300&text=Sikaflex-11+FC+"
              price="EGP 500"
              category="Sealants"
              isBestseller={false}
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              With over 100 years of experience, Sika is a trusted global leader in construction chemicals and building
              materials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-red-600" />}
              title="Quality Guaranteed"
              description="All our products meet the highest industry standards and come with a quality guarantee."
            />
            <FeatureCard
              icon={<Truck className="h-10 w-10 text-red-600" />}
              title="Fast Delivery"
              description="We offer reliable and fast delivery services across Egypt and neighboring countries."
            />
            <FeatureCard
              icon={<HeartHandshake className="h-10 w-10 text-red-600" />}
              title="Technical Support"
              description="Our team of experts provides technical support and advice for your construction projects."
            />
            <FeatureCard
              icon={<Award className="h-10 w-10 text-red-600" />}
              title="Certified Products"
              description="Our products are certified by international organizations for quality and sustainability."
            />
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Projects</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover how our products have been used in major construction projects across Egypt and the Middle East.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProjectCard
              title="Cairo Tower Renovation"
              image="/placeholder.svg?height=400&width=600&text=Cairo+Tower"
              category="Concrete Repair"
            />
            <ProjectCard
              title="Alexandria Waterfront"
              image="/placeholder.svg?height=400&width=600&text=Alexandria+Waterfront"
              category="Waterproofing"
            />
            <ProjectCard
              title="Luxor Commercial Center"
              image="/placeholder.svg?height=400&width=600&text=Luxor+Center"
              category="Flooring"
            />
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
              View All Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Read testimonials from contractors, engineers, and distributors who trust our products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Sika products have consistently delivered excellent results for our waterproofing projects. The technical support team is always available to help."
              author="Ahmed Mahmoud"
              position="Senior Engineer, ABC Construction"
              image="/placeholder.svg?height=100&width=100&text=AM"
            />
            <TestimonialCard
              quote="We've been using SikaFloor products for our industrial clients for over 5 years. The durability and finish quality are unmatched in the market."
              author="Sara Hassan"
              position="Project Manager, XYZ Contractors"
              image="/placeholder.svg?height=100&width=100&text=SH"
            />
            <TestimonialCard
              quote="As a distributor, I appreciate Sika's commitment to quality and innovation. Their products are in high demand and the support we receive is excellent."
              author="Mohamed Ali"
              position="Owner, Cairo Building Materials"
              image="/placeholder.svg?height=100&width=100&text=MA"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold mb-2">Ready to Start Your Project?</h2>
              <p className="text-white text-opacity-90">
                Contact us today for product information, technical support, or to find a distributor near you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-red-600 hover:bg-gray-100">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                <Link href="/distributors">Find a Distributor</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function CategoryCard({
  title,
  image,
  description,
  link,
}: {
  title: string
  image: string
  description: string
  link: string
}) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1">
      <div className="aspect-video overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={400}
          height={300}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link href={link} className="text-red-600 hover:underline flex items-center">
          Explore Products
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

function ProductCard({
  title,
  image,
  price,
  category,
  isBestseller,
}: {
  title: string
  image: string
  price: string
  category: string
  isBestseller: boolean
}) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        {isBestseller && (
          <div className="absolute top-2 left-2 bg-yellow-200 text-black text-xs font-bold px-3 py-1 rounded-full">
            Bestseller
          </div>
        )}
        <div className="aspect-square overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            width={300}
            height={300}
            className="object-contain w-full h-full"
          />
        </div>
      </div>
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-gray-500">{category}</span>
        </div>
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-gray-700 mb-4">{price}</p>
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="text-center p-6 border rounded-lg">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function ProjectCard({ title, image, category }: { title: string; image: string; category: string }) {
  return (
    <div className="relative group overflow-hidden rounded-lg">
      <div className="aspect-video overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={600}
          height={400}
          className="object-cover w-full h-full transition-transform group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
      <div className="absolute bottom-0 left-0 p-6">
        <span className="text-sm text-gray-300 mb-2 block">{category}</span>
        <h3 className="font-bold text-xl text-white">{title}</h3>
      </div>
    </div>
  )
}

function TestimonialCard({
  quote,
  author,
  position,
  image,
}: {
  quote: string
  author: string
  position: string
  image: string
}) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <Image
            src={image || "/placeholder.svg"}
            alt={author}
            width={48}
            height={48}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h4 className="font-bold">{author}</h4>
          <p className="text-sm text-gray-600">{position}</p>
        </div>
      </div>
      <p className="text-gray-700 italic">"{quote}"</p>
      <div className="mt-4 flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <CheckCircle key={star} className="h-5 w-5 text-yellow-500" />
        ))}
      </div>
    </div>
  )
}
