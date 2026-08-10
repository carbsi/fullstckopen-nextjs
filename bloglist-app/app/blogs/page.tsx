import Link from "next/link";
import { blogs } from "../lib/blogs";

export default function BlogsPage() {
  return (
    <div>
      <h1>Blogs</h1>

      <Link href="/blogs/new">Create new blog</Link>

      <ul>
        {blogs.map((blog) => (
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