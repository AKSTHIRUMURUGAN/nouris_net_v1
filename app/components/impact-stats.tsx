import { Card, CardBody } from "@nextui-org/react"
import { FaUtensils, FaUsers, FaTruck, FaWeightHanging } from "react-icons/fa"

export default function ImpactStats() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Impact</h2>
          <p className="text-lg text-gray-600">Together, we&apos;re making a difference in our community</p>
          <div className="w-24 h-1 bg-green-500 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardBody className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-red-100">
                  <FaUtensils className="text-3xl text-red-500" />
                </div>
              </div>
              <p className="text-4xl font-bold text-red-500 mb-2">1,200+</p>
              <p className="text-lg font-medium text-gray-700">Meals Donated</p>
              <p className="text-sm text-gray-500 mt-2">Providing nutrition to those in need</p>
            </CardBody>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardBody className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-blue-100">
                  <FaUsers className="text-3xl text-blue-500" />
                </div>
              </div>
              <p className="text-4xl font-bold text-blue-500 mb-2">350+</p>
              <p className="text-lg font-medium text-gray-700">Active Donors</p>
              <p className="text-sm text-gray-500 mt-2">Committed to fighting hunger</p>
            </CardBody>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardBody className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-green-100">
                  <FaTruck className="text-3xl text-green-500" />
                </div>
              </div>
              <p className="text-4xl font-bold text-green-500 mb-2">500+</p>
              <p className="text-lg font-medium text-gray-700">Deliveries Completed</p>
              <p className="text-sm text-gray-500 mt-2">Connecting donors with recipients</p>
            </CardBody>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardBody className="text-center p-6">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-purple-100">
                  <FaWeightHanging className="text-3xl text-purple-500" />
                </div>
              </div>
              <p className="text-4xl font-bold text-purple-500 mb-2">2,500+</p>
              <p className="text-lg font-medium text-gray-700">Kg Food Saved</p>
              <p className="text-sm text-gray-500 mt-2">Reducing waste, feeding people</p>
            </CardBody>
          </Card>
        </div>

        <div className="mt-16 bg-gray-50 rounded-xl p-8 shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Monthly Progress</h3>
              <p className="text-gray-600 mb-6">
                We&apos;re growing every month, with more donors, riders, and recipients joining our community. Here&apos;s how
                we&apos;ve been doing:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center justify-between">
                  <span className="text-gray-700">New Donors:</span>
                  <span className="font-semibold text-green-600">+24% this month</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-700">Food Waste Reduction:</span>
                  <span className="font-semibold text-green-600">+18% this month</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-700">People Fed:</span>
                  <span className="font-semibold text-green-600">+32% this month</span>
                </li>
              </ul>
            </div>
            <div className="h-64 bg-white rounded-lg shadow-md p-4">
              <div className="text-center text-gray-500 h-full flex items-center justify-center">
                [Impact Growth Chart]
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

