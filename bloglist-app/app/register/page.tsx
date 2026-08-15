import Link from "next/link";
import { registerUser } from "../actions/users";

// Server component lomake kutsuu suoraan server actionia
export default function RegisterPage() {
  return (
    <div>
        <h2 className="text-xl font-bold mb-4">Register</h2>

      <form action={registerUser}>
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

        <button type="submit" className="border px-3 py-1 rounded">Register</button>
      </form>

      <p>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
}