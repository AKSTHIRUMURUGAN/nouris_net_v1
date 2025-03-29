import { Button } from "@nextui-org/react"
import Link from "next/link"
import { FaAward, FaArrowRight } from "react-icons/fa"

export default function HumanityCoinsSection() {
  return (
    <section className="bg-gradient-to-r from-green-50 to-blue-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Earn Humanity Coins</h2>
            <p className="text-lg text-gray-600 mb-6">
              Our reward system recognizes your contributions to fighting hunger and food waste
            </p>
            <ul className="mt-8 space-y-6">
              <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                  <FaAward className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800">Donate Food</h3>
                  <p className="text-gray-600 mt-1">
                    Earn 1-7+ coins based on food quantity (1-21+ kg). The more you donate, the more you earn!
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                  <FaAward className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800">Volunteer</h3>
                  <p className="text-gray-600 mt-1">
                    Earn 5-20 coins for 1-11+ hours of volunteering. Your time makes a difference!
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                  <FaAward className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800">Leadership</h3>
                  <p className="text-gray-600 mt-1">
                    Earn 7-10 coins for managing or leading food drives. Take initiative and be rewarded!
                  </p>
                </div>
              </li>
            </ul>
            <Button
              as={Link}
              href="/humanity-coin"
              color="success"
              className="mt-8 font-semibold"
              endContent={<FaArrowRight />}
            >
              Learn More
            </Button>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-green-200 to-blue-200 rounded-2xl blur-lg opacity-50 transform -rotate-6"></div>
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Humanity Coin Rewards</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="font-medium">25 Coins</span>
                    <span className="text-green-600">Free Delivery Service</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="font-medium">50 Coins</span>
                    <span className="text-green-600">Volunteer Certificate</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="font-medium">100 Coins</span>
                    <span className="text-green-600">Community Hero Badge</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="font-medium">200 Coins</span>
                    <span className="text-green-600">Partner Discounts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">500 Coins</span>
                    <span className="text-green-600">Exclusive Event Access</span>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 text-white text-center">
                <p className="font-semibold">Start earning today!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

