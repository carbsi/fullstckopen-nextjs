"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { db } from "../../db";
import { users } from "../../db/schema";

export const registerUser = async (formData: FormData) => {
  const username = (formData.get("username") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const password = formData.get("password") as string;

// kerroin 10 yleisenä oletuksena, koska se on riittävän hidas estämään
// brute-force hyökkäyksiä, muttei liian hidas ärsyttämään
// jos haluaa lisätä turvallisuutta täytyy kasvattaa kerrointa, mutta se hidastaa myös kirjautumista
  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({ username, name, passwordHash });

  redirect("/login")
};