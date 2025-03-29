import { Card, CardHeader, CardBody } from "@nextui-org/react"
import { FaHome, FaUtensils, FaComments } from "react-icons/fa"

export default function UseCasesDashboard() {
  return (
    <div className="container mx-auto py-16 px-4 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">USE CASES</h2>
        <p className="text-lg text-gray-600">How Nourish Net Makes a Difference</p>
        <div className="w-24 h-1 bg-green-500 mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <CardHeader className="flex gap-3 pb-0">
            <div className="p-3 rounded-full bg-green-100">
              <FaHome className="text-2xl text-green-600" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-gray-800">Household Food Donation</h3>
            </div>
          </CardHeader>
          <CardBody>
            <div className="mb-4 h-48 overflow-hidden rounded-lg">
              <img
                src="https://utfs.io/f/a9b8f892-fc28-48d6-be0a-3a22f2dc0d06-d48s3m.png"
                alt="Household Food Donation"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-600">
              Users can list surplus meals for donation, with the app connecting them to nearby volunteers or NGOs for
              pick-up and delivery. This reduces food waste and helps those in need.
            </p>
          </CardBody>
        </Card>

        <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <CardHeader className="flex gap-3 pb-0">
            <div className="p-3 rounded-full bg-blue-100">
              <FaUtensils className="text-2xl text-blue-600" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-gray-800">Restaurant Food Surplus</h3>
            </div>
          </CardHeader>
          <CardBody>
            <div className="mb-4 h-48 overflow-hidden rounded-lg">
              <img
                src="https://utfs.io/f/a9b8f892-fc28-48d6-be0a-3a22f2dc0d06-d48s3m.png"
                alt="Restaurant Food Surplus"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-600">
              Restaurants and event organizers can schedule pick-ups for excess food, which is then collected and
              distributed by volunteers or NGOs to shelters and community centers.
            </p>
          </CardBody>
        </Card>

        <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <CardHeader className="flex gap-3 pb-0">
            <div className="p-3 rounded-full bg-purple-100">
              <FaComments className="text-2xl text-purple-600" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-gray-800">User Feedback & Improvement</h3>
            </div>
          </CardHeader>
          <CardBody>
            <div className="mb-4 h-48 overflow-hidden rounded-lg">
              <img
                src="https://utfs.io/f/a9b8f892-fc28-48d6-be0a-3a22f2dc0d06-d48s3m.png"
                alt="User Feedback & Improvement"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-gray-600">
              Users can submit feedback about the donation process, which helps improve the app's features and
              functionality, creating a better experience for all participants.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

