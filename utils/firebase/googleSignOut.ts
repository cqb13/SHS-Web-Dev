import { signOut } from "firebase/auth";
import { auth } from "@lib/firebase";

const googleSignOut = () => {
  signOut(auth);
};

export default googleSignOut;
