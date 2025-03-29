"use client"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "../../../components/ui/card"
import { Textarea } from "../../../components/ui/textarea"
import { Label } from "../../../components/ui/label"
import { CalendarIcon, InfoCircledIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { toast } from "../../../components/ui/use-toast"
import Link from "next/link"

export default function RequesterForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userProfile, setUserProfile] = useState(null)
  const [formData, setFormData] = useState({
    productName: "",
    quantity: 1,
    lastDate: "",
    address: "",
    specialNote: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!userProfile) {
      toast({
        title: "Profile Required",
        description: "Please complete your profile before creating a request",
        variant: "destructive",
      })
      router.push("/")
      return
    }
    
    setIsSubmitting(true)
    try {
      const response = await axios.post("/api/requests/new", {
        ...formData,
        needer: userProfile._id,
      })
      
      if (response.data.success) {
        toast({
          title: "Success",
          description: "Request created successfully!",
        })
        router.push("/requester/myrequest")
      } else {
        throw new Error(response.data.message || "Failed to create request")
      }
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to create request",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <div className="space-y-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Create Food Request</h1>
        <p className="text-muted-foreground">Request the food items you need</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Request Details</CardTitle>
          <CardDescription>Provide details about the food you need</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name</Label>
              <Input 
                id="productName"
                name="productName" 
                value={formData.productName} 
                onChange={handleChange} 
                required 
                placeholder="What food item do you need?"
              />
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
              <Label htmlFor="lastDate">Last Date Needed</Label>
              <div className="relative">
                <Input 
                  id="lastDate"
                  name="lastDate" 
                  type="date" 
                  value={formData.lastDate} 
                  onChange={handleChange} 
                  required 
                />
                <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address</Label>
              <Textarea 
                id="address"
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                required 
                placeholder="Where should the food be delivered?"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialNote">Special Notes</Label>
              <Textarea 
                id="specialNote"
                name="specialNote" 
                value={formData.specialNote} 
                onChange={handleChange} 
                placeholder="Any dietary restrictions or special requirements?"
              />
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
                {isSubmitting ? "Submitting..." : "Submit Request"}
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
          Contact Support <InfoCircledIcon className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}