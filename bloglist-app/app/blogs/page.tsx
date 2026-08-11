import Link from "next/link";
import { blogs } from "../lib/blogs";

export default function BlogsPage() {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h1>Blogs</h1>

      <Link href="/blogs/new">Create new blog</Link>

      <ul>
        {sortedBlogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>{" "}
            – {blog.author}
          </li>
        ))}
      </ul>
    </div>
  );
}