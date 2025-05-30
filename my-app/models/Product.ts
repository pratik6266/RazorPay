import mongoose, { model, models, Schema } from "mongoose";

export interface Iimage{
  type: 'Square' | 'Wide' | 'Portrait',
  price: Number,
  license: 'Personal' | 'Commercial',
}

const imageSchema = new Schema<Iimage>({
  type: {
    type: String,
    required: true,
    enum: ["Square", "Wide", "Portrait"]
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  license: {
    type: String,
    required: true,
    enum: ["Personal", "Commercial"]
  }
});

export interface Iproduct{
  name: string,
  description: string,
  imageUrl: string,
  varient: Iimage[],
  _id?: mongoose.Types.ObjectId,
  createdAt?: Date,
  updatedAt?: Date,
}

const productSchema = new Schema<Iproduct>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  varient: {
    type: [imageSchema],
  }
}, { timestamps: true });

export const Product = models?.Product || model<Iproduct>('Product', productSchema);