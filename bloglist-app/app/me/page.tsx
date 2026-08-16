import Link from "next/link"
import { redirect } from "next/navigation"
import { getCurrentUser } from "../services/session"
import { getReadingList } from "../services/readinglist"
import { generateToken } from "../actions/users"
import { markAsReadAction } from "../actions/readinglist"

export default async function MePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const readingListEntries = await getReadingList(user.id)

  const unread = readingListEntries.filter((entry) => !entry.read)
  const read = readingListEntries.filter((entry) => entry.read)

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      <p><span className="font-bold">Name:</span> {user.name}</p>
      <p><span className="font-bold">Username:</span> {user.username}</p>

      <h2 className="text-xl font-bold mt-8 mb-2">Reading List</h2>

      {readingListEntries.length === 0 ? (
        <p>Nothing on your reading list yet</p>
      ) : (
        <>
          <h3 className="font-bold mt-4 mb-2">Unread ({unread.length})</h3>
          <ul className="space-y-2">
            {unread.map((entry) => (
              <li
                key={entry.id}
                className="flex items-center justify-between gap-4 rounded bg-yellow-900/30 p-3"
              >
                <Link
                  href={`/blogs/${entry.blog.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {entry.blog.title}
                </Link>
                <form action={markAsReadAction}>
                    {/* entry.id on lukulistarivin id, ei blogin id */}
                  <input type="hidden" name="entryId" value={entry.id} />
                  <button
                    type="submit"
                    className="rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700 whitespace-nowrap"
                  >
                    mark as read
                  </button>
                </form>
              </li>
            ))}
          </ul>

          <h3 className="font-bold mt-6 mb-2">Read ({read.length})</h3>
          <ul className="space-y-2">
            {read.map((entry) => (
              <li key={entry.id} className="rounded bg-green-900/30 p-3">
                <Link
                  href={`/blogs/${entry.blog.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {entry.blog.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      <h2 className="text-xl font-bold mt-8 mb-2">API Token</h2>

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