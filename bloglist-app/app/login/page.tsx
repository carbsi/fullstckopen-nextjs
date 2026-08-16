"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    

    // lähettää username ja salasana NextAuth authorize funktiolle auth.ts tiedostossa
    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
    } else {
      router.push("/")
      router.refresh()
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm">
        <div className="flex items-center gap-2">
          <label htmlFor="username" className="w-24">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            className="border border-gray-400 p-1 flex-1"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="password" className="w-24">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="border border-gray-400 p-1 flex-1"
          />
        </div>

        <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-fit"
          >
            Login
        </button>
      </form>
    </div>
  )
}