import { getBlogById } from "../../lib/blogs";
import { likeBlogAction } from "../../actions/blogs";
import { addToReadingListAction } from "../../actions/readinglist";
import { getCurrentUser } from "../../services/session";
import { isOnReadingList } from "../../services/readinglist";
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

  const user = await getCurrentUser();

  // nappi näkyy vain kirjautuneelle joka ei ole itse lisännyt blogia
  // eikä sitä ole jo hänen lukulistallaan
  const showReadingListButton =
    user !== null &&
    user !== undefined &&
    blog?.userId !== user.id &&
    !(await isOnReadingList(user.id, Number(id)));

  return (
    <div data-testid="blog-detail" className="max-w-2xl mx-auto p-6">
      <h1 data-testid="blog-title" className="mb-4 text-3xl font-bold">{blog?.title}</h1>

      <div className="space-y-1 mb-6">
        <p>
          <span className="text-gray-400">Author:</span>{" "}
          <span data-testid="blog-author">{blog?.author}</span>
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

      <div className="flex items-center gap-2">
        <form action={likeBlogAction}>
          <input type="hidden" name="id" value={blog?.id} />
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Like
          </button>
        </form>

        {showReadingListButton && (
          <form action={addToReadingListAction}>
            <input type="hidden" name="blogId" value={blog?.id} />
            <button
              type="submit" data-testid="add-to-reading-list-button"
              className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              add to reading list
            </button>
          </form>
        )}
      </div>
    </div>
  );
}