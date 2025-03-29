"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { format, parseISO } from "date-fns";
import { toast } from "../../../../components/ui/use-toast";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../../../components/ui/card";
import { RadioGroup, RadioGroupItem } from "../../../../components/ui/radio-group";
import { Label } from "../../../../components/ui/label";
import { UploadDropzone } from "../../../utils/uploadthing";
import Image from "next/image";
import { Skeleton } from "../../../../components/ui/skeleton";
import { CalendarIcon, InfoIcon } from "lucide-react";

export default function DonationEdit() {
  const [formData, setFormData] = useState({
    donationName: "",
    category: "veg",
    quantity: 1,
    preparedTime: "",
    expiryDateTime: "",
    address: "",
    specialNote: "",
    type: "solid",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchDonationDetail = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/api/donations/${id}`);
        if (data.success) {
          const donation = data.donation;
          setFormData({
            donationName: donation.donationName || "",
            category: donation.category || "veg",
            quantity: donation.quantity || 1,
            preparedTime: formatDateTime(donation.preparedTime),
            expiryDateTime: formatDateTime(donation.expiryDateTime),
            address: donation.address || "",
            specialNote: donation.specialNote || "",
            type: donation.type || "solid",
            image: donation.image || "",
          });
        } else {
          throw new Error(data.message || "Failed to fetch donation");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error.message || "Failed to load donation details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonationDetail();
  }, [id]);

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "";
    try {
      const date = parseISO(dateTimeString);
      return format(date, "yyyy-MM-dd'T'HH:mm");
    } catch {
      return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUploadComplete = (res) => {
    if (res && res.length > 0) {
      setFormData(prev => ({ ...prev, image: res[0].url }));
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.image) {
      toast({
        title: "Image Required",
        description: "Please upload an image of the donation",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.put(`/api/donations/${id}`, formData);
      
      if (response.data.success) {
        toast({
          title: "Success",
          description: "Donation updated successfully",
        });
        router.push(`/donations/${id}`);
      } else {
        throw new Error(response.data.message || "Failed to update donation");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to update donation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-3xl py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Loading Donation...</CardTitle>
            <CardDescription>Please wait while we load the donation details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit Donation</CardTitle>
          <CardDescription>
            Update the details of your food donation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="donationName">Donation Name</Label>
              <Input
                id="donationName"
                name="donationName"
                value={formData.donationName}
                onChange={handleChange}
                required
                placeholder="Name your donation"
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <RadioGroup
                value={formData.category}
                onValueChange={(val) => setFormData({...formData, category: val})}
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
              <Label htmlFor="quantity">Quantity</Label>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Pickup Address</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Where can the donation be picked up?"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialNote">Special Notes</Label>
              <Textarea
                id="specialNote"
                name="specialNote"
                value={formData.specialNote}
                onChange={handleChange}
                placeholder="Any special instructions?"
              />
            </div>

            <div className="space-y-2">
              <Label>Food Type</Label>
              <RadioGroup
                value={formData.type}
                onValueChange={(val) => setFormData({...formData, type: val})}
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
              <Label>Food Image</Label>
              {formData.image ? (
                <div className="flex flex-col items-start gap-4">
                  <div className="relative w-full max-w-xs aspect-square">
                    <Image
                      src={formData.image}
                      alt="Donation preview"
                      className="rounded-md object-cover"
                      fill
                    />
                  </div>
                  <Button
                    onClick={() => setFormData({...formData, image: ""})}
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
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Donation"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}