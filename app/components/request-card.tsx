import { Card, CardHeader, CardBody, CardFooter, Button, Chip } from "@nextui-org/react"
import { FaCalendarAlt, FaMapMarkerAlt, FaUtensils } from "react-icons/fa"
import Link from "next/link"

export default function RequestCard({ request }) {
  const statusColors = {
    pending: "warning",
    fulfilled: "success",
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
      <CardHeader className="flex justify-between items-center">
        <h3 className="text-xl font-bold">{request.productName}</h3>
        <Chip color={statusColors[request.status] || "default"} size="sm">
          {request.status}
        </Chip>
      </CardHeader>
      <CardBody className="p-4">
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <FaUtensils className="text-sm" />
          <span className="text-sm">Quantity: {request.quantity} kg</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <FaCalendarAlt className="text-sm" />
          <span className="text-sm">Needed by: {formatDate(request.lastDate)}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <FaMapMarkerAlt className="text-sm" />
          <span className="text-sm truncate">{request.address}</span>
        </div>
        {request.specialNote && (
          <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-600">
            <p className="font-semibold mb-1">Special Note:</p>
            <p>{request.specialNote}</p>
          </div>
        )}
      </CardBody>
      <CardFooter className="pt-0">
        <Button as={Link} href={`/requester/${request._id}`} color="primary" variant="flat" fullWidth>
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

