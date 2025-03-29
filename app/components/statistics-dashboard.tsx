import { Card, CardBody } from "@nextui-org/react"
import { FaChartLine, FaUtensils, FaExclamationTriangle } from "react-icons/fa"

export default function StatisticsDashboard() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">STATISTICS</h2>
        <p className="text-lg text-gray-600">Real-Time Data on Food Waste & Hunger</p>
        <div className="w-24 h-1 bg-green-500 mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden shadow-xl">
          <img
            src="https://utfs.io/f/a9b8f892-fc28-48d6-be0a-3a22f2dc0d06-d48s3m.png"
            alt="Economic Loss by Source and Interventions"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-6 text-white">
              <h3 className="text-xl font-bold">Food Waste Impact Analysis</h3>
              <p className="text-sm opacity-90">Source: Food and Agriculture Organization (FAO)</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-none shadow-md">
            <CardBody className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-red-100">
                <FaUtensils className="text-2xl text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Urban Food Waste</h3>
                <p className="text-gray-600">
                  One-third of global food production is lost or wasted annually, amounting to approximately
                  <span className="font-bold text-red-600"> 1.3 billion tonnes</span> of food.
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="border-none shadow-md">
            <CardBody className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-amber-100">
                <FaExclamationTriangle className="text-2xl text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Hunger-Related Deaths</h3>
                <p className="text-gray-600">
                  Hunger and malnutrition cause{" "}
                  <span className="font-bold text-amber-600">3.1 million child deaths annually</span>, worsened by urban
                  poverty and social disparities.
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="border-none shadow-md">
            <CardBody className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-green-100">
                <FaChartLine className="text-2xl text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Potential Impact</h3>
                <p className="text-gray-600">
                  Redistributing just <span className="font-bold text-green-600">25%</span> of the food currently wasted
                  worldwide would be enough to feed <span className="font-bold text-green-600">870 million</span> hungry
                  people.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

