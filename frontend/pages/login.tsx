import React from "react";
// import { signIn } from "next-auth/client";
import Image from "next/image";
import logo from "../public/next.svg";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const Login: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // signIn();
  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:block w-1/2 bg-gray-800">
        <Image
          src={logo}
          alt="logo"
          width={600}
          height={600}
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
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <Link href={"/register"}>
              <p>
                Register
              </p>
            </Link>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
