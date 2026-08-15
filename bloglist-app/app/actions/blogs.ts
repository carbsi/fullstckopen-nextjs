"use server";

import { addBlog, likeBlog } from "../lib/blogs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createBlog(
  prevState: { errors: Record<string, string>; values: { title: string; author: string; url: string } },
  formData: FormData,
) {

const title = (formData.get("title") as string)?.trim();
const author = (formData.get("author") as string)?.trim();
const url = (formData.get("url") as string)?.trim();
const errors: Record<string, string> = {}

if (!title || title.trim().length < 5) {
  errors.title = "Title must be at least 5 characters long";
}
if (!author || author.trim().length < 5) {
  errors.author = "Author must be at least 5 characters long";
}
if (!url || url.trim().length < 5) {
  errors.url = "Url must be at least 5 characters long";
}
// palautuu virheiden lisäksi käyttäjän syöttämät arvot jotta lomake voi täyttää kentät uudelleen eikä käyttäjän tarvitse kirjoittaa alusta
if (Object.keys(errors).length > 0) {
  return { errors, values: { title, author, url } }
}

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