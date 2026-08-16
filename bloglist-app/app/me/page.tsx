import { redirect } from "next/navigation"
import { getCurrentUser } from "../services/session"
import { generateToken } from "../actions/users"

export default async function MePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      <p><span className="font-bold">Name:</span> {user.name}</p>
      <p><span className="font-bold">Username:</span> {user.username}</p>

      <h2 className="text-xl font-bold mt-6 mb-2">API Token</h2>

      {user.token ? (
        <p className="font-mono bg-gray-800 p-2 rounded">{user.token}</p>
      ) : (
        <p>No token generated yet</p>
      )}

      <form action={generateToken} className="mt-4">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Generate New Token
        </button>
      </form>
    </div>
  )
}