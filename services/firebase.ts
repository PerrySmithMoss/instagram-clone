import { doc } from "firebase/firestore"
import { db } from "../firebase"

export const createUserDocument = async (user: any, additionalData: any) => {
    if(!user) return 

    const usersRef = doc(db, `users/${user.uid}`)

    const snapshot = await usersRef
}