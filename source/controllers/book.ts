import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import Book from '../models/book';

const NAMESPACE = 'Book - Controller';

const createBook = (req: Request, res: Response, next: NextFunction) => {
    let { author, title } = req.body;

    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        author,
        title
    });

    return book.save()
        .then(result => {
            return res.status(200).json({
                book: result
            });
        })
        .catch(error => {
            return res.status(500).json({
                message: error.message,
                error
            });
        })

};

const getAllBooks = (req: Request, res: Response, next: NextFunction) => {
    Book.find()
        .exec()
        .then(results => {
            return res.status(200).json({
                books: results,
                count: results.length
            });
        })
        .catch(error => {
            return res.status(500).json({
                message: error.message,
                error
            })
        })
};

export default { createBook, getAllBooks };
