import { Timestamp } from "firebase/firestore";

export interface Post {
  id: string
  caption: string;
  image: string;
  location: string;
  timestamp: Timestamp;
  uid: string;
  userAvatar: string;
  username: string;
}
