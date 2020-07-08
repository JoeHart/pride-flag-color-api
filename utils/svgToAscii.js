import ascii from "ascii-art";

const DEFAULT_FLAG_WIDTH = 20;

export default async function svgToAscii(flagId, width) {
  // Required to render the ascii flags in truecolor
  ascii.Image.Color.is256 = true;
  ascii.Image.Color.isTrueColor = true;
  console.error(process.cwd());
  console.error(`${process.cwd()}/data/flags/svg/${flagId}.svg`);
  try {
    const image = await ascii.Image.create({
      filepath: `${process.cwd()}/data/flags/svg/${flagId}.svg`,
      width: width != null ? parseInt(width) : DEFAULT_FLAG_WIDTH,
      alphabet: "solid",
      background: true,
    });

    return image;
  } catch (e) {
    throw new Error({
      error: e,
      path: `${process.cwd()}/data/flags/svg/${flagId}.svg`,
    });
  }
}
