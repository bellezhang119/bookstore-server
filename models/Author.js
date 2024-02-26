import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
        },
        authorName: {
            type: String,
            required: true,
        },
        biography: {
            type: String,
        },
    },
    { timestamps: true }
);

const Author = mongoose.model("Author", AuthorSchema);
export default Author;