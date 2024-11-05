"use client"
import { Link } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from "react";
import lottie from "lottie-web";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

const page = () => {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById("lottie-container"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "https://lottie.host/84293a06-58ec-4a88-bfd2-e6d672bb9a5a/ys8UWuIJsR.json",
    });
  }, []);

  const router=useRouter()
  return (
    <>
    <div><ul>
      <li> <Link onClick={()=>{router.push("/requester/create")}} >New  Request</Link>  </li>
      <li> <Link onClick={()=>{router.push("/requester/myrequest")}} >My Request</Link>  </li>
      </ul>  </div>
      <div className="requestor-container bg-gradient-to-r from-purple-500 to-indigo-600 min-h-screen p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white text-center mb-8">Requestor</h1>
      <div id="lottie-container" className="w-64 h-64 mb-8"></div>
      <h2 className="text-2xl font-semibold text-white text-center mb-4">
        "Empowering You with Access to Nourishment, Anytime, Anywhere"
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <p className="text-gray-700 text-center mb-4">
          Kindly be responsible for the quantity of the request you make.
        </p>
        <p className="text-gray-700 text-center mb-4">
          Make use of the food you requested wisely.
        </p>
        <p className="text-gray-700 text-center">
          Please fill in the form to make your request.
        </p>
      </div>

      <Card className="w-full max-w-4xl mt-12 shadow-2xl bg-white rounded-lg transform transition-transform hover:scale-105 hover:shadow-xl">
      <CardHeader className="text-center bg-gradient-to-r from-green-400 to-teal-500 p-4 rounded-t-lg">
          <h2 className="text-2xl font-bold text-white tracking-wide">
            Humanity Coin Allocation
          </h2>
        </CardHeader>
        <CardBody className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="transform transition-transform hover:scale-105">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Volume-Based Reward
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-4">
                <li className="flex items-center">
                  1 - 5Kg of Food: 1
                  <img
                    src="dri.png"
                    alt="icon"
                    className="inline-block w-8 h-8 ml-2 animate-bounce"
                  />
                </li>
                <li className="flex items-center">
                  6 - 10Kg of Food: 2
                  <img
                    src="dri.png"
                    alt="icon"
                    className="inline-block w-8 h-8 ml-2 animate-bounce"
                  />
                </li>
                <li className="flex items-center">
                  11 - 20Kg of Food: 3
                  <img
                    src="dri.png"
                    alt="icon"
                    className="inline-block w-8 h-8 ml-2 animate-bounce"
                  />
                </li>
                <li className="flex items-center">
                  21+Kg of Food: 4
                  <img
                    src="dri.png"
                    alt="icon"
                    className="inline-block w-8 h-8 ml-2 animate-bounce"
                  />
</li>
              </ul>
            </div>
            <div className="transform transition-transform hover:scale-105">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Frequency of Donation
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-4">
                <li className="flex items-center">
                  Monthly Donation: 5
                  <img
                    src="dri.png"
                    alt="icon"
                    className="inline-block w-8 h-8 ml-2 animate-spin"
                  />
                </li>
                <li className="flex items-center">
                  Weekly Donation: 10
                  <img
                    src="dri.png"
                    alt="icon"
                    className="inline-block w-8 h-8 ml-2 animate-spin"
                    />
                    </li>
                    <li className="flex items-center">
                      Daily Donation: 15
                      <img
                        src="dri.png"
                        alt="icon"
                        className="inline-block w-8 h-8 ml-2 animate-spin"
                      />
                    </li>
                  </ul>
                </div>
                <div className="transform transition-transform hover:scale-105">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Active Participation
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-4">
                    <li className="flex items-center">
                      1 - 5 hours of Volunteering: 2
                      <img
 src="dri.png"
 alt="icon"
 className="inline-block w-8 h-8 ml-2 animate-pulse"
/>
</li>
<li className="flex items-center">
6 - 10 hours of Volunteering: 5
<img
 src="dri.png"
 alt="icon"
 className="inline-block w-8 h-8 ml-2 animate-pulse"
/>
</li>
<li className="flex items-center">
11+ hours of Volunteering: 8
<img
 src="dri.png"
 alt="icon"
 className="inline-block w-8 h-8 ml-2 animate-pulse"
/>
</li>
</ul>
</div>
          </div>
        </CardBody>
      </Card>
    </div>


      </>

  )
}

export default page



