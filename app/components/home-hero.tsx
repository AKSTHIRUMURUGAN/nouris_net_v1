import Image from "next/image"
import { Button } from "@nextui-org/react"
import Link from "next/link"

export default function HomeHero() {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-green-900 text-white p-8 md:p-16 flex flex-col items-center space-y-8 rounded-b-3xl shadow-xl">
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 via-green-300 to-green-500 text-transparent bg-clip-text">
          Make a Difference: Donate Food, Change Lives
        </h1>
        <p className="text-sm md:text-lg leading-relaxed text-gray-200">
          Your generous food donations help provide essential nourishment to those in need. Join us in our mission to
          end hunger and support our community. Every contribution counts!
        </p>
      </div>

      <div className="w-32 h-32 md:w-40 md:h-40 relative">
        <Image
          src="https://utfs.io/f/6acd2fe6-ff76-4a5e-906e-1447de6db90f-2ps.png"
          alt="Nourish Net"
          fill
          className="object-contain drop-shadow-lg"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-8">
        <Button as={Link} href="/donor/create" color="success" size="lg" className="font-semibold">
          Donate Food
        </Button>
        <Button as={Link} href="/requester/create" color="primary" variant="flat" size="lg" className="font-semibold">
          Request Food
        </Button>
      </div>

      <div className="w-full max-w-md bg-white/10 backdrop-blur-sm rounded-lg p-4 mt-6 text-center">
        <p className="text-center text-sm md:text-base font-semibold">
          Over <span className="text-yellow-400 font-bold">1,600</span> meals have been donated in the past 24 hours
        </p>
      </div>
    </div>
  )
}

