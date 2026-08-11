import Link from "next/link";
import { blogs } from "../lib/blogs";

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;

  const filteredBlogs = filter
    ? blogs.filter((blog) =>
        blog.title.toLowerCase().includes(filter.toLowerCase())
      )
    : blogs;

  const sortedBlogs = [...filteredBlogs].sort(
    (a, b) => b.likes - a.likes
  );

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">Blogs</h1>
      <form method="GET" className="my-4 flex gap-2">
        <input
          type="text"
          name="filter"
          placeholder="Search by title"
          defaultValue={filter}
          className="rounded border border-gray-400 bg-white px-3 py-2 text-black"
        />
      
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      <Link href="/blogs/new">Create new blog</Link>

      <ul className="space-y-2">
        {sortedBlogs.map((blog) => (
          <li key={blog.id}>
            <Link
              href={`/blogs/${blog.id}`}
              className="font-medium text-blue-600 hover:underline"
            >
              {blog.title}
            </Link>{" "}
            – {blog.author} ({blog.likes} likes)
          </li>
        ))}
      </ul>
    </div>
  );
}