import { Inter } from "next/font/google";
import "./globals.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import Header from "./components/header"
// import {UserProvider} from "./context/userContext"
import "@uploadthing/react/styles.css";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'


import { ourFileRouter } from "../app/api/uploadthing/core";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NourishNet | Fight Hunger & Reduce Food Waste in Your Community",
  description: "Join NourishNet to connect surplus food with those in need. Donate, request, or deliver food to combat hunger and reduce food waste in your local area.",
  keywords: [
    "food donation platform",
    "reduce food waste",
    "community hunger relief",
    "food sharing app",
    "surplus food redistribution",
    "volunteer food delivery"
  ],
  icons: {
    icon: "favicon.ico",
    shortcut: "favicon.png",
  },
  themeColor: "#10B981",
  authors: [
    {
      name: "NourishNet Team",
      url: "https://nourishnet.org/about",
    },
  ],}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
              <NextSSRPlugin

routerConfig={extractRouterConfig(ourFileRouter)}
/>


    <html lang="en">
      <body className={inter.className}>


        <Providers>
          {/* <UserProvider> */}
          <Header/>

          
          <main>
            {children}
          </main>
        {/* </UserProvider> */}
        </Providers>
        </body>
    </html>
    </ClerkProvider>

  );
}
