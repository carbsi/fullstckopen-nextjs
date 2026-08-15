"use client";

import { useActionState } from "react";
import { createBlog } from "../../actions/blogs";

const initialState = {
  errors: {} as Record<string, string>,
  values: { title: "", author: "", url: "" },
};

export default function NewBlogPage() {
  const [state, formAction] = useActionState(createBlog, initialState);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">New blog</h1>

      <form action={formAction} className="flex flex-col gap-3 max-w-sm">
        <div>
          <label htmlFor="title" className="mr-2">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={state.values?.title}
            className="border border-gray-400 p-1"
          />
          {state.errors?.title && (
            <p style={{ color: "red" }}>{state.errors.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="author" className="mr-2">Author</label>
          <input
            id="author"
            name="author"
            type="text"
            // defaultValue eikä value kentät pysyvät hallitsemattomina jolloin niitä voi muokata ilman useState-tilaa ja käsittelijää
            defaultValue={state.values?.author}
            className="border border-gray-400 p-1"
          />
          {state.errors?.author && (
            <p style={{ color: "red" }}>{state.errors.author}</p>
          )}
        </div>

        <div>
          <label htmlFor="url" className="mr-2">URL</label>
          <input
            id="url"
            name="url"
            type="text"
            defaultValue={state.values?.url}
            className="border border-gray-400 p-1"
          />
          {state.errors?.url && (
            <p style={{ color: "red" }}>{state.errors.url}</p>
          )}
        </div>

        <button type="submit" className="border px-3 py-1 w-fit">
          Create
        </button>
      </form>
    </div>
  );
}