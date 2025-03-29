import { Button } from "@nextui-org/react"
import Link from "next/link"

export default function CTASection() {
  return (
    <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold">Join Our Mission Today</h2>
        <p className="mt-4 text-lg mx-auto max-w-2xl">
          Whether you&apos;re donating food, delivering it, or receiving it, you&apos;re part of the solution to food waste and
          hunger.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button as={Link} href="/sign-up" color="default" size="lg" className="font-semibold">
            Sign Up Now
          </Button>
          <Button
            as={Link}
            href="/contact_us"
            variant="bordered"
            size="lg"
            className="text-white border-white font-semibold"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  )
}

