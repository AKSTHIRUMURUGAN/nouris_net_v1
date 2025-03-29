"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Medal, Gift, Coins, HandHeart, Bike, UserCircle, TrendingUp, ArrowRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";

export default function HumanityCoinPage() {
  const leaderboard = [
    { name: "Alex Johnson", coins: 245, avatar: "/avatars/1.jpg" },
    { name: "Sarah Williams", coins: 198, avatar: "/avatars/2.jpg" },
    { name: "Michael Chen", coins: 176, avatar: "/avatars/3.jpg" },
    { name: "Priya Patel", coins: 165, avatar: "/avatars/4.jpg" },
    { name: "David Kim", coins: 142, avatar: "/avatars/5.jpg" },
  ];

  const rewards = [
    { name: "Eco-friendly Tote Bag", cost: 50, icon: <Gift className="h-6 w-6" /> },
    { name: "Organic Coffee Set", cost: 75, icon: <Gift className="h-6 w-6" /> },
    { name: "Sustainable Water Bottle", cost: 100, icon: <Gift className="h-6 w-6" /> },
    { name: "Tree Planting Certificate", cost: 150, icon: <Gift className="h-6 w-6" /> },
  ];

  const quotes = [
    "No act of kindness, no matter how small, is ever wasted. - Aesop",
    "We make a living by what we get, but we make a life by what we give. - Winston Churchill",
    "The simplest acts of kindness are by far more powerful than a thousand heads bowing in prayer. - Mahatma Gandhi",
    "You have not lived today until you have done something for someone who can never repay you. - John Bunyan",
  ];

  const userStats = {
    coins: 128,
    level: 3,
    progress: 65,
    donations: 12,
    deliveries: 8,
    requests: 5,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <Coins className="h-12 w-12 text-yellow-500" />
        </div>
        <h1 className="text-4xl font-bold mb-2">Humanity Coin</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Earn coins by contributing to our community. Redeem them for rewards or donate to causes you care about.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Stats Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Your Contribution</CardTitle>
            <CardDescription>Track your impact and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Coins className="h-8 w-8 text-yellow-500 mr-2" />
                <div>
                  <p className="text-sm text-muted-foreground">Your Coins</p>
                  <p className="text-2xl font-bold">{userStats.coins}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Level {userStats.level}</p>
                <Progress value={userStats.progress} className="h-2 w-24" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <HandHeart className="h-6 w-6 mx-auto text-green-500" />
                <p className="font-medium">{userStats.donations}</p>
                <p className="text-sm text-muted-foreground">Donations</p>
              </div>
              <div>
                <Bike className="h-6 w-6 mx-auto text-blue-500" />
                <p className="font-medium">{userStats.deliveries}</p>
                <p className="text-sm text-muted-foreground">Deliveries</p>
              </div>
              <div>
                <UserCircle className="h-6 w-6 mx-auto text-purple-500" />
                <p className="font-medium">{userStats.requests}</p>
                <p className="text-sm text-muted-foreground">Requests</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="outline" className="w-full">
              View Full History
            </Button>
          </CardFooter>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Leaderboard */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Community Leaderboard</CardTitle>
                <Medal className="h-6 w-6 text-yellow-500" />
              </div>
              <CardDescription>Top contributors this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((user, index) => (
                  <div key={user.name} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-muted-foreground w-6">{index + 1}</span>
                      <Avatar className="h-8 w-8 mx-2">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Coins className="h-4 w-4 text-yellow-500 mr-1" />
                      <span>{user.coins}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rewards & Quotes */}
          <Tabs defaultValue="rewards">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="rewards">Redeem Rewards</TabsTrigger>
              <TabsTrigger value="motivation">Motivation</TabsTrigger>
            </TabsList>
            <TabsContent value="rewards">
              <Card>
                <CardHeader>
                  <CardTitle>Available Rewards</CardTitle>
                  <CardDescription>Redeem your coins for these exclusive rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rewards.map((reward) => (
                      <div key={reward.name} className="border rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          {reward.icon}
                          <div className="ml-3">
                            <p className="font-medium">{reward.name}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Coins className="h-4 w-4 text-yellow-500 mr-1" />
                              {reward.cost} coins
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Redeem
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="motivation">
              <Card>
                <CardHeader>
                  <CardTitle>Words of Inspiration</CardTitle>
                  <CardDescription>Keep making a difference</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {quotes.map((quote, index) => (
                      <div key={index} className="border-l-4 border-primary pl-4 py-2">
                        <p className="italic">&quot;{quote}&quot;</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Thank You Section */}
      <div className="mt-16 text-center">
        <div className="inline-block px-6 py-4 bg-primary/10 rounded-full">
          <h2 className="text-2xl font-bold mb-2">Thank You for Your Contributions!</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every action you take helps create a better world. Together, we&apos;re making a real difference in fighting hunger
            and reducing waste.
          </p>
        </div>
      </div>
    </div>
  );
}