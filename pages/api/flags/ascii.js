import flags from "../../../data/flags";
import path from "path";
import svgToAscii from "../../../utils/svgToAscii";

export default async (req, res) => {
  const {
    query: { width },
  } = req;

  const asciiFlagsArray = await Promise.all(
    flags.map(async (flag) => {
      const image = await svgToAscii(flag.id, width);
      return image.toString();
    })
  );

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain; charset=us-ascii");
  res.setHeader("Vary", "Accept-Encoding");
  res.end(asciiFlagsArray.join(""));
  return;
};
