"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from "react"
import lottie from "lottie-web"
import { Button } from "../../components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Coins, Clock, Scale, HeartHandshake, ArrowRight } from "lucide-react"

const Page = () => {
  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      const container = document.getElementById("lottie-container");
      if (container) {
        const animation = lottie.loadAnimation({
          container,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: "https://lottie.host/84293a06-58ec-4a88-bfd2-e6d672bb9a5a/ys8UWuIJsR.json",
        });

        return () => animation.destroy();
      }
    }
  }, []);

  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      {/* Navigation */}
      <nav className="p-4 bg-white border-b border-gray-200 shadow-sm">
        <Tabs defaultValue="request" className="w-full max-w-md mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger 
              value="request" 
              onClick={() => router.push("/requester/create")}
              className="flex items-center gap-2"
            >
              <HeartHandshake className="h-4 w-4" />
              New Request
            </TabsTrigger>
            <TabsTrigger 
              value="myrequests" 
              onClick={() => router.push("/requester/myrequest")}
              className="flex items-center gap-2"
            >
              <Clock className="h-4 w-4" />
              My Requests
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Food Request Portal
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Empowering you with access to nourishment, anytime, anywhere
          </p>
          
          <div id="lottie-container" className="w-64 h-64 mx-auto mb-8" />
          
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-gray-800 mb-3">
              Kindly be responsible for the quantity of the request you make.
            </p>
            <p className="text-gray-800 mb-3">
              Make use of the food you requested wisely.
            </p>
            <p className="text-gray-800">
              Please fill in the form to make your request.
            </p>
            
            <Button 
              onClick={() => router.push("/requester/create")}
              className="mt-6 group"
            >
              Create New Request
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>

        {/* Humanity Coin Allocation */}
        <section className="max-w-6xl mx-auto">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2 text-gray-900">
                <Coins className="h-6 w-6 text-yellow-500" />
                Humanity Coin Allocation
              </CardTitle>
              <CardDescription className="text-gray-600">
                Earn coins through your contributions and responsible requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Volume-Based Reward */}
                <Card className="bg-white border border-gray-200 hover:border-indigo-300 transition-all shadow-sm">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Scale className="h-5 w-5 text-purple-500" />
                      <CardTitle className="text-gray-900">Volume-Based Reward</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex justify-between items-center text-gray-800">
                        <span>1 - 5Kg of Food</span>
                        <span className="flex items-center gap-1">
                          1 <Coins className="h-4 w-4 text-yellow-500" />
                        </span>
                      </li>
                      <li className="flex justify-between items-center text-gray-800">
                        <span>6 - 10Kg of Food</span>
                        <span className="flex items-center gap-1">
                          2 <Coins className="h-4 w-4 text-yellow-500" />
                        </span>
                      </li>
                      <li className="flex justify-between items-center text-gray-800">
                        <span>11 - 20Kg of Food</span>
                        <span className="flex items-center gap-1">
                          3 <Coins className="h-4 w-4 text-yellow-500" />
                        </span>
                      </li>
                      <li className="flex justify-between items-center text-gray-800">
                        <span>21+Kg of Food</span>
                        <span className="flex items-center gap-1">
                          4 <Coins className="h-4 w-4 text-yellow-500" />
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Frequency of Donation */}
                <Card className="bg-white border border-gray-200 hover:border-indigo-300 transition-all shadow-sm">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <CardTitle className="text-gray-900">Frequency of Donation</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex justify-between items-center text-gray-800">
                        <span>Monthly Donation</span>
                        <span className="flex items-center gap-1">
                          5 <Coins className="h-4 w-4 text-yellow-500" />
                        </span>
                      </li>
                      <li className="flex justify-between items-center text-gray-800">
                        <span>Weekly Donation</span>
                        <span className="flex items-center gap-1">
                          10 <Coins className="h-4 w-4 text-yellow-500" />
                        </span>
                      </li>
                      <li className="flex justify-between items-center text-gray-800">
                        <span>Daily Donation</span>
                        <span className="flex items-center gap-1">
                          15 <Coins className="h-4 w-4 text-yellow-500" />
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Active Participation */}
                <Card className="bg-white border border-gray-200 hover:border-indigo-300 transition-all shadow-sm">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <HeartHandshake className="h-5 w-5 text-green-500" />
                      <CardTitle className="text-gray-900">Active Participation</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex justify-between items-center text-gray-800">
                        <span>1 - 5 hours</span>
                        <span className="flex items-center gap-1">
                          2 <Coins className="h-4 w-4 text-yellow-500" />
                        </span>
                      </li>
                      <li className="flex justify-between items-center text-gray-800">
                        <span>6 - 10 hours</span>
                        <span className="flex items-center gap-1">
                          5 <Coins className="h-4 w-4 text-yellow-500" />
                        </span>
                      </li>
                      <li className="flex justify-between items-center text-gray-800">
                        <span>11+ hours</span>
                        <span className="flex items-center gap-1">
                          8 <Coins className="h-4 w-4 text-yellow-500" />
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}

export default Page