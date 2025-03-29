"use client"
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { CalendarIcon, MapPinIcon, InfoIcon, PackageIcon, ScaleIcon } from "lucide-react";
import { toast } from "../../../components/ui/use-toast";
import Link from "next/link";

const statusVariant = {
  pending: "secondary",
  approved: "default",
  rejected: "destructive",
  fulfilled: "success"
};

export default function RequestDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await fetch(`/api/requests/${id}`);
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.message || "Failed to fetch request");
        }
        
        setRequest(data.request);
      } catch (error) {
        console.error("Error fetching request:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to fetch request details",
          variant: "destructive",
        });
        router.push("/requester/myrequest");
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [id, router]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/requests/${id}`, {
        method: "DELETE"
      });
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to delete request");
      }

      toast({
        title: "Success",
        description: "Request deleted successfully",
      });
      router.push("/requester/myrequest");
    } catch (error) {
      console.error("Error deleting request:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete request",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-muted-foreground">Request not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Request Details</h1>
          <p className="text-muted-foreground">View and manage your food request</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => router.push("/requester/myrequest")}
          >
            Back to My Requests
          </Button>
          <Button 
            variant="default"
            onClick={() => router.push(`/requester/edit/${id}`)}
          >
            Edit Request
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                <PackageIcon className="h-6 w-6" />
                {request.productName}
              </CardTitle>
              <CardDescription className="mt-2">
                Request ID: {request._id}
              </CardDescription>
            </div>
            <Badge variant={statusVariant[request.status]}>
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <ScaleIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Quantity</p>
                  <p className="font-medium">{request.quantity} kg</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Last Date Needed</p>
                  <p className="font-medium">
                    {new Date(request.lastDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPinIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Delivery Address</p>
                  <p className="font-medium">{request.address}</p>
                </div>
              </div>

              {request.organizationType && (
                <div className="flex items-center gap-3">
                  <InfoIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Organization Type</p>
                    <p className="font-medium capitalize">{request.organizationType}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {request.specialNote && (
            <div className="border rounded-lg p-4">
              <h3 className="font-medium flex items-center gap-2 mb-2">
                <InfoIcon className="h-4 w-4" />
                Special Notes
              </h3>
              <p className="text-muted-foreground">{request.specialNote}</p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-end gap-4 border-t pt-6">
          <Button 
            variant="destructive" 
            onClick={handleDelete}
            className="mr-auto"
          >
            Delete Request
          </Button>
          <Button 
            variant="outline" 
            onClick={() => router.push("/requester/myrequest")}
          >
            Back to List
          </Button>
          <Button 
            onClick={() => router.push(`/requester/edit/${id}`)}
          >
            Edit Request
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}