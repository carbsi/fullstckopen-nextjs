"use server";

import { blogs } from "../lib/blogs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createBlog(formData: FormData) {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  const newBlog = {
    id: String(blogs.length + 1),
    title,
    author,
    url,
    likes: 0,
  };

  blogs.push(newBlog);

  revalidatePath("/blogs");

  redirect("/blogs");
}