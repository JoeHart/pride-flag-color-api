import flags from "../../../../data/flags";
import svgToAscii from "../../../../utils/svgToAscii";
import path from "path";

export default async (req, res) => {
  const {
    query: { id, width },
  } = req;

  const flag = flags.find((r) => String(r.id) === String(id));

  if (flag) {
    const image = await svgToAscii(flag.id, width);

    if (process.env.NODE_ENV === "development") {
      console.log(
        `${flag.emoji != null ? flag.emoji : "🏳️‍🌈"} Delivering ${
          flag.name
        } Flag ASCII ART!`
      );
      console.log(image.toString());
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain; charset=us-ascii");
    res.setHeader("Vary", "Accept-Encoding");
    res.end(image.toString());
    return;
  }
  console.warn(`🏳️‍  Flag ${id} not found!`);
  res.status(404).send("Not found");
};