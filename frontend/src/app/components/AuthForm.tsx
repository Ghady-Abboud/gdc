"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import AppPage from "@/lib/routes/routes";

interface AuthFormProps {
  type: "signin" | "signup";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const router = useRouter();

  const [signInUsername, setSignInUsername] = React.useState<string>("");
  const [signInpassword, setSignInPassword] = React.useState<string>("");

  const [signUpUsername, setSignUpUsername] = React.useState<string>("");
  const [signUpPassword, setSignUpPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");

  const handleCredSubmit = async () => {
    if (type === "signin") {
      const res = await fetch("http://localhost:3001/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: signInUsername,
          password: signInpassword,
        }),
      });
      if (res.status === 200) {
        router.push(AppPage.DASHBOARD);
      }
    } else if (type === "signup") {
      if (signUpPassword !== confirmPassword) {
        alert("Passwords do not match");
      } else {
        const res = await fetch("http://localhost:3001/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: signUpUsername,
            password: signUpPassword,
          }),
        });
        if (res.status === 200) {
          router.push(AppPage.SIGNIN);
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-5 w-full h-full p-8 pb-40 shadow-md rounded-lg">
      <Image
        src="/image/cloud-storage.png"
        alt="cloud-storage"
        width={100}
        height={100}
        className="mb-5"
      />
      {type === "signin" && (
        <>
          <h1 className="text-3xl font-bold">Sign In</h1>
          <input
            pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
            placeholder="Email"
            id="email"
            name="email"
            type="text"
            className="text-tablefontcolor block w-1/2 px-3 py-4 mt-2 text-sm placeholder-gray-400 border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring"
            value={signInUsername}
            onChange={(e) => {
              e.preventDefault();
              setSignInUsername(e.target.value);
            }}
          />
          <input
            placeholder="Password"
            id="password"
            name="password"
            type="password"
            className="text-tablefontcolor block w-1/2 px-3 py-4 mt-2 text-sm placeholder-gray-400 border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring"
            value={signInpassword}
            onChange={(e) => {
              e.preventDefault();
              setSignInPassword(e.target.value);
            }}
          />
          <input
            value="Login"
            className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            type="submit"
            onClick={handleCredSubmit}
          />
        </>
      )}
      {type === "signup" && (
        <>
          <h1 className="text-3xl font-bold">Create Account</h1>
          <input
            pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
            placeholder="Email"
            id="email"
            name="email"
            type="text"
            className="text-opacity-1 block w-1/2 px-3 py-4 mt-2 text-sm placeholder-gray-400 border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring"
            value={signUpUsername}
            onChange={(e) => {
              e.preventDefault();
              setSignUpUsername(e.target.value);
            }}
          />
          <input
            placeholder="Password"
            id="password"
            name="password"
            type="password"
            className="text-opacity-1 block w-1/2 px-3 py-4 mt-2 text-sm placeholder-gray-400 border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring"
            value={signUpPassword}
            onChange={(e) => {
              e.preventDefault();
              setSignUpPassword(e.target.value);
            }}
          />
          <input
            placeholder="Confirm Password"
            id="password"
            name="password"
            type="password"
            className="text-opacity-1 block w-1/2 px-3 py-4 mt-2 text-sm placeholder-gray-400 border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring"
            value={confirmPassword}
            onChange={(e) => {
              e.preventDefault();
              setConfirmPassword(e.target.value);
            }}
          />

          <input
            value="Sign Up"
            className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            type="submit"
            onClick={handleCredSubmit}
          />
        </>
      )}
    </div>
  );
};

export default AuthForm;
