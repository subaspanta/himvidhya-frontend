export default async function HomePage() {
  const health = await fetch("http://localhost:5000/health").then((res) =>
    res.json(),
  );

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Chat App</h1>
      <pre className="mt-4 bg-gray-100 p-4 rounded">
        {JSON.stringify(health, null, 2)}
      </pre>
    </div>
  );
}
