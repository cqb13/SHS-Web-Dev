"use client";

import { collection, getDoc, setDoc, doc } from "firebase/firestore";
import googleSignOut from "@/utils/firebase/googleSignOut";
import { useRouter, usePathname } from "next/navigation";
import googleSignIn from "@/utils/firebase/googleSignIn";
import { auth, db } from "@lib/firebase";
import useScroll from "@hooks/useScroll";
import { routes } from "@lib/routes";

import { useAuthContext } from "@/context/authContext";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthContext() as { user: any };

  const accountStatusToggle = () => {
    if (user) {
      googleSignOut();
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
        {user ? (
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
          {user ? "Sign Out" : "Sign In"}
        </button>
      </div>
      <div className='flex gap-2'>
        <a href='https://github.com/Website-Club' target='_blank'>
          <svg
            fill='#000000'
            width='30px'
            height='30px'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            data-name='Layer 1'
          >
            <path d='M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z' />
          </svg>
        </a>
        <a href='https://www.instagram.com/webapp_club/' target='_blank'>
          <svg
            fill='#000000'
            width='30px'
            height='30px'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            data-name='Layer 1'
          >
            <path d='M17.34,5.46h0a1.2,1.2,0,1,0,1.2,1.2A1.2,1.2,0,0,0,17.34,5.46Zm4.6,2.42a7.59,7.59,0,0,0-.46-2.43,4.94,4.94,0,0,0-1.16-1.77,4.7,4.7,0,0,0-1.77-1.15,7.3,7.3,0,0,0-2.43-.47C15.06,2,14.72,2,12,2s-3.06,0-4.12.06a7.3,7.3,0,0,0-2.43.47A4.78,4.78,0,0,0,3.68,3.68,4.7,4.7,0,0,0,2.53,5.45a7.3,7.3,0,0,0-.47,2.43C2,8.94,2,9.28,2,12s0,3.06.06,4.12a7.3,7.3,0,0,0,.47,2.43,4.7,4.7,0,0,0,1.15,1.77,4.78,4.78,0,0,0,1.77,1.15,7.3,7.3,0,0,0,2.43.47C8.94,22,9.28,22,12,22s3.06,0,4.12-.06a7.3,7.3,0,0,0,2.43-.47,4.7,4.7,0,0,0,1.77-1.15,4.85,4.85,0,0,0,1.16-1.77,7.59,7.59,0,0,0,.46-2.43c0-1.06.06-1.4.06-4.12S22,8.94,21.94,7.88ZM20.14,16a5.61,5.61,0,0,1-.34,1.86,3.06,3.06,0,0,1-.75,1.15,3.19,3.19,0,0,1-1.15.75,5.61,5.61,0,0,1-1.86.34c-1,.05-1.37.06-4,.06s-3,0-4-.06A5.73,5.73,0,0,1,6.1,19.8,3.27,3.27,0,0,1,5,19.05a3,3,0,0,1-.74-1.15A5.54,5.54,0,0,1,3.86,16c0-1-.06-1.37-.06-4s0-3,.06-4A5.54,5.54,0,0,1,4.21,6.1,3,3,0,0,1,5,5,3.14,3.14,0,0,1,6.1,4.2,5.73,5.73,0,0,1,8,3.86c1,0,1.37-.06,4-.06s3,0,4,.06a5.61,5.61,0,0,1,1.86.34A3.06,3.06,0,0,1,19.05,5,3.06,3.06,0,0,1,19.8,6.1,5.61,5.61,0,0,1,20.14,8c.05,1,.06,1.37.06,4S20.19,15,20.14,16ZM12,6.87A5.13,5.13,0,1,0,17.14,12,5.12,5.12,0,0,0,12,6.87Zm0,8.46A3.33,3.33,0,1,1,15.33,12,3.33,3.33,0,0,1,12,15.33Z' />
          </svg>
        </a>
      </div>
    </nav>
  );
}
