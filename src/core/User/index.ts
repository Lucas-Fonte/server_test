// eslint-disable-next-line no-unused-vars
import { Document } from 'mongoose';

export interface UserData extends Document {
  name: string;
  email: string;
  password: string;
  phones?: [];
}

export interface UserSession extends Request {
  userId: string;
}
