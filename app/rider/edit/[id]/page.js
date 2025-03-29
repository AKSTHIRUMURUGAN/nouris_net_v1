"use client"
import React, { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Input } from "../../../../components/ui/input"
import { Button } from "../../../../components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../../../components/ui/card"
import { Textarea } from "../../../../components/ui/textarea"
import { Label } from "../../../../components/ui/label"
import { CalendarIcon, MapPinIcon, TruckIcon, InfoIcon, GaugeIcon } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "../../../../components/ui/radio-group"
import { toast } from "../../../../components/ui/use-toast"
import Link from "next/link"
import axios from "axios"
import { Skeleton } from "../../../../components/ui/skeleton"

export default function RideEdit() {
  const router = useRouter()
  const { id } = useParams()
  const [formData, setFormData] = useState({
    donation: "",
    pickupLocation: "",
    dropoffLocation: "",
    distanceTraveled: "",
    startTime: "",
    endTime: "",
    rideType: "delivery",
    product: "",
    notes: ""
  })
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return ""
    const date = new Date(dateTimeString)
    const isoString = date.toISOString()
    return isoString.substring(0, 16) // Format: YYYY-MM-DDTHH:MM
  }

  useEffect(() => {
    const fetchRideDetail = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/api/rides/${id}`)
        if (response.data.success) {
          const ride = response.data.ride
          setFormData({
            donation: ride.donation?._id || ride.donation || "",
            pickupLocation: ride.pickupLocation || "",
            dropoffLocation: ride.dropoffLocation || "",
            distanceTraveled: ride.distanceTraveled || "",
            startTime: formatDateTime(ride.startTime),
            endTime: formatDateTime(ride.endTime),
            rideType: ride.rideType || "delivery",
            product: ride.product || "",
            notes: ride.notes || ""
          })
        } else {
          throw new Error(response.data.message || "Failed to fetch ride details")
        }
      } catch (error) {
        console.error("Error fetching ride details:", error)
        toast({
          title: "Error",
          description: error.message || "Failed to fetch ride details",
          variant: "destructive",
        })
        router.push("/rider")
      } finally {
        setLoading(false)
      }
    }

    fetchRideDetail()
  }, [id, router])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await axios.put(`/api/rides/${id}`, formData)
      
      if (!response.data.success) {
        throw new Error(response.data.message || "Failed to update ride")
      }

      toast({
        title: "Success",
        description: "Ride updated successfully",
      })
      router.push(`/rider/${id}`)
    } catch (error) {
      console.error("Error updating ride:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to update ride",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const calculateDistance = () => {
    if (formData.pickupLocation && formData.dropoffLocation) {
      // Mock distance calculation - replace with actual API call
      const mockDistance = (Math.random() * 20 + 5).toFixed(2)
      setFormData(prev => ({ ...prev, distanceTraveled: mockDistance }))
    }
  }

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

  return (
    <div className="container mx-auto py-8 px-4 max-w-md">
      <Card>
        <CardHeader className="flex flex-col items-center space-y-2">
          <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
            <TruckIcon className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Edit Ride</CardTitle>
          <CardDescription className="text-center">
            Update ride details below
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="donation">Donation ID *</Label>
              <Input
                id="donation"
                name="donation"
                value={formData.donation}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label htmlFor="pickupLocation">Pickup Location *</Label>
                <div className="relative">
                  <Textarea
                    id="pickupLocation"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    required
                  />
                  <MapPinIcon className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dropoffLocation">Dropoff Location *</Label>
                <div className="relative">
                  <Textarea
                    id="dropoffLocation"
                    name="dropoffLocation"
                    value={formData.dropoffLocation}
                    onChange={handleChange}
                    required
                  />
                  <MapPinIcon className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="distanceTraveled">Distance (km) *</Label>
              <div className="relative flex gap-2">
                <Input
                  id="distanceTraveled"
                  name="distanceTraveled"
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.distanceTraveled}
                  onChange={handleChange}
                  required
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={calculateDistance}
                  disabled={!formData.pickupLocation || !formData.dropoffLocation}
                >
                  <GaugeIcon className="h-4 w-4 mr-2" />
                  Calculate
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Ride Type *</Label>
              <RadioGroup 
                value={formData.rideType} 
                onValueChange={(val) => setFormData({...formData, rideType: val})}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label htmlFor="delivery">Delivery</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup">Pickup</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time *</Label>
                <div className="relative">
                  <Input
                    id="startTime"
                    name="startTime"
                    type="datetime-local"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                  />
                  <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <div className="relative">
                  <Input
                    id="endTime"
                    name="endTime"
                    type="datetime-local"
                    value={formData.endTime}
                    onChange={handleChange}
                  />
                  <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="product">Product Description *</Label>
              <Input
                id="product"
                name="product"
                value={formData.product}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any special instructions or notes about this ride?"
              />
            </div>

            <CardFooter className="flex justify-between px-0 pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.push(`/rider/${id}`)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Ride"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        Need help?{" "}
        <Link 
          href="/help" 
          className="text-primary hover:underline inline-flex items-center"
        >
          Contact Support <InfoIcon className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}