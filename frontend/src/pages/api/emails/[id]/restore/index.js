export default async function handler(req, res) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const response = await fetch(`${baseUrl}/api/emails/${id}/restore`, {
        method: "PUT",
      });
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error restoring email" });
    }
  }
}
