import { Card, CardHeader, CardBody } from "@nextui-org/react"
import { FaGlobeAmericas, FaLeaf, FaLanguage } from "react-icons/fa"

export default function FutureWorksDashboard() {
  return (
    <div className="container mx-auto py-16 px-4 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">FUTURE WORKS</h2>
        <p className="text-lg text-gray-600">Our Roadmap for Growth and Impact</p>
        <div className="w-24 h-1 bg-green-500 mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <CardHeader className="flex gap-3 pb-0">
            <div className="p-3 rounded-full bg-blue-100">
              <FaGlobeAmericas className="text-2xl text-blue-600" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-gray-800">Geographic Expansion</h3>
            </div>
          </CardHeader>
          <CardBody>
            <div className="mb-4 h-48 overflow-hidden rounded-lg">
              <img
                src="https://utfs.io/f/a9b8f892-fc28-48d6-be0a-3a22f2dc0d06-d48s3m.png"
                alt="Geographic Expansion"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-600">
              We're planning to expand our operations to new regions and international markets, bringing our food
              donation platform to more communities around the world.
            </p>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "35%" }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">35% Complete</p>
            </div>
          </CardBody>
        </Card>

        <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <CardHeader className="flex gap-3 pb-0">
            <div className="p-3 rounded-full bg-green-100">
              <FaLeaf className="text-2xl text-green-600" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-gray-800">Sustainability Integration</h3>
            </div>
          </CardHeader>
          <CardBody>
            <div className="mb-4 h-48 overflow-hidden rounded-lg">
              <img
                src="https://utfs.io/f/a9b8f892-fc28-48d6-be0a-3a22f2dc0d06-d48s3m.png"
                alt="Sustainability Integration"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-600">
              We're working on integrating with other sustainability and eco-friendly platforms to create a more
              comprehensive approach to reducing waste and promoting sustainability.
            </p>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "60%" }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">60% Complete</p>
            </div>
          </CardBody>
        </Card>

        <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <CardHeader className="flex gap-3 pb-0">
            <div className="p-3 rounded-full bg-purple-100">
              <FaLanguage className="text-2xl text-purple-600" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-gray-800">Localization & Multi-Language</h3>
            </div>
          </CardHeader>
          <CardBody>
            <div className="mb-4 h-48 overflow-hidden rounded-lg">
              <img
                src="https://utfs.io/f/a9b8f892-fc28-48d6-be0a-3a22f2dc0d06-d48s3m.png"
                alt="Localization and Multi-Language Support"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-600">
              We're developing localization and multi-language support to make our platform accessible to people from
              different linguistic and cultural backgrounds.
            </p>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "25%" }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">25% Complete</p>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="mt-12 bg-white rounded-xl p-8 shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Get Involved in Our Future</h3>
        <p className="text-gray-600 mb-6">
          We're always looking for partners, developers, and volunteers to help us build the future of Nourish Net. If
          you're interested in contributing to any of these initiatives, please get in touch!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-700">Development Partners</h4>
            <p className="text-sm text-gray-600 mt-1">Help us build new features and expand our platform</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-700">Sustainability Experts</h4>
            <p className="text-sm text-gray-600 mt-1">Guide our environmental impact initiatives</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-700">Translation Volunteers</h4>
            <p className="text-sm text-gray-600 mt-1">Help us make our platform accessible in multiple languages</p>
          </div>
        </div>
      </div>
    </div>
  )
}

