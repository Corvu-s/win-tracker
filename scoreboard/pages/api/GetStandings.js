import prisma from "../../lib/prisma";

export default async function getStandings(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        let fs =
          await prisma.$queryRaw`SELECT name,COUNT(id) FROM reccords where game="Four Souls" GROUP BY name ORDER BY COUNT(id) DESC`;
        //  fs = fs.replace("COUNT(id)", "count");
        let munch =
          await prisma.$queryRaw`SELECT name,COUNT(id) FROM reccords where game="Munchkin" GROUP BY name ORDER BY COUNT(id) DESC`;
        //munch = munch.replace("COUNT(id)", "count");

        let catan =
          await prisma.$queryRaw`SELECT name,COUNT(id) FROM reccords where game="Setlers of Catan" GROUP BY name ORDER BY COUNT(id) DESC`;
        //  catan = catan.replace("COUNT(id)", "count");

        let mars =
          await prisma.$queryRaw`SELECT name,COUNT(id) FROM reccords where game="Terraforming Mars" GROUP BY name ORDER BY COUNT(id) DESC`;
        //mars = mars.replace("COUNT(id)", "count");

        let wingspan =
          await prisma.$queryRaw`SELECT name,COUNT(id) FROM reccords where game="Wingspan" GROUP BY name ORDER BY COUNT(id) DESC`;
        //wingspan = wingspan.replace("COUNT(id)", "count");

        const result = [
          { name: "Four Souls", data: fs },
          { name: "Munchkin", data: munch },
          { name: "Setlers of Catan", data: catan },
          { name: "Terraforming Mars", data: mars },
          { name: "Wingspan", data: wingspan },
        ];

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
