"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerUser } from "../actions/users";

// Server component lomake kutsuu suoraan server actionia
export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, { error: "" });

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Register</h2>

      <form action={formAction}>
        <div>
          <label>
            Username
            <input type="text" name="username" required />
          </label>
        </div>

        <div>
          <label>
            Name
            <input type="text" name="name" required />
          </label>
        </div>

        <div>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
        </div>

        <div>
          <label>
            Confirm password
            <input type="password" name="passwordConfirm" required />
          </label>
        </div>

        <button type="submit" className="border px-3 py-1 rounded">
          Register
        </button>

        {state.error && (
          <p className="text-red-500 mt-2">{state.error}</p>
        )}
      </form>

      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
}