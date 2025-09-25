export default async function DynamicBlogPage({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  return (
    <div>
      <h1>dynamic blog page:{blogId}</h1>
    </div>
  );
}
