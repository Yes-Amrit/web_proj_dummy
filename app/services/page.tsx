"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Add icons import (you'll need to choose your preferred icon library)
import {
  Video,
  Calendar,
  Brain,
  FileText,
  Bell,
  Activity
} from "lucide-react"

const services = [
  {
    title: "Online Consultations",
    description: "Connect with healthcare professionals from the comfort of your home.",
    icon: <Video className="w-6 h-6" />,
    imageUrl: "/api/placeholder/800/450" // Replace with actual image URL
  },
  {
    title: "Appointment Booking",
    description: "Easily schedule appointments with your preferred doctors.",
    icon: <Calendar className="w-6 h-6" />,
    imageUrl: "/api/placeholder/800/450"
  },
  {
    title: "AI-Powered Health Assistant",
    description: "Get instant answers to your health queries using our advanced AI.",
    icon: <Brain className="w-6 h-6" />,
    imageUrl: "/api/placeholder/800/450"
  },
  {
    title: "Electronic Health Records",
    description: "Securely store and access your medical history anytime, anywhere.",
    icon: <FileText className="w-6 h-6" />,
    imageUrl: "/api/placeholder/800/450"
  },
  {
    title: "Medication Reminders",
    description: "Never miss a dose with our smart medication reminder system.",
    icon: <Bell className="w-6 h-6" />,
    imageUrl: "/api/placeholder/800/450"
  },
  {
    title: "Health Tracking",
    description: "Monitor your vital signs and health metrics with our user-friendly tools.",
    icon: <Activity className="w-6 h-6" />,
    imageUrl: "/api/placeholder/800/450"
  },
]

function EnhancedServiceCard({ service, index, ref }: {
  service: typeof services[0]
  index: number
  ref: (el: HTMLDivElement | null) => void
}) {
  return (
    <motion.div
      ref={ref}
      className="relative group"
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden bg-white rounded-2xl shadow-lg">
        <div className="aspect-w-16 aspect-h-9 overflow-hidden">
          <motion.img
            src={service.imageUrl}
            alt={service.title}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <CardHeader>
          <div className="mb-4 text-blue-600">{service.icon}</div>
          <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{service.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function ServicesPage() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]

    // Initial GSAP animation
    gsap.from(cards, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
    })

    // Optional: Keep the floating animation if desired
    const infiniteAnimation = gsap.to(cards, {
      y: 10,
      stagger: 0.1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      duration: 1.5,
    })

    return () => {
      infiniteAnimation.kill()
    }
  }, [])

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <EnhancedServiceCard
            key={index}
            service={service}
            index={index}
            ref={(el) => (cardsRef.current[index] = el)}
          />
        ))}
      </div>
    </div>
  )
}
