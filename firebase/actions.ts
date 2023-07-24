import { DocumentSnapshot, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { UserDetails } from "@/common.types";

export const getUserDetails = async (
  email: string
): Promise<UserDetails | null> => {
  const userCollectionRef = doc(db, "userCollection", email);
  const userSnapshot: DocumentSnapshot = await getDoc(userCollectionRef);
  if (userSnapshot.exists()) {
    const userData = userSnapshot.data() as UserDetails;
    return userData;
  } else {
    return null;
  }
};

export const createNewUser = async (userData: UserDetails) => {
  const userRef = doc(db, "userCollection", userData.email);
  await setDoc(userRef, userData);
};
