export default async function handler(req, res) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  if (req.method === "GET") {
    const search = req.query.search;
    try {
      const response = await fetch(
        `${baseUrl}/api/emails${search ? `?search=${search}` : ""}`
      );
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json([]);
    }
  } else if (req.method === "POST") {
    try {
      delete req.body.errors;
      const response = await fetch(`${baseUrl}/api/emails`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error creating email" });
    }
  }
}
