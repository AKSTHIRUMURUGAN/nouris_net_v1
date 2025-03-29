"use client";
import { useState, useEffect } from "react";
import { loadRazorpay } from "../../lib/razorpay";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { Badge } from "../../components/ui/badge";
import { HeartHandshake, Landmark, Globe, ArrowRight, Check, Coins } from "lucide-react";

export default function InvestPage() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {

    setIsClient(true);
  }, []);

  const donationTiers = [
    { amount: 500, coins: 50, badge: "Supporter" },
    { amount: 1000, coins: 120, badge: "Patron" },
    { amount: 2500, coins: 300, badge: "Benefactor" },
    { amount: 5000, coins: 650, badge: "Champion" },
  ];

  const impactStats = [
    { value: "10,000+", label: "Meals Provided" },
    { value: "5,000+", label: "Families Helped" },
    { value: "50+", label: "Communities Served" },
    { value: "20+", label: "Tonnes Saved from Waste" },
  ];

  const handleDonation = async (amount) => {
    if (!isClient) return;

    try {
      const Razorpay = await loadRazorpay();
      
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: "INR",
        name: "Nourish Net",
        description: "Donation to fight hunger",
        image: "/logo.png",
        handler: function (response) {
          console.log(response);
          setDonationSuccess(true);
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#4f46e5",
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (donationSuccess) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Thank You for Your Donation!</h1>
          <p className="text-muted-foreground mb-6">
            Your contribution will help us provide meals to those in need.
          </p>
          <div className="bg-primary/10 p-6 rounded-lg mb-6">
            <h3 className="font-bold mb-2">You&apos;ve earned 50 Humanity Coins!</h3>
            <p className="text-sm text-muted-foreground">
              Use them to redeem rewards or support causes.
            </p>
          </div>
          <Button onClick={() => setDonationSuccess(false)} className="w-full">
            Make Another Donation
          </Button>
        </div>
      </div>
    );
  }


  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <HeartHandshake className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-2">Invest in a Hunger-Free Future</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your financial support helps us rescue more food, feed more people, and create sustainable solutions to hunger.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Donation Options */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Make a Donation</CardTitle>
              <CardDescription>Choose an amount to contribute</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {donationTiers.map((tier) => (
                  <Button
                    key={tier.amount}
                    variant={selectedAmount === tier.amount ? "default" : "outline"}
                    className="h-24 flex-col gap-2"
                    onClick={() => setSelectedAmount(tier.amount)}
                  >
                    <span className="text-lg font-bold">₹{tier.amount}</span>
                    <div className="flex items-center gap-1">
                      <Coins className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{tier.coins} coins</span>
                    </div>
                    <Badge variant="secondary" className="mt-1">
                      {tier.badge}
                    </Badge>
                  </Button>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="custom-amount" className="block text-sm font-medium mb-1">
                    Or enter custom amount
                  </label>
                  <div className="flex">
                    <input
                      type="number"
                      id="custom-amount"
                      placeholder="Amount in ₹"
                      className="flex-1 rounded-l-md border border-r-0 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                      onChange={(e) => setSelectedAmount(Number(e.target.value))}
                    />
                    <Button
                      variant="default"
                      className="rounded-l-none"
                      onClick={() => selectedAmount && handleDonation(selectedAmount)}
                    >
                      Donate
                    </Button>
                  </div>
                </div>

                {selectedAmount && (
                  <Button
                    size="lg"
                    className="w-full mt-4"
                    onClick={() => handleDonation(selectedAmount)}
                  >
                    Donate ₹{selectedAmount}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Impact Stats */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Your Impact</CardTitle>
              <CardDescription>See how donations make a difference</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {impactStats.map((stat) => (
                  <div key={stat.label} className="flex items-center">
                    <div className="p-3 rounded-full bg-primary/10 mr-4">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                ))}

                <div className="pt-4">
                  <h3 className="font-medium mb-2">Current Funding Goal</h3>
                  <Progress value={65} className="h-2 mb-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₹250,000 raised</span>
                    <span>Goal: ₹400,000</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="text-primary">
                Learn more about our programs <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Tax Benefits Section */}
      <div className="mt-16">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Landmark className="h-6 w-6 mr-2 text-primary" />
              <CardTitle>Tax Benefits</CardTitle>
            </div>
            <CardDescription>Your donations may be eligible for tax deductions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Under Section 80G</h3>
                <p className="text-muted-foreground">
                  Donations to Nourish Net are eligible for 50% tax exemption under Section 80G of the Income Tax Act.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">How to Claim</h3>
                <p className="text-muted-foreground">
                  You will receive a receipt for your donation which can be used when filing your income tax returns.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}