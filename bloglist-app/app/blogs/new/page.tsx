"use client";

import { useActionState } from "react";
import { createBlog } from "../../actions/blogs";

export default function NewBlogPage() {
  const [state, formAction] = useActionState(createBlog, { error: "" });

  return (
    <div>
      <h1>New blog</h1>

      <form action={formAction}>
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

        {state.error && (
          <p style={{ color: "red" }}>{state.error}</p>
        )}
      </form>
    </div>
  );
}