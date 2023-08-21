import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(getAuth(), provider);
  const user = result.user;
  return user;
};

export default signInWithGoogle;
