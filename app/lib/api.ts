export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function checkServer() {
  const res = await fetch(`${API_URL}/health`);
  return res.json();
}
