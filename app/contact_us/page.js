"use client"
import { useState } from "react"
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Input, Textarea } from "@nextui-org/react"
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheck, FaExclamationTriangle } from "react-icons/fa"
import emailjs from '@emailjs/browser'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userMessage: "",
  })

  const [isSent, setIsSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Initialize EmailJS (you should do this once in your app)
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_USER_ID)

    emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      {
        from_name: formData.userName,
        from_email: formData.userEmail,
        message: formData.userMessage,
      }
    )
    .then((response) => {
      console.log('Email sent successfully:', response.status, response.text)
      setIsSent(true)
      setIsSubmitting(false)
    })
    .catch((err) => {
      console.error('Failed to send email:', err)
      setError("Failed to send message. Please try again later.")
      setIsSubmitting(false)
    })
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Card className="h-full">
              <CardHeader>
                <h2 className="text-xl font-bold">Get In Touch</h2>
              </CardHeader>
              <Divider />
              <CardBody className="space-y-6">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-gray-600">123 Food Street, Hunger City, 600001</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaPhone className="text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-600">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaEnvelope className="text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">info@nourishnet.org</p>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-semibold mb-2">Hours of Operation</h3>
                  <ul className="space-y-1 text-gray-600">
                    <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
                    <li>Saturday: 10:00 AM - 4:00 PM</li>
                    <li>Sunday: Closed</li>
                  </ul>
                </div>
              </CardBody>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold">Send Us a Message</h2>
              </CardHeader>
              <Divider />
              <CardBody>
                {!isSent ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      name="userName"
                      placeholder="Enter your name"
                      value={formData.userName}
                      onChange={handleChange}
                      isRequired
                    />
                    <Input
                      name="userEmail"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.userEmail}
                      onChange={handleChange}
                      isRequired
                    />
                    <Textarea
                      name="userMessage"
                      placeholder="How can we help you?"
                      value={formData.userMessage}
                      onChange={handleChange}
                      minRows={4}
                      isRequired
                    />
                    
                    {error && (
                      <div className="flex items-center gap-2 text-danger">
                        <FaExclamationTriangle />
                        <span>{error}</span>
                      </div>
                    )}
                    
                    <Button 
                      type="submit" 
                      color="primary" 
                      className="w-full" 
                      isLoading={isSubmitting}
                      isDisabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="bg-green-100 rounded-full p-3 mb-4">
                      <FaCheck className="text-green-600 text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-green-600 mb-2">Message Sent!</h3>
                    <p className="text-center text-gray-600">
                      Thank you for reaching out. We&apos;ll get back to you as soon as possible.
                    </p>
                    <Button
                      color="primary"
                      variant="flat"
                      className="mt-6"
                      onClick={() => {
                        setIsSent(false)
                        setFormData({
                          userName: "",
                          userEmail: "",
                          userMessage: "",
                        })
                      }}
                    >
                      Send Another Message
                    </Button>
                  </div>
                )}
              </CardBody>
              <Divider />
              <CardFooter>
                <p className="text-sm text-gray-500">
                  We value your feedback and inquiries. Our team is dedicated to responding promptly.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-2">How can I donate food?</h3>
                  <p className="text-gray-600">
                    You can donate food by creating an account and listing your donation through our platform. Our
                    riders will pick up the food from your location.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">How do I request food?</h3>
                  <p className="text-gray-600">
                    Create an account, navigate to the Requester section, and submit a food request with your details
                    and requirements.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">How do Humanity Coins work?</h3>
                  <p className="text-gray-600">
                    Humanity Coins are earned through donations, deliveries, and volunteering. They can be redeemed for
                    rewards or donated to support causes.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">Can I volunteer without delivering food?</h3>
                  <p className="text-gray-600">
                    Yes, we have various volunteering opportunities beyond food delivery. Contact us to learn more about
                    how you can contribute.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}