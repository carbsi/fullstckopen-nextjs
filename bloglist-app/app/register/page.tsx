"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerUser } from "../actions/users";
// client Component koska useActionState on hook
export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, { error: "" });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Register</h2>

      <form action={formAction} className="flex flex-col gap-3 max-w-sm">
        <div className="flex items-center gap-2">
          <label htmlFor="username" className="w-40">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            className="border border-gray-400 p-1 flex-1"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="name" className="w-40">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="border border-gray-400 p-1 flex-1"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="password" className="w-40">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="border border-gray-400 p-1 flex-1"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="passwordConfirm" className="w-40">
            Confirm password
          </label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            required
            className="border border-gray-400 p-1 flex-1"
          />
        </div>

        <button type="submit" className="border px-3 py-1 rounded w-fit">
          Register
        </button>

        {state.error && <p className="text-red-500 mt-2">{state.error}</p>}
      </form>

      <p className="mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}