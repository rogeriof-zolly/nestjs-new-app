import { Document } from "mongoose";

export interface Notification extends Document {
  userId: number,
  status: 'SUCCESS' | 'ERROR',
  type: 'sms' | 'email',
  response: any
}