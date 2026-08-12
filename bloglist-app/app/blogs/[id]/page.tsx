import { getBlogById } from "../../lib/blogs";
import { likeBlogAction } from "../../actions/blogs";
import { notFound } from "next/navigation";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const blog = await getBlogById(Number(id));

  if (!blog) {
  notFound();
}

  return (
    <div>
      <h1>{blog?.title}</h1>
      <p>Author: {blog?.author}</p>
      <p>URL: {blog?.url}</p>
      <p>Likes: {blog?.likes}</p>

      <form action={likeBlogAction}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">Like</button>
      </form>
    </div>
  );
}