export default async function handler(req, res) {
  const { id } = req.query;
  // call orchestrator or local service
  // placeholder implementation
  res.status(200).json({ message: `Triggered AI generation for ${id}` });
}
