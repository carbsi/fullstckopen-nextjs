"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";

export const registerUser = async (
  prevState: { error: string },
  formData: FormData
) => {
  const username = (formData.get("username") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;

  // tarkistetaan rekisteröinnin ehdot ennen tietokantaan kirjoittamista
  if (!username || username.length < 4) {
    return { error: "Username must be at least 4 characters long" };
  }

  if (!password || password.length < 4) {
    return { error: "Password must be at least 4 characters long" };
  }

  if (password !== passwordConfirm) {
    return { error: "Passwords do not match" };
  }
// tarkistus ettei samalla käyttäjänimellä ole jo käyttäjää
  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (existingUser) {
    return { error: "Username is already taken" };
  }

// kerroin 10 yleisenä oletuksena, koska se on riittävän hidas estämään
// brute-force hyökkäyksiä, muttei liian hidas ärsyttämään
// jos haluaa lisätä turvallisuutta täytyy kasvattaa kerrointa, mutta se hidastaa myös kirjautumista
  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    username,
    name,
    passwordHash,
  });

  redirect("/login")
};