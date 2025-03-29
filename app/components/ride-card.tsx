import { Card, CardHeader, CardBody, CardFooter, Button, Chip } from "@nextui-org/react"
import { FaMapMarkerAlt, FaTruck, FaClock, FaRoute } from "react-icons/fa"
import Link from "next/link"

export default function RideCard({ ride }) {
  const statusColors = {
    available: "success",
    booked: "primary",
    "in transit": "warning",
    delivered: "success",
    cancelled: "danger",
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Not set"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300">
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-blue-100">
            <FaTruck className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold">{ride.product}</h3>
            <p className="text-sm text-gray-500 capitalize">{ride.rideType} Ride</p>
          </div>
        </div>
        <Chip color={statusColors[ride.status] || "default"} size="sm">
          {ride.status}
        </Chip>
      </CardHeader>
      <CardBody className="p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt className="text-sm text-green-600" />
            <span className="text-sm">From: {ride.pickupLocation}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt className="text-sm text-red-600" />
            <span className="text-sm">To: {ride.dropoffLocation}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaRoute className="text-sm" />
            <span className="text-sm">Distance: {ride.distanceTraveled || 0} km</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaClock className="text-sm" />
            <span className="text-sm">Start: {formatDate(ride.startTime)}</span>
          </div>
          {ride.endTime && (
            <div className="flex items-center gap-2 text-gray-600">
              <FaClock className="text-sm" />
              <span className="text-sm">End: {formatDate(ride.endTime)}</span>
            </div>
          )}
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button as={Link} href={`/rider/${ride._id}`} color="primary" variant="flat" fullWidth>
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

