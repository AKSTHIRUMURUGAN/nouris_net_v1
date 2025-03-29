"use client"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../../components/ui/card"
import { Textarea } from "../../../components/ui/textarea"
import { Label } from "../../../components/ui/label"
import { CalendarIcon, MapPinIcon, TruckIcon, InfoIcon, PackageIcon, GaugeIcon, SearchIcon } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group"
import axios from "axios"
import { toast } from "../../../components/ui/use-toast"
import Link from "next/link"

export default function CreateRidePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [donation, setDonation] = useState(null)
  const [request, setRequest] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [formData, setFormData] = useState({
    donationId: "",
    requestId: "",
    pickupLocation: "",
    dropoffLocation: "",
    distanceTraveled: "",
    startTime: new Date().toISOString().slice(0, 16),
    endTime: "",
    rideType: "delivery",
    notes: "",
    product: ""
  })

    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get("/api/users/myprofile")
          if (response.data.success) {
            setUserProfile(response.data.user)
            setFormData(prev => ({
              ...prev,
              address: response.data.user.address || "",
            }))
          }
        } catch (error) {
          console.error("Error fetching user profile:", error)
          toast({
            title: "Error",
            description: "Failed to fetch user profile",
            variant: "destructive",
          })
        }
      }
      fetchUserProfile()
    }, [])
  const fetchDonationDetails = async (id) => {
    try {
      const response = await axios.get(`/api/donations/${id}`)
      if (response.data.success) {
        setDonation(response.data.donation)
        setFormData(prev => ({
          ...prev,
          user:userProfile._id,
          pickupLocation: response.data.donation.address,
          product: response.data.donation.donationName
        }))
      } else {
        throw new Error("Donation not found")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch donation details",
        variant: "destructive",
      })
      setDonation(null)
      setFormData(prev => ({
        ...prev,
        pickupLocation: "",
        product: prev.product.startsWith("Donation:") ? "" : prev.product
      }))
    }
  }

  const fetchRequestDetails = async (id) => {
    try {
      const response = await axios.get(`/api/requests/${id}`)
      if (response.data.success) {
        setRequest(response.data.request)
        setFormData(prev => ({
          ...prev,
          dropoffLocation: response.data.request.address,
          product: `Request: ${response.data.request.productName}`
        }))
      } else {
        throw new Error("Request not found")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch request details",
        variant: "destructive",
      })
      setRequest(null)
      setFormData(prev => ({
        ...prev,
        dropoffLocation: "",
        product: prev.product.startsWith("Request:") ? "" : prev.product
      }))
    }
  }

  useEffect(() => {
    if (formData.donationId) {
      fetchDonationDetails(formData.donationId)
    } else {
      setDonation(null)
      setFormData(prev => ({
        ...prev,
        pickupLocation: "",
        product: prev.product.startsWith("Donation:") ? "" : prev.product
      }))
    }
  }, [formData.donationId])

  useEffect(() => {
    if (formData.requestId) {
      fetchRequestDetails(formData.requestId)
    } else {
      setRequest(null)
      setFormData(prev => ({
        ...prev,
        dropoffLocation: "",
        product: prev.product.startsWith("Request:") ? "" : prev.product
      }))
    }
  }, [formData.requestId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.donationId) {
      toast({
        title: "Error",
        description: "Donation ID is required",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await axios.post("/api/rides/new", {
        ...formData,
        donation: formData.donationId,
        request: formData.requestId || null,
        distanceTraveled: parseFloat(formData.distanceTraveled)
      })
      
      if (response.data.success) {
        toast({
          title: "Success",
          description: "Ride created successfully!",
        })
        
        // Update donation status to "booked"
        await axios.put(`/api/donations/${formData.donationId}`, {
          status: "booked",
          rider: response.data.ride._id
        })
        
        if (formData.requestId) {
          // Update request status to "fulfilled" if it exists
          await axios.put(`/api/requests/${formData.requestId}`, {
            status: "fulfilled"
          })
        }
        
        router.push(`/rider/${response.data.ride._id}`)
      } else {
        throw new Error(response.data.message || "Failed to create ride")
      }
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to create ride",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const calculateDistance = () => {
    // This would be replaced with actual distance calculation using a mapping API
    if (formData.pickupLocation && formData.dropoffLocation) {
      // Mock distance calculation
      const mockDistance = (Math.random() * 20 + 5).toFixed(2)
      setFormData(prev => ({ ...prev, distanceTraveled: mockDistance }))
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Ride</h1>
          <p className="text-muted-foreground">Set up a food transportation ride</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => router.push("/rider")}
        >
          Back to Rides
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TruckIcon className="h-6 w-6" />
            Ride Information
          </CardTitle>
          <CardDescription>
            Enter donation and request details to create a new ride
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="donationId">Donation ID *</Label>
                <div className="relative">
                  <Input
                    id="donationId"
                    name="donationId"
                    value={formData.donationId}
                    onChange={handleChange}
                    required
                    placeholder="Enter donation ID"
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    className="absolute right-1 top-1 h-8 w-8"
                    onClick={() => formData.donationId && fetchDonationDetails(formData.donationId)}
                  >
                    <SearchIcon className="h-4 w-4" />
                  </Button>
                </div>
                {donation && (
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <PackageIcon className="h-4 w-4" />
                    Found: {donation.donationName} ({donation.status})
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="requestId">Request ID (optional)</Label>
                <div className="relative">
                  <Input
                    id="requestId"
                    name="requestId"
                    value={formData.requestId}
                    onChange={handleChange}
                    placeholder="Enter request ID"
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon"
                    className="absolute right-1 top-1 h-8 w-8"
                    onClick={() => formData.requestId && fetchRequestDetails(formData.requestId)}
                  >
                    <SearchIcon className="h-4 w-4" />
                  </Button>
                </div>
                {request && (
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <PackageIcon className="h-4 w-4" />
                    Found: {request.productName} ({request.status})
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="product">Product</Label>
              <Input
                id="product"
                name="product"
                value={formData.product}
                readOnly
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <Label htmlFor="endTime">Estimated End Time</Label>
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
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any special instructions or notes about this ride?"
              />
            </div>

            <CardFooter className="flex justify-end gap-4 px-0 pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.push("/rider")}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || !formData.donationId}>
                {isSubmitting ? "Creating..." : "Create Ride"}
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