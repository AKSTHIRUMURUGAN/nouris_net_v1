"use client"
import React, { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Skeleton } from "../../../components/ui/skeleton"
import { 
  Truck, 
  Calendar, 
  MapPin, 
  Info, 
  Package, 
  Gauge, 
  Clock, 
  ClipboardList,
  Bike,
  Navigation,
  CircleDollarSign
} from "lucide-react"
import { Badge } from "../../../components/ui/badge"
import Link from "next/link"

const statusVariant = {
  available: "default",
  booked: "warning",
  'in transit': "info",
  delivered: "success",
  cancelled: "destructive"
}

export default function RideDetail() {
  const [ride, setRide] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    const fetchRideDetail = async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`/api/rides/${id}`)
        if (data.success) {
          setRide(data.ride)
        } else {
          throw new Error(data.message || "Failed to fetch ride details")
        }
      } catch (error) {
        console.error("Error fetching ride details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRideDetail()
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-md">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!ride) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-md text-center">
        <Card>
          <CardHeader>
            <CardTitle>No Ride Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The requested ride details could not be loaded.</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/rider">Back to Rides</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-md">
      <Card>
        <CardHeader className="flex flex-col items-center space-y-2">
          <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
            <Truck className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Ride Details</CardTitle>
          <CardDescription className="text-center">
            {ride.rideType === 'delivery' ? 'Food Delivery' : 'Food Pickup'} Information
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Badge variant={statusVariant[ride.status]}>
              {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(ride.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-full">
                <Package className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h4 className="font-medium">Donation</h4>
                <p className="text-sm text-muted-foreground">
                  {ride.donation?.donationName || 'Not specified'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium">Pickup Location</h4>
                <p className="text-sm text-muted-foreground">
                  {ride.pickupLocation}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                <Navigation className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium">Dropoff Location</h4>
                <p className="text-sm text-muted-foreground">
                  {ride.dropoffLocation}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
                <Gauge className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium">Distance</h4>
                <p className="text-sm text-muted-foreground">
                  {ride.distanceTraveled} km
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h4 className="font-medium">Start Time</h4>
                <p className="text-sm text-muted-foreground">
                  {new Date(ride.startTime).toLocaleString()}
                </p>
              </div>
            </div>

            {ride.endTime && (
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 bg-amber-100 rounded-full">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-medium">End Time</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(ride.endTime).toLocaleString()}
                  </p>
                </div>
              </div>
            )}

            {ride.notes && (
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 bg-pink-100 rounded-full">
                  <ClipboardList className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <h4 className="font-medium">Notes</h4>
                  <p className="text-sm text-muted-foreground">
                    {ride.notes}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/rider">
              Back to Rides
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/rider/edit/${id}`}>
              Edit Ride
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}