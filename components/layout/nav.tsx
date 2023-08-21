import { collection, getDoc, setDoc, doc } from "firebase/firestore";
import googleSignOut from "@/utils/firebase/googleSignOut";
import { useRouter, usePathname } from "next/navigation";
import googleSignIn from "@/utils/firebase/googleSignIn";
import { auth, db } from "@lib/firebase";
import useScroll from "@hooks/useScroll";
import { routes } from "@lib/routes";
import { useState } from "react";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [accountStatus, setAccountStatus] = useState(false);

  const accountStatusToggle = () => {
    if (auth.currentUser) {
      googleSignOut();
      setAccountStatus(false);
      if (pathname === "/account") {
        router.push("/");
      }
    } else {
      googleSignIn().then((user) => {
        if (!auth.currentUser) return;

        const users = collection(db, "users");
        const userRef = doc(users, user.uid);

        getDoc(userRef)
          .then((userDoc) => {
            if (!userDoc.exists()) {
              setDoc(userRef, {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                dateCreated: Date.now(),
                lastLogin: Date.now(),
                isAdmin: false,
                isMember: false,
                github: ""
              });
            } else {
              setDoc(
                userRef,
                {
                  lastLogin: Date.now()
                },
                { merge: true }
              );
            }
            setAccountStatus(true);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      });
    }
  };

  return (
    <nav
      className={`${
        useScroll(10) ? "shadow-bar backdrop-blur-md" : ""
      }  flex flex-row items-center justify-between px-4 py-2 sticky top-0 z-50 bg-dark transition-all`}
    >
      <div className='flex gap-4 flex-wrap items-center justify-center'>
        {routes.map(([name, path]) => (
          <button
            type='button'
            key={name}
            onClick={() => router.push(path)}
            className={`${
              pathname === path ? "bg-light" : ""
            } py-1 px-2 rounded-md text-lg hover:bg-light transition-all ease-in-out`}
          >
            {name}
          </button>
        ))}
        {accountStatus ? (
          <button
            type='button'
            onClick={() => router.push("/account")}
            className={`${
              pathname === "/account" ? "bg-light" : ""
            } py-1 px-2 rounded-md text-lg hover:bg-light transition-all ease-in-out`}
          >
            Account
          </button>
        ) : null}
        <button
          onClick={accountStatusToggle}
          className='py-1 px-2 rounded-md text-lg hover:bg-light transition-all ease-in-out'
        >
          {accountStatus ? "Sign Out" : "Sign In"}
        </button>
      </div>
    </nav>
  );
}
