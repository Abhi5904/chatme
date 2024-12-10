import { ObjectId } from 'mongoose';
import { IMediaSchema } from './media.types';

export interface IMessageSchema {
  senderId: ObjectId;
  receiverId: ObjectId;
  content: string;
  media: IMediaSchema[];
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}
