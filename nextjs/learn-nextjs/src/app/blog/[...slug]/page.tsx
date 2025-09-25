export default async function CatchAllRoute({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { sulg } = await params;
  return (
    <div>
      <h1>Catch all route</h1>
    </div>
  );
}
