import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6 text-center">Join Nourish Net</h1>
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        redirectUrl="/addDetail"
        appearance={{
          elements: {
            formButtonPrimary: "bg-green-600 hover:bg-green-700 text-sm normal-case",
          },
        }}
      />
    </div>
  )
}

