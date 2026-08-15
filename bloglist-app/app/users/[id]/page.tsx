import { notFound } from "next/navigation";
import { getUserById } from "../../lib/users";

const UserPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const user = await getUserById(Number(id));

  if (!user) {
    notFound();
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Username: {user.username}</p>
    </div>
  );
};

export default UserPage;