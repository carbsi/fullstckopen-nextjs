"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerUser } from "../actions/users";

// Client Component koska useActionState on hook
export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, {
    errors: {} as Record<string, string>,
    values: { username: "", name: "" },
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Register</h2>

      <form action={formAction} className="flex flex-col gap-3 max-w-sm">
        <div>
          <div className="flex items-center gap-2">
            <label htmlFor="username" className="w-40">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              defaultValue={state.values?.username}
              className="border border-gray-400 p-1 flex-1"
            />
          </div>
          {state.errors?.username && (
            <p data-testid="username-error" className="text-red-500">
              {state.errors.username}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <label htmlFor="name" className="w-40">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={state.values?.name}
              className="border border-gray-400 p-1 flex-1"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <label htmlFor="password" className="w-40">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="border border-gray-400 p-1 flex-1"
            />
          </div>
          {state.errors?.password && (
            <p data-testid="password-error" className="text-red-500">
              {state.errors.password}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <label htmlFor="passwordConfirm" className="w-40">
              Confirm Password
            </label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              className="border border-gray-400 p-1 flex-1"
            />
          </div>
          {state.errors?.passwordConfirm && (
            <p data-testid="passwordConfirm-error" className="text-red-500">
              {state.errors.passwordConfirm}
            </p>
          )}
        </div>

        <button
          type="submit"
          data-testid="register-button"
          className="border px-3 py-1 rounded w-fit"
        >
          Register
        </button>
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