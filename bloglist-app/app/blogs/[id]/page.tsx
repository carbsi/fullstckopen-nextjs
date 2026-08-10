import { getBlogById } from "../../lib/blogs";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const blog = getBlogById(id);

  return (
    <div>
      <h1>{blog?.title}</h1>
      <p>Author: {blog?.author}</p>
      <p>URL: {blog?.url}</p>
      <p>Likes: {blog?.likes}</p>
    </div>
  );
}