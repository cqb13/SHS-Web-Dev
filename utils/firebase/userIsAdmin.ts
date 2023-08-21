import { getDoc, doc } from "firebase/firestore";
import { db } from "@lib/firebase";

export default async function userIsAdmin(user: any) {
  const userRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    const userData = userDoc.data();
    return userData.isAdmin;
  } else {
    return false;
  }
}
