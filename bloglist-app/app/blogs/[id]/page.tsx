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
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="mb-4 text-3xl font-bold">{blog?.title}</h1>

      <div className="space-y-1 mb-6">
        <p>
          <span className="text-gray-400">Author:</span> {blog?.author}
        </p>
        <p>
          <span className="text-gray-400">URL:</span>{" "}
          <a
            href={blog?.url}
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {blog?.url}
          </a>
        </p>
        <p>
          <span className="text-gray-400">Likes:</span> {blog?.likes}
        </p>
      </div>

      <form action={likeBlogAction}>
        <input type="hidden" name="id" value={blog?.id} />
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Like
        </button>
      </form>
    </div>
  );
}