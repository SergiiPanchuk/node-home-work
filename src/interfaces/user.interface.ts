import { Document } from "mongoose";

export interface IUser extends Document {
  userName: string;
  email: string;
  age: number;
  password: string;
  name?: string;
}
