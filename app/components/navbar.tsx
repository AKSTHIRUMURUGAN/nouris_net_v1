"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { UserButton, useUser } from "@clerk/nextjs"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button,
  Badge,
} from "@nextui-org/react"
import { FaHome, FaGift, FaTruck, FaFileAlt, FaUsers, FaPhone, FaCoins, FaMoneyBillTrendUp } from "react-icons/fa"
import axios from "axios"

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isSignedIn, user } = useUser()
  const [humanityCoins, setHumanityCoins] = useState(0)
  const [userProfile, setUserProfile] = useState(null)

  useEffect(() => {
    // Fetch user's humanity coins if signed in
    if (isSignedIn && user) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get("/api/users/myprofile")
          if (response.data.success && response.data.user) {
            setUserProfile(response.data.user)
            setHumanityCoins(response.data.user.humanityCoinBalance || 0)
          }
        } catch (error) {
          console.error("Error fetching user data:", error)
        }
      }

      fetchUserData()
    }
  }, [isSignedIn, user])

  const routes = [
    { name: "Home", path: "/", icon: <FaHome className="text-lg" /> },
    { name: "Donations", path: "/donor", icon: <FaGift className="text-lg" /> },
    { name: "Rides", path: "/rider", icon: <FaTruck className="text-lg" /> },
    { name: "Requests", path: "/requester", icon: <FaFileAlt className="text-lg" /> },
    { name: "Invester", path: "/invester", icon: <FaMoneyBillTrendUp className="text-lg" /> },
    { name: "Humanity Coin", path: "/humanity-coin", icon: <FaCoins className="text-lg" /> },
    { name: "Team", path: "/team", icon: <FaUsers className="text-lg" /> },
    { name: "Contact Us", path: "/contact_us", icon: <FaPhone className="text-lg" /> },
  ]

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen} isBordered className="shadow-sm">
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
        <NavbarBrand>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://utfs.io/f/6acd2fe6-ff76-4a5e-906e-1447de6db90f-2ps.png"
              alt="Nourish Net"
              width={40}
              height={40}
            />
            <span className="font-bold text-inherit text-xl hidden sm:block">Nourish Net</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {routes.map((route) => (
          <NavbarItem key={route.path} isActive={pathname === route.path}>
            <Link
              href={route.path}
              className={`flex items-center gap-1 ${pathname === route.path ? "text-primary font-medium" : ""}`}
            >
              {route.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        {isSignedIn ? (
          <>
            <NavbarItem className="hidden md:flex">
              <Badge content={humanityCoins} color="success" shape="circle" placement="bottom-right">
                <div className="flex items-center gap-1 px-3 py-1 bg-success-50 rounded-full">
                  <FaCoins className="text-success" />
                  <span className="text-success font-medium">Coins</span>
                </div>
              </Badge>
            </NavbarItem>
            <NavbarItem>
              <UserButton afterSignOutUrl="/" />
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="hidden sm:flex">
              <Link href="/sign-in">
                <Button color="default" variant="flat">
                  Sign In
                </Button>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/sign-up">
                <Button color="primary">Sign Up</Button>
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        {routes.map((route, index) => (
          <NavbarMenuItem key={`${route.name}-${index}`}>
            <Link
              href={route.path}
              className={`flex items-center gap-2 w-full p-2 ${
                pathname === route.path ? "text-primary font-medium bg-primary-50 rounded-md" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {route.icon}
              <span>{route.name}</span>
            </Link>
          </NavbarMenuItem>
        ))}
        {isSignedIn && (
          <NavbarMenuItem>
            <div className="flex items-center gap-2 p-2">
              <FaCoins className="text-success" />
              <span className="font-medium">{humanityCoins} Humanity Coins</span>
            </div>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
    </Navbar>
  )
}

