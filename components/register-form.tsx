// "use client"
// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Registerform() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const router = useRouter();
  
//   //check if any values are messing
//   const  handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!name || !email || !password) {
//       setError("All fields are required.");
//       return;
//     }
//     try{
//       //check if the user exists
//        const resUserExists = await fetch("api/userExists",{
//         method : "POST",
//         headers: {
//           "Content-type" : "application/json",
//         },
//         body: JSON.stringify({email}),
//        });

//        const {user} = await resUserExists.json()
//        if (user) {
//         setError("User already exists.");
//         return;
//        }

//       const res = await fetch('api/register',{
//         method: "POST",
//         headers: {
//           "Content-type" : "application/json"
//         },
//         body: JSON.stringify({
//           name, email, password
//         })
//       });
//       if (res.ok) {
//         const form = e.target as HTMLFormElement;
//         form.reset();
//         router.push("/");
//       } else {
//         console.log("error: registration failed"); 
//       }
//     } catch (error) {
//      console.log("Error during registration:" , error)
//     }
//   }
   
//   console.log("Name:", name)
//   return (
//     <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">

//         <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
//           Register
//         </h2>
//       </div>

//       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
//         <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
//           <form onSubmit={handlesubmit} className="space-y-6">
//             <div>
//               <label htmlFor="Name" className="block text-sm/6 font-medium text-gray-900">
//                 Full name
//               </label>
//               <div className="mt-2">
//                 <input
//                   onChange={(e) => setName(e.target.value)}
//                   type="text"
//                   placeholder="Full Name"
//                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  -outline-offset-1 outline-gray-300 placeholder:text-gray-400  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
//                 Email address
//               </label>
//               <div className="mt-2">
//                 <input
//                 onChange={(e) => setEmail(e.target.value)}
//                   type="text"
//                   required
//                   autoComplete="email"
//                   placeholder="Email"
//                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                 />
//               </div>
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
//                 Password
//               </label>
//               <div className="mt-2">
//                 <input
//                  onChange={(e) => setPassword(e.target.value)}
//                   type="password"
//                   placeholder="Password"
//                   className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                 />
//               </div>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex gap-3">
//                 <div className="flex h-6 shrink-0 items-center">

//                 </div>

//               </div>


//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2  focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//               >
//                 Register
//               </button>
//             </div>
//             {error && (
//               <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
//                 {error}
//               </div>
//             )}



//             <p className="mt-10 text-center text-sm/6 text-gray-500">
//               Already have an account?{' '}
//               <Link href={"/"} className="underline font-semibold text-indigo-600 hover:text-indigo-500">
//                 Login
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Loader2, Check, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

export default function RegisterForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)

  const router = useRouter()

  // Password strength calculation
  const calculatePasswordStrength = (password: string): number => {
    if (!password) return 0

    let strength = 0

    // Length check
    if (password.length >= 8) strength += 25

    // Character variety checks
    if (/[A-Z]/.test(password)) strength += 25
    if (/[a-z]/.test(password)) strength += 25
    if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 25

    return strength
  }

  const passwordStrength = calculatePasswordStrength(password)

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 25) return "Weak"
    if (passwordStrength <= 50) return "Fair"
    if (passwordStrength <= 75) return "Good"
    return "Strong"
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-red-500"
    if (passwordStrength <= 50) return "bg-yellow-500"
    if (passwordStrength <= 75) return "bg-green-400"
    return "bg-green-500"
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Form validation
    if (!name || !email || !password) {
      setError("All fields are required.")
      return
    }

    if (passwordStrength < 50) {
      setError("Please choose a stronger password.")
      return
    }

    if (!acceptTerms) {
      setError("You must accept the terms and conditions.")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      // Check if the user exists
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const { user } = await resUserExists.json()

      if (user) {
        setError("User already exists.")
        setIsLoading(false)
        return
      }

      // Register the user
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      if (res.ok) {
        router.push("/login")
      } else {
        setError("Registration failed. Please try again.")
      }
    } catch (error) {
      console.error("Error during registration:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              required
              disabled={isLoading}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={togglePasswordVisibility}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
            </Button>
          </div>

          {/* Password strength indicator */}
          {(passwordFocused || password) && (
            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>Password strength: {getPasswordStrengthText()}</span>
                <span>{passwordStrength}%</span>
              </div>
              <Progress value={passwordStrength} className={`h-1 w-full ${getPasswordStrengthColor()}`} />

              <div className="mt-2 space-y-1 text-xs">
                <div className="flex items-center gap-1">
                  {password.length >= 8 ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <X className="h-3 w-3 text-muted-foreground" />
                  )}
                  <span>At least 8 characters</span>
                </div>
                <div className="flex items-center gap-1">
                  {/[A-Z]/.test(password) ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <X className="h-3 w-3 text-muted-foreground" />
                  )}
                  <span>At least one uppercase letter</span>
                </div>
                <div className="flex items-center gap-1">
                  {/[a-z]/.test(password) ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <X className="h-3 w-3 text-muted-foreground" />
                  )}
                  <span>At least one lowercase letter</span>
                </div>
                <div className="flex items-center gap-1">
                  {/[0-9!@#$%^&*(),.?":{}|<>]/.test(password) ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <X className="h-3 w-3 text-muted-foreground" />
                  )}
                  <span>At least one number or special character</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={acceptTerms}
            onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            disabled={isLoading}
          />
          <Label
            htmlFor="terms"
            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the{" "}
            <Link href="/terms" className="font-medium text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="font-medium text-primary hover:underline">
              Privacy Policy
            </Link>
          </Label>
        </div>

        {error && (
          <Alert variant="destructive" className="py-2">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
