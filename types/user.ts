export interface User {
  uid: string;
  email: string | null;
  password?: string;
  fullName:  string | null;
  username: string | null;
  photoURL: string | null
}
