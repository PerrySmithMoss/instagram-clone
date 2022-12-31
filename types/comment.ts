import { Timestamp } from "firebase/firestore";

export interface IComment {
  comment: string;
  id: string;
  timestamp: Timestamp;
  uid: string;
  userAvatar: string;
  username: string;
}
