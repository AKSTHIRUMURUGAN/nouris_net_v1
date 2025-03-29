import { Card, CardHeader, CardBody, CardFooter, Button, Chip } from "@nextui-org/react"
import { FaCalendarAlt, FaMapMarkerAlt, FaUtensils } from "react-icons/fa"
import Link from "next/link"

export default function DonationCard({ donation }) {
  const statusColors = {
    available: "success",
    booked: "primary",
    "in transit": "warning",
    delivered: "success",
    cancelled: "danger",
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300">
      <CardHeader className="flex gap-3 p-0">
        <div className="w-full h-48 relative">
          <img
            src={donation.image || "/placeholder.svg?height=200&width=300"}
            alt={donation.donationName}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <Chip color={statusColors[donation.status] || "default"} size="sm">
              {donation.status}
            </Chip>
          </div>
        </div>
      </CardHeader>
      <CardBody className="p-4">
        <h3 className="text-xl font-bold mb-2">{donation.donationName}</h3>
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <FaUtensils className="text-sm" />
          <span className="text-sm capitalize">{donation.category}</span>
          <span className="text-sm">•</span>
          <span className="text-sm">{donation.quantity} kg</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <FaCalendarAlt className="text-sm" />
          <span className="text-sm">Expires: {formatDate(donation.expiryDateTime)}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <FaMapMarkerAlt className="text-sm" />
          <span className="text-sm truncate">{donation.address}</span>
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button as={Link} href={`/donor/${donation._id}`} color="primary" variant="flat" fullWidth>
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

