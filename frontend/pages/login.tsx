import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import bg from "../public/bg.jpg";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const Login: React.FC = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl: `/`
    });

    if (result?.error) {
      console.log(result.error);
    } else {
      // Success
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:block w-1/2 bg-gray-800">
        <Image
          src={bg}
          alt="logo"
          width={1920}
          height={1080}
          objectFit="contain"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center ">
        <h1 className="text-4xl font-bold mb-8">Login</h1>
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-500 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-500 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <Link href={"/register"}>
              <p>
                Register
              </p>
            </Link>
            <Button
              type="submit"
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
