"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "../../../components/ui/card"
import { Textarea } from "../../../components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group"
import { Label } from "../../../components/ui/label"
import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons"
import { UploadDropzone } from "../../utils/uploadthing"
import axios from "axios"
import Image from "next/image"
import { toast } from "../../../components/ui/use-toast"

export default function CreateDonationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const requestId = searchParams.get("requestId")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userProfile, setUserProfile] = useState(null)
  const [formData, setFormData] = useState({
    donationName: "",
    category: "veg",
    quantity: 1,
    preparedTime: new Date().toISOString().slice(0, 16),
    expiryDateTime: "",
    address: "",
    specialNote: "",
    type: "solid",
    image: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleUploadComplete = (res) => {
    if (res && res.length > 0) {
      setFormData(prev => ({ ...prev, image: res[0].url }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!userProfile) {
      toast({
        title: "Profile Required",
        description: "Please complete your profile before creating a donation",
        variant: "destructive",
      })
      router.push("/")
      return
    }
    if (!formData.image) {
      toast({
        title: "Image Required",
        description: "Please upload an image of the food",
        variant: "destructive",
      })
      return
    }
    
    setIsSubmitting(true)
    try {
      const response = await axios.post("/api/donations/new", {
        ...formData,
        donor: userProfile._id,
        requestId: requestId || null,
      })
      
      if (response.data.success) {
        toast({
          title: "Success",
          description: "Donation created successfully!",
        })
        router.push("/donor/mydonation")
      } else {
        throw new Error(response.data.message || "Failed to create donation")
      }
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to create donation",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <div className="space-y-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Create Food Donation</h1>
        <p className="text-muted-foreground">Share your excess food with those in need</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Donation Details</CardTitle>
          <CardDescription>Provide food donation details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="donationName">Food Name</Label>
              <Input 
                id="donationName"
                name="donationName" 
                value={formData.donationName} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <RadioGroup 
                value={formData.category} 
                onValueChange={(val) => setFormData({ ...formData, category: val })}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="veg" id="veg" />
                  <Label htmlFor="veg">Vegetarian</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nonveg" id="nonveg" />
                  <Label htmlFor="nonveg">Non-Vegetarian</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="both" />
                  <Label htmlFor="both">Mixed</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity (kg)</Label>
              <Input 
                id="quantity"
                name="quantity" 
                type="number" 
                min="1" 
                value={formData.quantity} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label>Food Type</Label>
              <RadioGroup 
                value={formData.type} 
                onValueChange={(val) => setFormData({ ...formData, type: val })}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="solid" id="solid" />
                  <Label htmlFor="solid">Solid</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="liquid" id="liquid" />
                  <Label htmlFor="liquid">Liquid</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preparedTime">Prepared Time</Label>
              <div className="relative">
                <Input 
                  id="preparedTime"
                  name="preparedTime" 
                  type="datetime-local" 
                  value={formData.preparedTime} 
                  onChange={handleChange} 
                  required 
                />
                <ClockIcon className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiryDateTime">Expiry Date & Time</Label>
              <div className="relative">
                <Input 
                  id="expiryDateTime"
                  name="expiryDateTime" 
                  type="datetime-local" 
                  value={formData.expiryDateTime} 
                  onChange={handleChange} 
                  required 
                />
                <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Pickup Address</Label>
              <Textarea 
                id="address"
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialNote">Special Notes</Label>
              <Textarea 
                id="specialNote"
                name="specialNote" 
                value={formData.specialNote} 
                onChange={handleChange} 
              />
            </div>

            <div className="space-y-2">
              <Label>Food Image</Label>
              {formData.image ? (
                <div className="flex flex-col items-start gap-4">
                  <div className="relative w-full max-w-xs aspect-square">
                    <Image 
                      src={formData.image} 
                      alt="Food preview" 
                      className="rounded-md object-cover" 
                      fill
                    />
                  </div>
                  <Button 
                    onClick={() => setFormData({ ...formData, image: "" })} 
                    variant="outline"
                    type="button"
                  >
                    Change Image
                  </Button>
                </div>
              ) : (
                <UploadDropzone 
                  endpoint="imageUploader" 
                  onClientUploadComplete={handleUploadComplete}
                  appearance={{
                    button: "bg-primary text-primary-foreground hover:bg-primary/90",
                    label: "text-primary hover:text-primary/90",
                    allowedContent: "text-muted-foreground",
                  }}
                />
              )}
            </div>

            <CardFooter className="flex justify-end gap-4 px-0 pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.back()} 
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Donation"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}