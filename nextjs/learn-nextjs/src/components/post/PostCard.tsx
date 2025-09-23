export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <p className="text-gray-700 mb-3">{post.body}</p>
      <span className="text-sm text-gray-500">Post ID: {post.id}</span>
    </div>
  );
}
