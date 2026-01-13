export default async function handler(req, res) {
  const query = req.query.q || "dog";

  try {
    const apiRes = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`,
      { headers: { Authorization: process.env.PEXELS_API_KEY } }
    );

    const data = await apiRes.json();

    if (!data.photos?.length) {
      return res.status(404).json({ error: "No image found" });
    }

    res.status(200).json({ image: data.photos[0].src.large });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
