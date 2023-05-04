import { Schema } from "mongoose";

export const NotificationSchema = new Schema({
  userId: Number,
  type: String,
  status: String,
  response: Object
}, { timestamps: true, collection: 'notifications'})