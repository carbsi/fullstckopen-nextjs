import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserWithBlogs } from "../../lib/users";

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  // haetaan dynaamisesta [username] reitistä
  const { username } = await params;

  const user = await getUserWithBlogs(username);

    // jos käyttäjää ei löydy tietokannasta
  if (!user) {
    notFound();
  }

  return (
    <div>
      <h1>{user.name}</h1>

      <p>Username: {user.username}</p>

      <h2>Blogs</h2>

      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;