"use client"
import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../../components/ui/table";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "../../../components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Badge } from "../../../components/ui/badge";
import { Search, ChevronDown, MoreVertical } from "lucide-react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "../../../components/ui/pagination";

const requesterColumns = [
  { name: "NEEDER", uid: "needer" },
  { name: "PRODUCT NAME", uid: "productName" },
  { name: "QUANTITY", uid: "quantity" },
  { name: "LAST DATE", uid: "lastDate", sortable: true },
  { name: "ADDRESS", uid: "address" },
  { name: "SPECIAL NOTE", uid: "specialNote" },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = {
  pending: {
    label: "Pending",
    variant: "secondary",
  },
  approved: {
    label: "Approved",
    variant: "success",
  },
  rejected: {
    label: "Rejected",
    variant: "destructive",
  },
  fulfilled: {
    label: "Fulfilled",
    variant: "default",
  },
};

const INITIAL_VISIBLE_COLUMNS = [
  "needer",
  "productName",
  "quantity",
  "lastDate",
  "status",
  "actions",
];

export default function RequestersTable() {
  const [requesters, setRequesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "lastDate",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);
  const { isLoaded, isSignedIn, user } = useUser();
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/api/users/myprofile");
        if (response.data.success) {
          setUserId(response.data.user._id);
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchRequesters = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/requests");
        if (response.data.success) {
          setRequesters(response.data.requests || []);
        }
      } catch (error) {
        console.error("Failed to fetch requesters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequesters();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/requesters/${id}`);
      if (response.data.success) {
        setRequesters(requesters.filter((requester) => requester._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete requester:", error);
    }
  };

  const handleView = (id) => {
    router.push(`/requester/${id}`);
  };

  const handleEdit = (id) => {
    router.push(`/requester/edit/${id}`);
  };

  const filteredRequesters = useMemo(() => {
    return requesters.filter(
      (requester) =>
        requester.needer === userId &&
        (requester.needer?.toLowerCase().includes(filterValue.toLowerCase()) ||
          requester.productName?.toLowerCase().includes(filterValue.toLowerCase())) &&
        (statusFilter.length === 0 || statusFilter.includes(requester.status))
    );
  }, [requesters, filterValue, userId, statusFilter]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredRequesters.slice(start, end);
  }, [page, filteredRequesters, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((requester, columnKey) => {
    const cellValue = requester[columnKey];
    switch (columnKey) {
      case "needer":
      case "productName":
      case "quantity":
      case "lastDate":
      case "address":
      case "specialNote":
        return <span className="font-medium">{cellValue}</span>;
      case "status":
        const statusInfo = statusOptions[cellValue] || {};
        return (
          <Badge variant={statusInfo.variant}>
            {statusInfo.label}
          </Badge>
        );
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
              <DropdownMenuItem onClick={() => handleView(requester._id)}>
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit(requester._id)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-600" 
                onClick={() => handleDelete(requester._id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      default:
        return cellValue;
    }
  }, []);

  const totalPages = Math.ceil(filteredRequesters.length / rowsPerPage);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>My Requests</CardTitle>
        <CardDescription>
          Manage your food requests and track their status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by needer or product..."
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
                  {requesterColumns
                    .filter((column) => INITIAL_VISIBLE_COLUMNS.includes(column.uid))
                    .map((column) => (
                      <TableHead key={column.uid}>
                        {column.name}
                      </TableHead>
                    ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={requesterColumns.length} className="h-24 text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : sortedItems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={requesterColumns.length} className="h-24 text-center">
                      No requests found
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedItems.map((item) => (
                    <TableRow key={item._id}>
                      {requesterColumns
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
              Showing <strong>{Math.min((page - 1) * rowsPerPage + 1, filteredRequesters.length)}</strong> to{" "}
              <strong>{Math.min(page * rowsPerPage, filteredRequesters.length)}</strong> of{" "}
              <strong>{filteredRequesters.length}</strong> requests
            </div>
            
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(Math.max(1, page - 1));
                    }}
                    disabled={page === 1}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(pageNum);
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
                      e.preventDefault();
                      setPage(Math.min(totalPages, page + 1));
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
  );
}