import { createBlog } from "../../actions/blogs";

export default function NewBlogPage() {
  return (
    <div>
      <h1>New blog</h1>

      <form action={createBlog}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            className="border border-gray-400 p-1"
          />
        </div>

        <div>
          <label htmlFor="author">Author</label>
          <input
            id="author"
            name="author"
            type="text"
            className="border border-gray-400 p-1"
          />
        </div>

        <div>
          <label htmlFor="url">URL</label>
          <input
            id="url"
            name="url"
            type="text"
            className="border border-gray-400 p-1"
          />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}