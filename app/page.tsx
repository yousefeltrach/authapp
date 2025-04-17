import { getServerSession } from "next-auth";
import {redirect} from 'next/navigation';
import { authOptions } from "./api/auth/[...nextauth]/route";
import LoginForm from "@/components/login-form";
import Image from "next/image";


export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) redirect ("/dashboard")
  return (
    <div className="flex h-screen w-screen">
      {/* Left side - Image */}
      <div className="hidden w-1/2 bg-gray-100 lg:block">
        <div className="relative h-full w-full">
          <Image
            src="/placeholder.svg?height=1080&width=1080"
            alt="Login background"
            width={1080}
            height={1080}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
            <div className="absolute bottom-10 left-10 max-w-md text-white">
              <h2 className="mb-2 text-3xl font-bold">Welcome Back</h2>
              <p className="text-lg">Sign in to continue your journey with us.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="w-full max-w-md px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Sign in</h1>
            <p className="mt-2 text-muted-foreground">Enter your credentials to access your account</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
