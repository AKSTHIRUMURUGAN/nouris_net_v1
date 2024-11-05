"use client";

import {
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Textarea,
} from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function UserCreation() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [aadhar, setAadhar] = useState("");
  const [organisation, setOrganisation] = useState("individual");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [userExists, setUserExists] = useState(false);
  // Header Component
const Header = () => (
  <div className="bg-gray-800 text-white p-8 flex flex-col items-center space-y-8">
    <div className="text-center space-y-4 max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-transparent bg-clip-text">
        Make a Difference: Donate Food, Change Lives
      </h1>
      <p className="text-sm md:text-base leading-relaxed">
        Your generous food donations help provide essential nourishment to those
        in need. Join us in our mission to end hunger and support our community.
        Every contribution counts!
      </p>
    </div>
    <div className="w-20 h-20">
      <img
        src="Nourish Net.png"
        alt="AI"
        className="w-full max-w-xs md:max-w-md rounded-lg shadow-md"
      />
    </div>
    <div className="w-15 h-10 flex flex-col items-center space-y-4 max-w-4xl mx-auto">
      <p className="text-center text-sm md:text-base font-semibold">
        Over 1,600 meals have been donated in the past 24 hours
      </p>
    </div>
  </div>
);

// StatisticsDashboard Component
const StatisticsDashboard = () => (
  <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg mb-8">
    <div className="text-center mb-6">
      <h1 className="text-3xl font-bold text-orange-600">STATISTICS</h1>
      <p className="text-lg text-gray-700">Real-Time Data</p>
    </div>
    <div className="flex flex-col md:flex-row items-center md:space-x-6">
      <img
        src="s_d.png"
        alt="Economic Loss by Source and Interventions"
        className="w-full md:w-1/2 rounded-lg shadow-md mb-6 md:mb-0"
      />
      <div className="text-left space-y-4">
        <p>
          <strong>Urban Food Waste:</strong> One-third of global food production
          is lost or wasted annually (FAO).
        </p>
        <p>
          <strong>Hunger-Related Deaths:</strong> Hunger and malnutrition cause
          3.1 million child deaths annually (WHO), worsened by urban poverty and
          social disparities.
        </p>
      </div>
    </div>
  </div>
);

// UseCasesDashboard Component
const UseCasesDashboard = () => (
  <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg mb-8">
    <h1 className="text-3xl font-bold text-orange-600 text-center mb-6">
      USE CASES
    </h1>
    <div className="flex flex-wrap justify-around">
      <div className="use-case-card bg-white border border-gray-200 rounded-lg shadow-lg p-4 mb-4 w-full md:w-1/3 hover:scale-105 transition-transform">
        <img
          src="b.jpeg"
          alt="Household Food Donation"
          className="w-full rounded-lg mb-4"
        />
        <h2 className="text-xl font-semibold text-orange-600 mb-2">
          Household Food Donation
        </h2>
        <p>
          Users can list surplus meals for donation, with the app connecting
          them to nearby volunteers or NGOs for pick-up and delivery.
        </p>
      </div>
      <div className="use-case-card bg-white border border-gray-200 rounded-lg shadow-lg p-4 mb-4 w-full md:w-1/3 hover:scale-105 transition-transform">
        <img
          src="a.jpeg"
          alt="Restaurant Food Surplus & Community Events"
          className="w-full rounded-lg mb-4"
        />
        <h2 className="text-xl font-semibold text-orange-600 mb-2">
          Restaurant Food Surplus & Community Events
        </h2>
        <p>
          Restaurants and event organizers can schedule pick-ups for excess
          food, which is then collected and distributed by volunteers or NGOs.
        </p>
      </div>
      <div className="use-case-card bg-white border border-gray-200 rounded-lg shadow-lg p-4 mb-4 w-full md:w-1/3 hover:scale-105 transition-transform">
        <img
          src="c.jpeg"
          alt="User Feedback & Improvement"
          className="w-full rounded-lg mb-4"
        />
        <h2 className="text-xl font-semibold text-orange-600 mb-2">
          User Feedback & Improvement
        </h2>
        <p>
          Users can submit feedback about the donation process, which helps
          improve the app's features and functionality.
        </p>
      </div>
    </div>
  </div>
);

