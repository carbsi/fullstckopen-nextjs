import { blogs } from "../lib/blogs";

export default function BlogsPage() {
  return (
    <div>
      <h1>Blogs</h1>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <strong>{blog.title}</strong> – {blog.author}
          </li>
        ))}
      </ul>
    </div>
  );
}