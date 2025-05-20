import { getServerClient } from "@/lib/supabase-server-cookies"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function ProjectsPage() {
  const supabase = await getServerClient()
  const { data: projects, error } = await supabase
    .from("projects")
    .select(`
      *,
      categories (
        name,
        slug
      )
    `)
    .order("completed_date", { ascending: false })

  if (error) {
    console.error("Error fetching projects:", error)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Our Projects</h1>
      <p className="text-gray-600 mb-8">
        Explore our completed projects showcasing Sika products in action across Egypt. From waterproofing to flooring,
        see how our solutions deliver exceptional results.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src={project.image_url || "/placeholder.svg?height=300&width=500"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                {project.is_featured && (
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                    Featured
                  </span>
                )}
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{project.title}</h2>
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {project.location}
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  Completed: {new Date(project.completed_date).toLocaleDateString()}
                </div>
                <p className="text-gray-700 mb-4 line-clamp-3">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                    {project.categories?.name || "General"}
                  </span>
                  <Link href={`/projects/${project.slug}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No projects found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
