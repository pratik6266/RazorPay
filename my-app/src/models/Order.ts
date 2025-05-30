import mongoose, { model, models, Schema } from "mongoose";

export interface Iorder {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  variant: {
    type: "Square" | "Wide" | "Portrait";
    price: number;
    license: "Personal" | "Commercial";
  };
  razorpayOrderId: string;
  razorpayPaymentId: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  downloadUrl?: string;
  previewUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new Schema<Iorder>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    requird: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  variant: {
    type: {
      type: String,
      required: true,
      enum: ["Square", "Wide", "Portrait"]
    },
    price: {
      type: Number,
      required: true,
    },
    license: {
      type: String,
      required: true,
      enum: ["Personal", "Commercial"]
    }
  },
  razorpayOrderId: {
    type: String,
    required: true,
  },
  razorpayPaymentId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  downloadUrl: {
    type: String,
  },
  previewUrl: {
    type: String,
  },
}, { timestamps: true });

export const Order = models?.Order || model<Iorder>('Order', orderSchema)