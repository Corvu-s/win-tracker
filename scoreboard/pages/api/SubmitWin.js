import prisma from "../../lib/prisma";

export default async function submitWin(req, res) {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const { game } = req.query;
        const { name } = req.query;

        const newWin = await prisma.reccords.create({
          data: {
            game: game,
            name: name,
          },
        });
        return res.status(200).json(newWin, { success: true });
      } catch (error) {
        console.error("Request error", error);
        res.status(500).json({ error: "Error saving win", success: false });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
