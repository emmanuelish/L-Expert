import { Briefcase, GraduationCap, FileText } from "lucide-react"

const services = [
  {
    title: "Student Resumes",
    description: "Tailored resumes for students and recent graduates entering the job market.",
    icon: GraduationCap,
  },
  {
    title: "Professional CVs",
    description: "Comprehensive CVs for experienced professionals looking to advance their careers.",
    icon: Briefcase,
  },
  {
    title: "Resume Editing",
    description: "Polish and refine your existing resume to make it stand out to potential employers.",
    icon: FileText,
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <service.icon className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

