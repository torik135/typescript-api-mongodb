import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/user";
import logging from "../config/logging";

const UserSchema: Schema = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

UserSchema.post<IUser>('save', () => {
    logging.info('Mongo', 'User saved', this);
});

export default mongoose.model<IUser>('User', UserSchema);