import prisma from "../../lib/prisma";

export default async function getReccords(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const result = await prisma.$queryRaw`SELECT * FROM reccords`;
        return res.status(200).json(result, { success: true });
      } catch (error) {
        console.error("Request error", error);
        res
          .status(500)
          .json({ error: "Error getting reccords", success: false });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
