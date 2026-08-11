export const blogs = [
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

export const getBlogById = (id: string) => {
  return blogs.find((blog) => blog.id === id);

};

export const likeBlog = (id: string) => {
  const blog = blogs.find((blog) => blog.id === id);

  if (blog) {
    blog.likes += 1;
  }
};