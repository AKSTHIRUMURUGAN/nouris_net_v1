"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../../components/ui/navigation-menu";
import { Button } from "../../components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import {
  Home,
  HandHeart,
  Bike,
  UserCircle,
  Coins,
  Users,
  Mail,
  Menu,
} from "lucide-react";
import { TrendingUp } from "lucide-react";
import Image from "next/image";
import { cn } from "../../lib/utils";

export default function Header() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const menuItems = [
    { name: "Home", icon: <Home className="h-4 w-4" />, path: "/" },
    { name: "Donor", icon: <HandHeart className="h-4 w-4" />, path: "/donor" },
    { name: "Rider", icon: <Bike className="h-4 w-4" />, path: "/rider" },
    { name: "Requester", icon: <UserCircle className="h-4 w-4" />, path: "/requester" },
    { name: "Investor", icon: <TrendingUp className="h-4 w-4" />, path: "/invester" },
    { name: "Humanity Coin", icon: <Coins className="h-4 w-4" />, path: "/humanity-coin" },
    { name: "Team", icon: <Users className="h-4 w-4" />, path: "/team" },
    { name: "Contact", icon: <Mail className="h-4 w-4" />, path: "/contact_us" },
  ];

  const handleNavigation = (path: string, index: number) => {
    setActiveIndex(index);
    router.push(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Mobile Menu Button (Left side) */}
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 pt-6">
                {menuItems.map((item, index) => (
                  <Button
                    key={item.name}
                    variant={activeIndex === index ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => handleNavigation(item.path, index)}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      {item.name}
                    </div>
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo (Centered on mobile, left on desktop) */}
        <div className="flex items-center gap-2 md:mr-10">
          <Image
            src="https://utfs.io/f/6acd2fe6-ff76-4a5e-906e-1447de6db90f-2ps.png"
            alt="Nourish Net Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-lg font-bold">Nourish Net</span>
        </div>

        {/* Desktop Navigation (Center-aligned) */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map((item, index) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      activeIndex === index ? "bg-accent text-accent-foreground" : "",
                      "cursor-pointer"
                    )}
                    onClick={() => handleNavigation(item.path, index)}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span className="whitespace-nowrap">{item.name}</span>
                    </div>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Auth Buttons (Right side) */}
        <div className="flex items-center gap-2">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline" className="whitespace-nowrap">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}