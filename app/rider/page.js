"use client"
import { Link } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Card, Button, CardBody, CardHeader } from '@nextui-org/react';
import Lottie from 'lottie-react';
import animationData from '../assets/Animation - 1723325524933.json';

const page = () => {
  const router=useRouter()
  return (
    <>
    <div><ul>
      <li> <Link onClick={()=>{router.push("/rider/create")}} >New Ride</Link>  </li>
      <li> <Link onClick={()=>{router.push("/rider/myride")}} >My Ride</Link>  </li>
      </ul>  </div>
      <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Lottie Animation */}
          <div className="w-full md:w-1/2">
            <Lottie animationData={animationData} loop={true} />
          </div>

          {/* Service Details */}
          <div className="w-full md:w-1/2 md:pl-8">
            <Card className="p-6 shadow-lg bg-white rounded-lg">
              <CardHeader>
                <h1 className="text-4xl font-bold">
                  Welcome to Our Food Delivery Service
                </h1>
              </CardHeader>
              <CardBody>
                <p className="text-lg mt-2">
                  "Join our community of volunteer riders who make a real difference by collecting surplus food and delivering it to those in need. As a volunteer rider, you'll play a crucial role in ensuring that perfectly good food reaches people who can benefit from it. With a flexible schedule and real-time navigation, you can easily pick up donations along your route and deliver them to assigned locations, all while contributing to a cause that matters."
                </p>
                <div className="mt-6">
                  <Button auto color="primary" size="lg">
                    Explore Our Menu
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Additional Information or Features */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold">
            Why Choose Us?
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="w-full sm:w-1/2 md:w-1/4 bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-semibold">🚴‍♂ Make a Difference</h3>
              <p>Help reduce food waste by collecting surplus food on your route and delivering it to those in need.</p>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-semibold">🗺 Flexible Routes</h3>
              <p>Choose pickup locations along your way and deliver food to assigned destinations with real-time navigation.</p>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-semibold">🚚 Real-time Tracking</h3>
              <p>Monitor your Service in real time from start to finish.</p>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-semibold">❤ Customer Support</h3>
              <p>Get help whenever you need it with our 24/7 support.</p>
            </div>
          </div>
        </div>

        {/* Humanity Coin Distribution */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold">
            Humanity Coin Distribution
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="w-full sm:w-1/2 md:w-1/4 bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-semibold">🪙 Earn Humanity Coins</h3>
              <p>Each successful delivery earns you humanity coins, which can be redeemed for rewards or donated to support further causes.</p>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-semibold">💰 Allocate Coins</h3>
              <p>Coins are allocated based on the distance covered and the number of deliveries completed. More deliveries mean more coins!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
      </>
  )
}

export default page

