"use client"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Registerform() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();
  
  //check if any values are messing
  const  handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }
    try{
      //check if the user exists
       const resUserExists = await fetch("api/userExists",{
        method : "POST",
        headers: {
          "Content-type" : "application/json",
        },
        body: JSON.stringify({email}),
       });

       const {user} = await resUserExists.json()
       if (user) {
        setError("User already exists.");
        return;
       }

      const res = await fetch('api/register',{
        method: "POST",
        headers: {
          "Content-type" : "application/json"
        },
        body: JSON.stringify({
          name, email, password
        })
      });
      if (res.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
        router.push("/");
      } else {
        console.log("error: registration failed"); 
      }
    } catch (error) {
     console.log("Error during registration:" , error)
    }
  }
   
  console.log("Name:", name)
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">

        <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Register
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form onSubmit={handlesubmit} className="space-y-6">
            <div>
              <label htmlFor="Name" className="block text-sm/6 font-medium text-gray-900">
                Full name
              </label>
              <div className="mt-2">
                <input
                onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Full Name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  required
                  autoComplete="email"
                  placeholder="Email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                 onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <div className="flex h-6 shrink-0 items-center">

                </div>

              </div>


            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
            {error && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}



            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Already have an account?{' '}
              <Link href={"/"} className="underline font-semibold text-indigo-600 hover:text-indigo-500">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}