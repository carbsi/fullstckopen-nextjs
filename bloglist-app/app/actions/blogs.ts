"use server";

import { addBlog, likeBlog } from "../lib/blogs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createBlog(formData: FormData) {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  await addBlog(title, author, url);

  revalidatePath("/blogs");
  redirect("/blogs");
}

export async function likeBlogAction(formData: FormData) {
  const id = Number(formData.get("id"));

  await likeBlog(id);

  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
}