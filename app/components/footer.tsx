import Link from "next/link"
import Image from "next/image"
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="https://utfs.io/f/6acd2fe6-ff76-4a5e-906e-1447de6db90f-2ps.png"
                alt="Nourish Net"
                width={50}
                height={50}
              />
              <span className="text-xl font-bold">Nourish Net</span>
            </Link>
            <p className="text-gray-300">
              Transforming Waste into Wellness. Connecting food donors with those in need through our community-driven
              platform.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-300 hover:text-white">
                <FaFacebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <FaInstagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <FaTwitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/donor" className="text-gray-300 hover:text-white">
                  Donate Food
                </Link>
              </li>
              <li>
                <Link href="/requester" className="text-gray-300 hover:text-white">
                  Request Food
                </Link>
              </li>
              <li>
                <Link href="/rider" className="text-gray-300 hover:text-white">
                  Become a Rider
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-gray-300 hover:text-white">
                  Our Team
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Humanity Coins</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Earn coins by donating food</li>
              <li className="text-gray-300">Volunteer to earn more coins</li>
              <li className="text-gray-300">Lead food drives for bonus coins</li>
              <li className="text-gray-300">Redeem coins for rewards</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                <span className="text-gray-300">123 Food Street, Hunger City, 600001</span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">info@nourishnet.org</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Nourish Net. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

