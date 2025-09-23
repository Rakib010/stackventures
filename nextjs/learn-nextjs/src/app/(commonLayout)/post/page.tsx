import PostCard, { Post } from "@/components/post/PostCard";

export default async function PostPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: {
      revalidate: 30,
    },
  });
  const post = await res.json();
  console.log(post);
  return (
    <div>
      <h1>All Post </h1>
      <div className="grid grid-cols-3 w-[90%] mx-auto">
        {post?.map((post: Post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}
