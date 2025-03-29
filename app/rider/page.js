"use client"

import { Link, Card, Button, CardBody, CardHeader } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { FaMotorcycle, FaHistory, FaAward } from "react-icons/fa"
import Lottie from "lottie-react"
import animationData from "../assets/Animation - 1723325524933.json"

export default function RiderPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <Card className="flex-1 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700">
            <CardBody>
              <div className="flex flex-col items-center gap-4">
                <FaMotorcycle className="text-4xl text-primary" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create New Ride</h2>
                <p className="text-center text-gray-700 dark:text-gray-300">
                  Start a new delivery to help distribute food
                </p>
                <Button as={Link} href="/rider/create" color="primary" className="w-full">
                  New Ride
                </Button>
              </div>
            </CardBody>
          </Card>

          <Card className="flex-1 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700">
            <CardBody>
              <div className="flex flex-col items-center gap-4">
                <FaHistory className="text-4xl text-secondary" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Rides</h2>
                <p className="text-center text-gray-700 dark:text-gray-300">
                  View and manage your delivery history
                </p>
                <Button as={Link} href="/rider/myride" color="secondary" className="w-full">
                  View Rides
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="w-full md:w-1/2">
            <Lottie animationData={animationData} loop={true} />
          </div>

          <div className="w-full md:w-1/2 md:pl-8">
            <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700 rounded-lg">
              <CardHeader>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  Welcome to Our Food Delivery Service
                </h1>
              </CardHeader>
              <CardBody>
                <p className="text-lg mt-2 text-gray-700 dark:text-gray-300">
                  &quot;Join our community of volunteer riders who make a real difference by collecting surplus food and
                  delivering it to those in need...&quot;
                </p>
                <div className="mt-6">
                  <Button as={Link} href="/donor" color="primary" size="lg">
                    Explore Available Donations
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why Choose Us?</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "🚴‍♂ Make a Difference", desc: "Help reduce food waste by collecting surplus food on your route." },
              { title: "🗺 Flexible Routes", desc: "Choose pickup locations and deliver food with real-time navigation." },
              { title: "🚚 Real-time Tracking", desc: "Monitor your service in real time from start to finish." },
              { title: "❤ Customer Support", desc: "Get help whenever you need it with our 24/7 support." },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Humanity Coin Distribution */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Humanity Coin Distribution</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "🪙 Earn Humanity Coins", desc: "Earn coins for successful deliveries and redeem for rewards." },
              { title: "💰 Allocate Coins", desc: "Coins are allocated based on distance and number of deliveries." },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-green-500 to-teal-500 text-white p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <FaAward className="text-5xl mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Become a Rider Today</h2>
            <p className="text-lg mb-6">Join our community of riders and make a real difference in people&apos;s lives</p>
            <Button as={Link} href="/rider/create" color="default" size="lg" className="font-bold">
              Start Your Journey
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
