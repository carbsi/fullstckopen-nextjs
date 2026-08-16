"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getCurrentUser } from "../services/session"
import { addToReadingList } from "../services/readinglist"
import { markAsRead } from "../services/readinglist"

export const addToReadingListAction = async (formData: FormData) => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const blogId = Number(formData.get("blogId"))
  await addToReadingList(user.id, blogId)

  revalidatePath(`/blogs/${blogId}`)
  revalidatePath("/me")
}

export const markAsReadAction = async (formData: FormData) => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const entryId = Number(formData.get("entryId"))
  await markAsRead(user.id, entryId)

  revalidatePath("/me")
}