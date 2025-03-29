"use client"
import React, { useState, useEffect, useMemo, useCallback } from "react"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../../components/ui/table"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "../../../components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"
import { Badge } from "../../../components/ui/badge"
import { Search, ChevronDown, MoreVertical, Truck, Clock, MapPin, Gauge } from "lucide-react"
import axios from "axios"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/card"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "../../../components/ui/pagination"

const rideColumns = [
  { name: "Pickup Location", uid: "pickupLocation" },
  { name: "Dropoff Location", uid: "dropoffLocation" },
  { name: "Distance (km)", uid: "distanceTraveled" },
  { name: "Start Time", uid: "startTime", sortable: true },
  { name: "End Time", uid: "endTime" },
  { name: "Type", uid: "rideType" },
  { name: "Status", uid: "status", sortable: true },
  { name: "Actions", uid: "actions" },
];

const statusOptions = {
  available: {
    label: 'Available',
    variant: 'success',
  },
  booked: {
    label: 'Booked',
    variant: 'warning',
  },
  'in transit': {
    label: 'In Transit',
    variant: 'info',
  },
  delivered: {
    label: 'Delivered',
    variant: 'default',
  },
  cancelled: {
    label: 'Cancelled',
    variant: 'destructive',
  },
};

const INITIAL_VISIBLE_COLUMNS = ["pickupLocation", "dropoffLocation", "distanceTraveled", "startTime", "endTime", "rideType", "status", "actions"];

export default function RidesTable() {
  const [rides, setRides] = useState([])
  const [filterValue, setFilterValue] = useState("")
  const [statusFilter, setStatusFilter] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "startTime",
    direction: "ascending",
  })
  const [page, setPage] = useState(1)
  const { isLoaded, isSignedIn, user } = useUser()
  const [userId, setUserId] = useState(null)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/api/users/myprofile")
        if (response.data.success) {
          setUserId(response.data.user._id)
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error)
      }
    }

    fetchUserProfile()
  }, [])

  useEffect(() => {
    const fetchRides = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get("/api/rides")
        if (response.data.success) {
          setRides(response.data.rides)
        }
      } catch (error) {
        console.error("Failed to fetch rides:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRides()
  }, [])

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/rides/${id}`)
      if (response.data.success) {
        setRides(rides.filter((ride) => ride._id !== id))
      }
    } catch (error) {
      console.error("Failed to delete ride:", error)
    }
  }

  const handleView = (id) => {
    router.push(`/rider/${id}`)
  }

  const handleEdit = (id) => {
    router.push(`/rider/edit/${id}`)
  }

  const filteredRides = useMemo(() => {
    return rides.filter(
      (ride) =>
        ride.user === userId &&
        (ride.pickupLocation.toLowerCase().includes(filterValue.toLowerCase()) ||
          ride.dropoffLocation.toLowerCase().includes(filterValue.toLowerCase())) &&
        (statusFilter.length === 0 || statusFilter.includes(ride.status))
    )
  }, [rides, filterValue, userId, statusFilter])

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage
    return filteredRides.slice(start, end)
  }, [page, filteredRides, rowsPerPage])

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column]
      const second = b[sortDescriptor.column]
      const cmp = first < second ? -1 : first > second ? 1 : 0
      return sortDescriptor.direction === "descending" ? -cmp : cmp
    })
  }, [sortDescriptor, items])

  const renderCell = useCallback((ride, columnKey) => {
    const cellValue = ride[columnKey]
    switch (columnKey) {
      case "pickupLocation":
        return (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{cellValue}</span>
          </div>
        )
      case "dropoffLocation":
        return (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{cellValue}</span>
          </div>
        )
      case "distanceTraveled":
        return (
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-muted-foreground" />
            <span>{cellValue} km</span>
          </div>
        )
      case "startTime":
      case "endTime":
        return (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{new Date(cellValue).toLocaleString()}</span>
          </div>
        )
      case "rideType":
        return (
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-muted-foreground" />
            <span className="capitalize">{cellValue}</span>
          </div>
        )
      case "status":
        const statusInfo = statusOptions[cellValue] || {}
        return (
          <Badge variant={statusInfo.variant}>
            {statusInfo.label}
          </Badge>
        )
      case "actions":
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleView(ride._id)}>
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit(ride._id)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-600" 
                onClick={() => handleDelete(ride._id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      default:
        return cellValue
    }
  }, [])

  const totalPages = Math.ceil(filteredRides.length / rowsPerPage)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-6 w-6" />
          My Rides
        </CardTitle>
        <CardDescription>
          Manage your food transportation rides
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by location..."
                className="pl-8"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Select 
                onValueChange={(value) => setStatusFilter(value === "all" ? [] : [value])}
                defaultValue="all"
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {Object.entries(statusOptions).map(([key, { label }]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select 
                onValueChange={(value) => setRowsPerPage(Number(value))}
                defaultValue="5"
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Rows per page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 per page</SelectItem>
                  <SelectItem value="10">10 per page</SelectItem>
                  <SelectItem value="15">15 per page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {rideColumns
                    .filter((column) => INITIAL_VISIBLE_COLUMNS.includes(column.uid))
                    .map((column) => (
                      <TableHead key={column.uid}>
                        {column.name}
                      </TableHead>
                    ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={rideColumns.length} className="h-24 text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : sortedItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={rideColumns.length} className="h-24 text-center">
                      No rides found
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedItems.map((item) => (
                    <TableRow key={item._id}>
                      {rideColumns
                        .filter((column) => INITIAL_VISIBLE_COLUMNS.includes(column.uid))
                        .map((column) => (
                          <TableCell key={`${item._id}-${column.uid}`}>
                            {renderCell(item, column.uid)}
                          </TableCell>
                        ))}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between px-2">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{Math.min((page - 1) * rowsPerPage + 1, filteredRides.length)}</strong> to{" "}
              <strong>{Math.min(page * rowsPerPage, filteredRides.length)}</strong> of{" "}
              <strong>{filteredRides.length}</strong> rides
            </div>
            
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setPage(Math.max(1, page - 1))
                    }}
                    disabled={page === 1}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setPage(pageNum)
                      }}
                      isActive={pageNum === page}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setPage(Math.min(totalPages, page + 1))
                    }}
                    disabled={page === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}