"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../../components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";
import Image from "next/image";
import {
  CalendarIcon,
  MapPinIcon,
  StickyNoteIcon,
  UtensilsIcon,
  TagIcon,
  ThermometerIcon,
  PackageIcon,
  InfoIcon,
} from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { toast } from "../../../components/ui/use-toast";
import { format } from "date-fns";

export default function DonationDetail() {
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const router=useRouter();

  useEffect(() => {
    const fetchDonationDetail = async () => {
      try {
        const { data } = await axios.get(`/api/donations/${id}`);
        if (data.success) {
          setDonation(data.donation);
        } else {
          toast({
            title: "Error",
            description: "Failed to fetch donation details",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch donation details",
          variant: "destructive",
        });
        console.error("Failed to fetch donation detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonationDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto max-w-3xl py-8 px-4">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <Skeleton className="h-32 w-32 rounded-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!donation) {
    return (
      <div className="container mx-auto max-w-3xl py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Donation Not Found</CardTitle>
            <CardDescription>
              The donation details you&apos;re looking for are not available.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusColors = {
    available: "bg-green-100 text-green-800",
    booked: "bg-blue-100 text-blue-800",
    "in transit": "bg-yellow-100 text-yellow-800",
    delivered: "bg-purple-100 text-purple-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const categoryColors = {
    veg: "bg-emerald-100 text-emerald-800",
    nonveg: "bg-rose-100 text-rose-800",
    both: "bg-amber-100 text-amber-800",
  };

  return (
    <div className="container mx-auto max-w-3xl py-8 px-4">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Donation Details</CardTitle>
          <CardDescription>
            View complete information about this food donation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-48 w-48 rounded-full overflow-hidden border-4 border-primary/10">
              <Image
                src={donation.image}
                alt={donation.donationName}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold">{donation.donationName}</h2>
              <div className="flex justify-center gap-2 mt-2">
                <Badge className={categoryColors[donation.category]}>
                  {donation.category.charAt(0).toUpperCase() + donation.category.slice(1)}
                </Badge>
                <Badge className={statusColors[donation.status]}>
                  {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Prepared</p>
                  <p className="font-medium">
                    {format(new Date(donation.preparedTime), "PPPp")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expiry</p>
                  <p className="font-medium">
                    {format(new Date(donation.expiryDateTime), "PPPp")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <PackageIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quantity</p>
                  <p className="font-medium">
                    {donation.quantity} {donation.type === "liquid" ? "liters" : "kg"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <ThermometerIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">
                    {donation.type.charAt(0).toUpperCase() + donation.type.slice(1)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <MapPinIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pickup Location</p>
                  <p className="font-medium">{donation.address}</p>
                </div>
              </div>

              {donation.specialNote && (
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <StickyNoteIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Special Notes</p>
                    <p className="font-medium">{donation.specialNote}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={()=>router.push("/donor/mydonation")}>Back</Button>
          {donation.status === "available" && (
            <Button>Request Donation</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}