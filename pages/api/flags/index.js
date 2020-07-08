import flags from "../../../data/flags";

export default (req, res) => {
  const {
    query: { search },
  } = req;

  if (search) {
    res.send(
      flags.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()))
    );
    return;
  }
  res.status(200).json(flags);
};
