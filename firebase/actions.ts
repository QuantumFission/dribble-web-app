import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";


export const getUserDetails = async (id: string) => {
  const userCollectionRef = doc(db, "userCollection", id);
  const user = await getDoc(userCollectionRef);
  return user;
};
