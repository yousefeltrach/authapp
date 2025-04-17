// "use client"
// import Link from "next/link";
// import { useState } from "react";
// import {signIn} from 'next-auth/react';
// import { useRouter } from "next/navigation";


// export default function Loginform() {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const res = await signIn('credentials', {
//       email,
//       password,
//       redirect: false 
//     });

//     if (res?.error) {
//       setError('Invalid credentials')
//       return;
//     }

//     router.replace("dashboard");
//   } catch (error) {
//     console.log(error);
//   }
// };

//   return (

//     <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
//     <div className="sm:mx-auto sm:w-full sm:max-w-sm">
   
//       <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
//         Sign in to your account
//       </h2>
//     </div>

//     <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//       <form onSubmit={handleSubmit }  className="space-y-6">
//         <div>
//           <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
//             Email address
//           </label>
//           <div className="mt-2">
//             <input
//              onChange={(e) => setEmail(e.target.value)}
//               id="email"
//               name="email"
//               type="email"
//               required
//               autoComplete="email"
//               className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//             />
//           </div>
//         </div>

//         <div>
//           <div className="flex items-center justify-between">
//             <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
//               Password
//             </label>
//             <div className="text-sm">
//               <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
//                 Forgot password?
//               </a>
//             </div>
//           </div>
//           <div className="mt-2">
//             <input
//              onChange={(e) => setPassword(e.target.value)}
//               id="password"
//               name="password"
//               type="password"
//               required
//               autoComplete="current-password"
//               className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//             />
//           </div>
//         </div>

//         <div>
//           <button
//             type="submit"
//             className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           >
//             Login
//           </button>
//         </div>
//         {error && (
//         <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
//          {error} 
//           </div>
//           )}
      
//           <Link className="text-sm mt-3 text-right" href={"/register"}>
//             Don’t have an account? <span className="underline">Register</span>
//           </Link>
  
//     </form>  
//     </div>
//   </div>
//   )
// }

"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (res?.error) {
        setError("Invalid email or password")
        setIsLoading(false)
        return
      }

      router.replace("/dashboard")
    } catch (error) {
      console.error(error)
      setError("An unexpected error occurred. Please try again.")
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
          <Label htmlFor="email">Email</Label>
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
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-xs text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
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
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            disabled={isLoading}
          />
          <Label
            htmlFor="remember"
            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
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
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

