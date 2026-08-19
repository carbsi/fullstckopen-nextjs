"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";
import { getCurrentUser } from "../services/session";

export const registerUser = async (
  prevState: {
    errors: Record<string, string>;
    values: { username: string; name: string };
  },
  formData: FormData
) => {
  const username = (formData.get("username") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;

  // kerätään kaikki virheet olioon, jotta käyttäjä näkee ne kerralla
  // kenttiensä vieressä eikä yksi kerrallaan
  const errors: Record<string, string> = {};

  if (!username || username.length < 4) {
    errors.username = "Username must be at least 4 characters long";
  }

  if (!password || password.length < 4) {
    errors.password = "Password must be at least 4 characters long";
  }

  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match";
  }

  // tietokantakysely vasta muiden tarkistusten jälkeen
  if (!errors.username) {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (existingUser) {
      errors.username = "Username is already taken";
    }
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name } };
  }

  // kerroin 10 yleisenä oletuksena: riittävän hidas estämään brute-force
  // hyökkäyksiä, muttei niin hidas että kirjautuminen kärsii
  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    username,
    name,
    passwordHash,
  });

  redirect("/login");
};

export const generateToken = async () => {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }

  const token = crypto.randomUUID()

  await db.update(users).set({ token }).where(eq(users.id, user.id))

  revalidatePath("/me")
}