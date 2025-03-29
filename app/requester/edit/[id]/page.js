"use client"
import React, { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "../../../../components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../../../components/ui/card"
import { Input } from "../../../../components/ui/input"
import { Textarea } from "../../../../components/ui/textarea"
import { Label } from "../../../../components/ui/label"
import { CalendarIcon, MapPinIcon, PackageIcon, InfoIcon } from "lucide-react"
import { toast } from "../../../../components/ui/use-toast"
import Link from "next/link"

export default function EditRequestPage() {
  const { id } = useParams()
  const router = useRouter()
  const [formData, setFormData] = useState({
    productName: "",
    quantity: 1,
    lastDate: "",
    address: "",
    specialNote: ""
  })
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await fetch(`/api/requests/${id}`)
        const data = await response.json()
        
        if (!data.success) {
          throw new Error(data.message || "Failed to fetch request")
        }
        
        setFormData({
          productName: data.request.productName,
          quantity: data.request.quantity,
          lastDate: formatDateForInput(data.request.lastDate),
          address: data.request.address,
          specialNote: data.request.specialNote || ""
        })
      } catch (error) {
        console.error("Error fetching request:", error)
        toast({
          title: "Error",
          description: error.message || "Failed to fetch request details",
          variant: "destructive",
        })
        router.push("/requester/myrequest")
      } finally {
        setLoading(false)
      }
    }

    fetchRequest()
  }, [id, router])

  const formatDateForInput = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    const isoString = date.toISOString()
    return isoString.substring(0, 16) // Format: YYYY-MM-DDTHH:MM
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/requests/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      })
      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || "Failed to update request")
      }

      toast({
        title: "Success",
        description: "Request updated successfully",
      })
      router.push(`/requester/${id}`)
    } catch (error) {
      console.error("Error updating request:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to update request",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Request</h1>
          <p className="text-muted-foreground">Update your food request details</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => router.push(`/requester/${id}`)}
        >
          Back to Request
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PackageIcon className="h-6 w-6" />
            Request Information
          </CardTitle>
          <CardDescription>
            Update the details of your request below
          </CardDescription>
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
                  type="datetime-local"
                  value={formData.lastDate}
                  onChange={handleChange}
                  required
                />
                <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address</Label>
              <div className="relative">
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Where should the food be delivered?"
                />
                <MapPinIcon className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
              </div>
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
                onClick={() => router.push(`/requester/${id}`)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Request"}
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