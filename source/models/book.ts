import mongoose, { Schema } from "mongoose";
import IBook from "../interfaces/book";
import logging from "../config/logging";

const BookSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        extraInformation: { type: String }
    },
    {
        timestamps: true
    }
);

BookSchema.post<IBook>('save', () => {
    logging.info('Mongo', 'Book saved', this);
});

export default mongoose.model<IBook>('Book', BookSchema);