import Author from "./models/Author.js";

// Read
export const getAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);

    if (!author) {
      return res.status(404).json({ msg: "Author not found" });
    }

    res.status(200).json(author);
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};
