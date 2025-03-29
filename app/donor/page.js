"use client"

import { Link, Card, Button, CardBody, CardHeader } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FaHandHoldingHeart, FaGift, FaCoins } from "react-icons/fa";
import animationData from "../assets/Animation - 1723325524933.json";
import dynamic from "next/dynamic"
const Lottie = dynamic(
  () => import('lottie-react'),
  { ssr: false }
)
export default function DonorPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <Card className="flex-1 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700">
            <CardBody>
              <div className="flex flex-col items-center gap-4">
                <FaHandHoldingHeart className="text-4xl text-primary" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">New Donation</h2>
                <p className="text-center text-gray-700 dark:text-gray-300">
                  Contribute food and make a difference
                </p>
                <Button as={Link} href="/donor/create" color="primary" className="w-full">
                  Donate Now
                </Button>
              </div>
            </CardBody>
          </Card>

          <Card className="flex-1 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700">
            <CardBody>
              <div className="flex flex-col items-center gap-4">
                <FaGift className="text-4xl text-secondary" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Donations</h2>
                <p className="text-center text-gray-700 dark:text-gray-300">
                  Track and manage your past donations
                </p>
                <Button as={Link} href="/donor/mydonation" color="secondary" className="w-full">
                  View Donations
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="w-full md:w-1/2">
          {typeof window !== 'undefined' && (
    <Lottie 
      animationData={animationData} 
      loop={true}
      style={{ width: '100%', height: '400px' }}
    />
  )}
          </div>

          <div className="w-full md:w-1/2 md:pl-8">
            <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700 rounded-lg">
              <CardHeader>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  Become a Food Donor Today
                </h1>
              </CardHeader>
              <CardBody>
                <p className="text-lg mt-2 text-gray-700 dark:text-gray-300">
                  Join our initiative to reduce food waste and feed those in need. Your contributions make a real impact.
                </p>
                <div className="mt-6">
                  <Button as={Link} href="/donor/create" color="primary" size="lg">
                    Start Donating
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Humanity Coin Rewards */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Humanity Coin Rewards</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "🪙 Earn Coins", desc: "Receive Humanity Coins for every donation you make." },
              { title: "💰 Redeem Rewards", desc: "Use your earned coins for tax benefits, discounts, and more." },
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
      </div>
    </div>
  );
}
