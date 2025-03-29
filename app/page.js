"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Card, CardHeader, CardContent, CardFooter } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";

import HomeHero from "./components/home-hero";
import StatisticsDashboard from "./components/statistics-dashboard";
import UseCasesDashboard from "./components/use-cases-dashboard";
import FutureWorksDashboard from "./components/future-works-dashboard";
import ImpactStats from "./components/impact-stats";
import HumanityCoinsSection from "./components/humanity-coins-section";
import CTASection from "./components/cta-section";

export default function HomePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [userExists, setUserExists] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    aadhar: "",
    organisation: "Individual",
    address: "",
  });

  useEffect(() => {
    const checkUserExists = async () => {
      if (isLoaded && isSignedIn && user) {
        try {
          const checkResponse = await axios.get(`/api/users/check?clerkId=${user.id}`);
          const data = checkResponse.data;

          if (data.exists) {
            setUserExists(true);
            setFormData((prev) => ({
              ...prev,
              name: data.user.name || user.fullName || "",
            }));
          } else {
            setUserExists(false);
            setFormData((prev) => ({
              ...prev,
              name: user.fullName || "",
            }));
          }
        } catch (error) {
          console.error("Error checking user:", error);
        }
      }
    };

    checkUserExists();
  }, [isLoaded, isSignedIn, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.aadhar || !formData.address) {
      setError("Please fill out all required fields.");
      return;
    }

    if (!/^\d{12}$/.test(formData.aadhar)) {
      setError("Aadhar number must be a 12-digit numeric value.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const userData = {
        name: formData.name,
        email: user.primaryEmailAddress?.emailAddress || "",
        phoneNo: user.primaryPhoneNumber?.phoneNumber || "",
        aadhar: formData.aadhar,
        organisation: formData.organisation,
        address: formData.address,
        clerkId: user.id,
      };

      const createResponse = await axios.post("/api/users/new", userData);

      if (createResponse.data.success) {
        setUserExists(true);
      } else {
        setError(createResponse.data.message || "Failed to create user.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setError("An error occurred while creating your account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (isSignedIn && !userExists) {
    return (
      <div className="flex justify-center items-center h-screen text-black dark:text-white">
        <Card className="w-full max-w-md shadow-lg p-6 rounded-xl">
          <CardHeader className="text-center">
            <h2 className="text-xl font-bold">Create Your Account</h2>
            <p className="text-sm text-gray-500">
              Join us in making a difference by donating surplus food.
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <Label>Aadhar Number</Label>
                <Input
                  required
                  value={formData.aadhar}
                  onChange={(e) => setFormData({ ...formData, aadhar: e.target.value })}
                  placeholder="Enter your 12-digit Aadhar number"
                />
              </div>
              <div className="space-y-2">
                <Label>Organisation</Label>
                <Input
                  value={formData.organisation}
                  onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                  placeholder="Enter your organisation (if applicable)"
                />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Textarea
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter your address"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-sm text-gray-500">
            <p>Thank you for your generosity and support!</p>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <>
      <HomeHero />
      <StatisticsDashboard />
      <UseCasesDashboard />
      <HumanityCoinsSection />
      <ImpactStats />
      <FutureWorksDashboard />
      <CTASection />
    </>
  );
}
