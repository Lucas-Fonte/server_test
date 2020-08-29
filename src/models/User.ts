/* eslint-disable camelcase */
// @ts-nocheck
// eslint-disable-next-line no-unused-vars
import mongoose, { Document } from 'mongoose';

interface IUser extends Document {
  id?: string;
  name: string;
  email: string;
  password: string;
  last_activity: string;
  phones: [];
}

const PhoneSchema = new mongoose.Schema({
  phone_number: { type: Number, required: true },
  ddd: { type: Number, required: true },
});

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: { type: String, required: true },
    last_activity: { type: Date, required: true },
    phones: [{ type: PhoneSchema }],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const User = mongoose.model<IUser>('users', UserSchema);

export { User };
