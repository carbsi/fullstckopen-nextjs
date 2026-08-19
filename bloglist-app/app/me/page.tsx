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
    <div data-testid="user-profile" className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      <p>
        <span className="font-bold">Name:</span>{" "}
        <span data-testid="user-name">{user.name}</span>
      </p>
      <p>
        <span className="font-bold">Username:</span>{" "}
        <span data-testid="user-username">{user.username}</span>
      </p>

      <div data-testid="reading-list-section">
        <h2 className="text-xl font-bold mt-8 mb-2">Reading List</h2>

        {readingListEntries.length === 0 ? (
          <p data-testid="empty-reading-list">Nothing on your reading list yet</p>
        ) : (
          <>
            <div data-testid="unread-section">
              <h3 className="font-bold mt-4 mb-2">Unread ({unread.length})</h3>
              {unread.length === 0 ? (
                <p data-testid="no-unread-blogs">No unread blogs</p>
              ) : (
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
                          data-testid={`mark-read-${entry.id}`}
                          className="rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700 whitespace-nowrap"
                        >
                          mark as read
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div data-testid="read-section">
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
            </div>
          </>
        )}
      </div>

      <div data-testid="api-token-section">
        <h2 className="text-xl font-bold mt-8 mb-2">API Token</h2>

        {user.token ? (
          <div data-testid="token-display" className="bg-gray-800 p-2 rounded">
            <span data-testid="api-token" className="font-mono">
              {user.token}
            </span>
          </div>
        ) : (
          <p data-testid="no-token-message">No token generated yet</p>
        )}

        <form action={generateToken} className="mt-4">
          <button
            type="submit"
            data-testid="generate-token-button"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Generate New Token
          </button>
        </form>
      </div>
    </div>
  )
}