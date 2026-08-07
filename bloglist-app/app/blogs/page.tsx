const blogs = [
  {
    id: "1",
    title: "title",
    author: "Jackie Chan",
    url: "https://jackie.com",
    likes: 7,
  },
  {
    id: "2",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
  },
];

export default function BlogsPage() {
  return (
    <div>
      <h1>Blogs</h1>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <strong>{blog.title}</strong> – {blog.author}
          </li>
        ))}
      </ul>
    </div>
  );
}