import { Timestamp } from 'firebase/firestore';

export type Todo = {
  id: string;
  header: string;
  description: string;
  completionDate: Date | Timestamp | Time;
  category: string;
  completed?: boolean;
  attachments?: any;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Time = {
  seconds: any;
};

export type TodoReturnType = {
  id: string;
  header: string;
  description: string;
  completionDate: Time;
  category: string;
  completed: boolean;
  attachments: any;
  createdAt: Date;
  updatedAt: Date;
};

export enum HandleSubmitType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}
