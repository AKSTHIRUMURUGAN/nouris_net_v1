"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Button } from "../../components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Coins, Clock, Scale, HeartHandshake, ArrowRight } from "lucide-react";
import dynamic from 'next/dynamic';

// Dynamically import Lottie with SSR disabled and loading fallback
const Lottie = dynamic(
  () => import('lottie-react').then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => <div className="w-full h-[400px] bg-gray-100 rounded-lg animate-pulse" />
  }
);

const Page = () => {
  const router = useRouter();
  const [animationData, setAnimationData] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Dynamically import animation data to ensure it's only loaded client-side
    import("../assets/Animation - 1723325524933.json").then((data) => {
      setAnimationData(data.default);
    });
  }, []);

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
          
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div className="w-full md:w-1/2">
              {isClient && animationData ? (
                <Lottie 
                  animationData={animationData}
                  loop={true}
                  style={{ width: '100%', height: '400px' }}
                />
              ) : (
                <div className="w-full h-[400px] bg-gray-100 rounded-lg animate-pulse" />
              )}
            </div>
            
            <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-8">
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
            </div>
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
  );
};

export default Page;