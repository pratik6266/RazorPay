import mongoose, { models, Schema, model, } from "mongoose";

export interface Iuser{
  email: string,
  password: string,
  role: 'user' | 'admin',
  _id?: mongoose.Types.ObjectId,
  createdAt?: Date, 
  updatedAt?: Date,
}

const userSchema = new Schema<Iuser>({
  email: {
    type: String,
    required: true,
    unique: true,
  }, 
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
}, {timestamps: true});

export const User = models?.User || model<Iuser>('User', userSchema);