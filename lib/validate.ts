import { db } from "@/firebase/firebase";
import { collection, doc, getDoc } from "firebase/firestore";

export const UserValidate = async (email: any) => {
  try {
    const userRef = doc(db, "userCollection", email);
    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

export const isUserAvailable = async (email: string) => {
  try {
    const userRef = doc(db, "userCollection", email);
    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) {
      return snapshot.data();
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};
