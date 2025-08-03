"use client"

import { useEffect, useState } from "react"
import { Heart, Users, Code, Coffee } from "lucide-react"

// Simple confetti component
const Confetti = () => {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      color: string
      size: number
      speedX: number
      speedY: number
      shape: string
    }>
  >([])

  useEffect(() => {
    const colors = [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#96ceb4",
      "#ffeaa7",
      "#dda0dd",
      "#98d8c8",
      "#ff9ff3",
      "#54a0ff",
      "#5f27cd",
      "#00d2d3",
      "#ff9f43",
      "#10ac84",
      "#ee5a24",
      "#0abde3",
      "#feca57",
      "#ff6348",
      "#1dd1a1",
      "#ff3838",
      "#2e86de",
      "#a55eea",
      "#26de81",
      "#fd79a8",
      "#fdcb6e",
    ]

    const shapes = ["circle", "square", "triangle", "star"]

    const createParticle = (id: number) => ({
      id,
      x: Math.random() * window.innerWidth,
      y: -20,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 12 + 6,
      speedX: (Math.random() - 0.5) * 2,
      speedY: Math.random() * 1.5 + 1,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    })

    // Initial particles
    const initialParticles = Array.from({ length: 25 }, (_, i) => createParticle(i))
    setParticles(initialParticles)

    let particleId = 25
    let intervalId: NodeJS.Timeout

    const interval = setInterval(() => {
      setParticles((prev) => {
        // Update existing particles
        const updated = prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.speedX,
            y: particle.y + particle.speedY,
          }))
          .filter((particle) => particle.y < window.innerHeight + 50)

        // Add new particles continuously
        const newParticles = []
        for (let i = 0; i < 1; i++) {
          newParticles.push(createParticle(particleId++))
        }

        return [...updated, ...newParticles]
      })
    }, 150)

    intervalId = interval

    // Stop creating new particles after 10 seconds
    const stopTimeout = setTimeout(() => {
      clearInterval(intervalId)

      // Let existing particles fall and then clear them after another 10 seconds
      setTimeout(() => {
        setParticles([])
      }, 10000)
    }, 10000)

    return () => {
      clearInterval(intervalId)
      clearTimeout(stopTimeout)
    }
  }, [])

  const getShapeStyle = (particle: any) => {
    const baseStyle = {
      left: particle.x,
      top: particle.y,
      width: particle.size,
      height: particle.size,
      backgroundColor: particle.color,
    }

    switch (particle.shape) {
      case "circle":
        return { ...baseStyle, borderRadius: "50%" }
      case "square":
        return { ...baseStyle, transform: "rotate(45deg)" }
      case "triangle":
        return {
          ...baseStyle,
          backgroundColor: "transparent",
          borderLeft: `${particle.size / 2}px solid transparent`,
          borderRight: `${particle.size / 2}px solid transparent`,
          borderBottom: `${particle.size}px solid ${particle.color}`,
          width: 0,
          height: 0,
        }
      case "star":
        return {
          ...baseStyle,
          clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        }
      default:
        return { ...baseStyle, borderRadius: "50%" }
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <div key={particle.id} className="absolute" style={getShapeStyle(particle)} />
      ))}
    </div>
  )
}

export default function FarewellPage() {
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setShowConfetti(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 via-blue-50 via-green-50 to-yellow-100">
      {showConfetti && <Confetti />}

      {/* Header */}
      <header className="text-center py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Farewell, Champion! 👋
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 font-light">
            A celebration of your incredible journey with our team
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 pb-16">
        {/* Hero Message */}
        <section className="text-center mb-16">
          <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-gradient-to-r from-pink-200 to-blue-200">
            <Heart className="w-16 h-16 text-red-500 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-6">
              We Will Miss You! ❤️
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Your dedication, creativity, and positive spirit have made our team stronger. While we're sad to see you
              go, we're excited for your new adventure. You'll always be part of our developer family!
            </p>
          </div>
        </section>

        {/* Photo and QR Code Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Photo Frame */}
          <section className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
              <Users className="w-6 h-6" />
              Our Amazing Teammate
            </h3>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-4">
                <img
                  src="/placeholder.svg?height=400&width=400"
                  alt="Teammate Photo"
                  className="w-full h-80 object-cover rounded-xl shadow-lg"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-yellow-400 rounded-full p-3 shadow-lg">
                <Code className="w-6 h-6 text-yellow-800" />
              </div>
            </div>
          </section>

          {/* QR Code Section */}
          <section className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Stay Connected! 📱</h3>
            <div className="flex flex-col items-center">
              <div className="bg-gray-50 rounded-2xl p-6 mb-4">
                <img src="/placeholder.svg?height=200&width=200" alt="QR Code" className="w-48 h-48 rounded-lg" />
              </div>
              <p className="text-gray-600 text-center">Scan to save contact info or connect on LinkedIn</p>
            </div>
          </section>
        </div>

        {/* Memories Section */}
        <section className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl shadow-2xl p-8 md:p-12 border-2 border-purple-200 mb-16">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 text-center">
            What We'll Remember Most 🌟
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg border-2 border-blue-300">
              <Code className="w-12 h-12 text-blue-700 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-blue-800 mb-2">Clean Code</h4>
              <p className="text-blue-700">Your elegant solutions and attention to detail</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl shadow-lg border-2 border-green-300">
              <Users className="w-12 h-12 text-green-700 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-green-800 mb-2">Team Spirit</h4>
              <p className="text-green-700">Always ready to help and collaborate</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-pink-200 rounded-2xl shadow-lg border-2 border-purple-300">
              <Coffee className="w-12 h-12 text-purple-700 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-purple-800 mb-2">Great Vibes</h4>
              <p className="text-purple-700">Making every standup and code review enjoyable</p>
            </div>
          </div>
        </section>

        {/* Final Message */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 via-red-500 via-yellow-500 via-green-500 to-blue-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Thank You for Everything! 🙏</h3>
            <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-6">
              Your contributions have left a lasting impact on our team and products. We wish you all the success in
              your new role and hope our paths cross again soon!
            </p>
            <div className="text-3xl animate-bounce">🚀 ✨ 💫 🌟 ⭐ 🎉 🎊 🌈</div>
          </div>
        </section>
      </main>
    </div>
  )
}