// FutureWorksDashboard Component
const FutureWorksDashboard = () => (
  <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg mb-8">
    <h1 className="text-3xl font-bold text-orange-600 text-center mb-6">
      FUTURE WORKS
    </h1>
    <div className="flex flex-wrap justify-around">
      <div className="future-work-card bg-white border border-gray-200 rounded-lg shadow-lg p-4 mb-4 w-full md:w-1/3 hover:scale-105 transition-transform">
        <img
          src="a3.jpeg"
          alt="Geographic Expansion"
          className="w-full rounded-lg mb-4"
        />
        <h2 className="text-xl font-semibold text-orange-600 mb-2">
          Geographic Expansion to New Regions and International Markets
        </h2>
      </div>
      <div className="future-work-card bg-white border border-gray-200 rounded-lg shadow-lg p-4 mb-4 w-full md:w-1/3 hover:scale-105 transition-transform">
        <img
          src="a2.jpeg"
          alt="Sustainability Integration"
          className="w-full rounded-lg mb-4"
        />
        <h2 className="text-xl font-semibold text-orange-600 mb-2">
          Integration with Other Sustainability and Eco-Friendly Platforms
        </h2>
      </div>
      <div className="future-work-card bg-white border border-gray-200 rounded-lg shadow-lg p-4 mb-4 w-full md:w-1/3 hover:scale-105 transition-transform">
        <img
          src="a1.jpeg"
          alt="Localization and Multi-Language Support"
          className="w-full rounded-lg mb-4"
        />
        <h2 className="text-xl font-semibold text-orange-600 mb-2">
          Localization and Multi-Language Support for Global Accessibility
        </h2>
      </div>
    </div>
  </div>
);

// Footer Component
const Footer = () => (
  <div className="bg-gray-800 text-white text-center py-6">
    <p>&copy; 2024. All rights reserved.</p>
  </div>
);

  useEffect(() => {
    const checkUserExists = async () => {
      if (isLoaded && isSignedIn && user) {
        try {
          // Check if user already exists in the database
          const checkResponse = await axios.get(
            `/api/users/check?clerkId=${user.id}`
          );

          if (checkResponse.data.exists) {
            console.log("User already exists.");
            setUserExists(true); // Set userExists to true if the user already exists
            setName(checkResponse.data.name || user.fullName);
          } else {
            console.log("User does not exist, showing form for creation.");
            setUserExists(false); // Show form if user does not exist
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
    if (!name || !aadhar || !address) {
      setError("Please fill out all required fields.");
      return;
    }

    try {
      setError(""); // Clear any previous errors

      // Prepare user data from form input
      const userData = {
        name: name || "", // Use name from form or an empty string
        email: user.primaryEmailAddress?.emailAddress || "",
        phoneNo: user.primaryPhoneNumber?.phoneNumber || "", // Handle this if available
        aadhar: aadhar,
        organisation: organisation, // Handle this if available
        address: address, // Handle this if available
        clerkId: user.id,
      };

      // Make a POST request to your API to create a user
      const createResponse = await axios.post(
        "/api/users/new",
        userData
      );

      if (createResponse.data.success) {
        console.log("User created successfully:", createResponse.data.user);
        setUserExists(true); // Set userExists to true after creation
      } else {
        setError(createResponse.data.message || "Failed to create user.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setError("An error occurred while creating your account.");
    }
  };

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>; // Or some other loading state
  }

  if (userExists) {
    return (
      // <div className="flex justify-center align-middle">
      //   <Card className="card">
      //     <CardHeader className="flex gap-3">
      //       <div className="flex flex-col">
      //         <p className="text-md font-bold">Welcome Back!</p>
      //         <p className="text-small text-default-500">
      //           Hi, {name}. Thank you for your continued support!
      //         </p>
      //       </div>
      //     </CardHeader>
      //   </Card>
      // </div>
      <div>
      <Header />
      <StatisticsDashboard />
      <UseCasesDashboard />
      <FutureWorksDashboard />
      <Footer />
    </div>
  
    );
  }




  return (
    <div className="flex justify-center align-middle">
      <Card className="card">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md font-bold">Create Account</p>
            <p className="text-small text-default-500">
              Join us in making a difference by donating surplus food.
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="m-10">
          <form
            className="flex flex-col align-middle gap-3 p-10"
            onSubmit={handleSubmit}
          >
            <Input
              isClearable
              isRequired
              label="Name"
              variant="bordered"
              description="Enter your full name."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="max-w-xs"
            />
            <Input
              isClearable
              isRequired
              label="Aadhar Number"
              variant="bordered"
              description="Enter your Aadhar number."
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
              className="max-w-xs"
            />
            <Input
              isClearable
              label="Organisation"
              variant="bordered"
              description="Enter your organisation name (if applicable)."
              value={organisation}
              onChange={(e) => setOrganisation(e.target.value)}
              className="max-w-xs"
            />
            <Textarea
              label="Address"
              placeholder="Enter your address."
              variant="bordered"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="max-w-xs"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button color="primary" type="submit">
              Create Account
            </Button>
          </form>
        </CardBody>
        <Divider />
        <CardFooter>
          <p>Thank you for your generosity and support!</p>
        </CardFooter>
      </Card>
    </div>
  );
}
