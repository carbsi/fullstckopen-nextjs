import { NextRequest, NextResponse } from "next/server"
import { getUserByToken } from "../../services/users"

export const GET = async (req: NextRequest) => {
  const authHeader = req.headers.get("authorization")

  if (!authHeader?.startsWith("Bearer ")) {
        // vastaus käsin koska user olio sellaisenaan voisi vuotaa tietokannan pwd hashin ja tokenin, 
        // joten palautetaan vain virheviesti ilman käyttäjätietoja
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

        // Bearer on 7 merkkiä, leikataan jotta saadaan token ilman Bearer osaa
  const token = authHeader.substring(7)

  const user = await getUserByToken(token)

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json({
    id: user.id,
    username: user.username,
    name: user.name,
    createdBlogs: user.blogs.map((blog) => ({
      author: blog.author,
      title: blog.title,
      url: blog.url,
    })),
  })
}