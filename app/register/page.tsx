// import Registerform from "@/components/register-form";
// import { getServerSession } from "next-auth";
// import {redirect} from 'next/navigation';
// import { authOptions } from "../api/auth/[...nextauth]/route";


// export default async function Register() {
//  const session = await getServerSession(authOptions);
//  if (session) redirect ("/dashboard")
//     return (
//       <div>
//         <Registerform/>
//       </div>
//     )
//   }



import { getServerSession } from "next-auth";
import {redirect} from 'next/navigation';
import { authOptions } from "../api/auth/[...nextauth]/route";
import RegisterForm from "@/components/register-form";
import Image from "next/image";


export default async function Register() {
 const session = await getServerSession(authOptions);
 if (session) redirect ("/dashboard")
    return (
      <div className="flex h-screen w-screen">
      {/* Left side - Image */}
      <div className="hidden w-1/2 bg-gray-100 lg:block">
        <div className="relative h-full w-full">
          <Image
            src="/placeholder.svg?height=1080&width=1080"
            alt="Register background"
            width={1080}
            height={1080}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
            <div className="absolute bottom-10 left-10 max-w-md text-white">
              <h2 className="mb-2 text-3xl font-bold">Join Us Today</h2>
              <p className="text-lg">Create an account to start your journey.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Register form */}
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="w-full max-w-md px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="mt-2 text-muted-foreground">Enter your information to get started</p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
    )
  }