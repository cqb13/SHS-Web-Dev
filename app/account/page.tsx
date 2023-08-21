'use client'

import { collection, getDocs, setDoc, getDoc, doc } from "firebase/firestore";
import userIsAdmin from "@/utils/firebase/userIsAdmin";
import userIsMember from "@/utils/firebase/userIsMember";
import deleteAccount from "@/utils/firebase/deleteAccount";
import ActionPopup from "@/components/general/actionPopup";
import ErrorPopup from "@/components/general/errorPopup";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import User from "@/types/user";
import Image from "next/image";

import { useAuthContext } from "@/context/authContext";

export default function Account() {
  const router = useRouter();
  const { user } = useAuthContext() as { user: any };
  const [userList, setUserList] = useState<User[]>([]);
  const [filteredUserList, setFilteredUserList] = useState<User[]>(userList);

  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState("");
  const [pfp, setPfp] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMember, setIsMember] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  const [popupShown, setPopupShown] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupExpectedInput, setPopupExpectedInput] = useState("");
  const [popupConfirmText, setPopupConfirmText] = useState("");
  const [popupCancelText, setPopupCancelText] = useState("");
  const [popupOnConfirm, setPopupOnConfirm] = useState(() => {});
  const [popupOnCancel, setPopupOnCancel] = useState(() => {});

  useEffect(() => {
    if (user == null) {
      router.push("/");
    } else {
      userIsAdmin(auth.currentUser).then((isAdmin) => {
        if (isAdmin) {
          setIsAdmin(true);
          const users = collection(db, "users");
          getDocs(users)
            .then((querySnapshot) => {
              const data: any = [];
              querySnapshot.forEach((doc) => {
                data.push(doc.data());
              });
              setUserList(data);
              setFilteredUserList(data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      });

      userIsMember(auth.currentUser).then((isMember) => {
        if (isMember) {
          setIsMember(true);
        }
      });

      const userRef = doc(collection(db, "users"), auth.currentUser?.uid || "");
      getDoc(userRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data) {
              setUsername(data.github || "");
            }
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      setPfp(auth.currentUser?.photoURL || "");
      setName(auth.currentUser?.displayName || "");
    }
  }, [user, router]);

  const updateUsername = (e: any) => setUsername(e.target.value);

  const updateGithub = () => {
    setError(false);
    setErrorMessage("");

    if (username === "") {
      const userRef = doc(collection(db, "users"), auth.currentUser?.uid || "");
      setDoc(
        userRef,
        {
          github: ""
        },
        { merge: true }
      );
      return;
    }

    fetch(`https://api.github.com/users/${username}`).then((res) => {
      if (res.status === 404) {
        setError(true);
        setErrorMessage("Invalid Github username");
        setUsername("");
      } else {
        const userRef = doc(
          collection(db, "users"),
          auth.currentUser?.uid || ""
        );
        setDoc(
          userRef,
          {
            github: username
          },
          { merge: true }
        );
      }
    });
  };

  const updateUsersMemberStatus = (user: any) => {
    if (user.uid === auth.currentUser?.uid) {
      return;
    }

    const updatedUserList = userList.map((u) => {
      if (u.uid === user.uid) {
        return { ...u, isMember: !u.isMember };
      }
      return u;
    });

    setUserList(updatedUserList);

    const userRef = doc(db, "users", user.uid);
    const newMemberStatus = !user.isMember;
    setDoc(
      userRef,
      {
        isMember: newMemberStatus
      },
      { merge: true }
    ).catch((error) => {
      console.error("Error writing document: ", error);
    });
  };

  const searchUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredUsers = userList.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
      );
    });
    setFilteredUserList(filteredUsers);
  };

  const updateError = (value: boolean) => setError(value);

  const deleteAccountHandler = () => {
    deleteAccount(auth.currentUser)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const leaveClubHandler = () => {
    setPopupShown(true);
    setPopupTitle("Confirm Leave Club");
    setPopupMessage(
      "Are you sure you want to leave the club? This cannot be undone."
    );
    setPopupExpectedInput("I understand");
    setPopupConfirmText("Leave Club");
    setPopupCancelText("Cancel");
    leaveClub();
  };

  const leaveClub = () => {
    setPopupShown(false);
    const userRef = doc(collection(db, "users"), auth.currentUser?.uid || "");
    setDoc(
      userRef,
      {
        github: "",
        isMember: false
      },
      { merge: true }
    );
    router.push("/");
  };

  return (
    <main className='flex flex-col flex-1 px-4 py-2 items-center gap-4'>
      <Image
        src={pfp.replaceAll("s96-c", "s500-c")}
        alt={`${name}'s pfp`}
        width={400}
        height={400}
        className='rounded-full mt-2'
      />
      <h1 className='text-3xl px-4 py-2 text-center'>
        {`${isMember? "Welcome to the club, " : "Hello, "} ${name}!`}
      </h1>
      <div className='w-4/5 flex gap-4 max-md-lg:flex-col'>
        <section className='flex flex-col gap-2 bg-light px-4 py-2 rounded-lg flex-1'>
          {/*TODO: add github auth to do this*/}
          {isMember || isAdmin ? (
            <>
              <p>
                To make you membership public, enter your Github username
                bellow.
              </p>
              <input
                type='text'
                placeholder='Github Username'
                onChange={updateUsername}
                value={username}
                className='bg-highlight p-2 rounded-lg w-full placeholder:text-dark focus:outline-none'
              />
              <button
                className='bg-highlight p-2 rounded-md hover:opacity-90 hover:rounded-lg w-full placeholder:text-dark focus:outline-none transition-all ease-in-out'
                onClick={updateGithub}
              >
                Submit
              </button>
            </>
          ) : null}
          <div className='flex gap-2'>
            {isMember || isAdmin ? (
              <button
                onClick={leaveClubHandler}
                className='bg-red-500 hover:bg-red-400 hover:rounded-lg p-2 flex-1 rounded-md placeholder:text-dark focus:outline-none transition-all ease-in-out'
              >
                Leave Club
              </button>
            ) : null}
            <button className='bg-red-500 hover:bg-red-400 hover:rounded-lg p-2 flex-1 rounded-md placeholder:text-dark focus:outline-none transition-all ease-in-out'>
              Delete Account
            </button>
          </div>
        </section>
        {isMember || isAdmin ? (
          <section className='flex flex-col gap-2 bg-light px-4 py-2 rounded-lg'>
            <p>Here are some resources to get you started:</p>
            <a
              href='https://www.w3schools.com/html/default.asp'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-highlight p-2 rounded-md hover:rounded-lg w-full focus:outline-none hover:opacity-90 transition-all ease-in-out'
            >
              HTML
            </a>
            <a
              href='https://www.w3schools.com/css/default.asp'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-highlight p-2 rounded-md hover:rounded-lg w-full focus:outline-none hover:opacity-90 transition-all ease-in-out'
            >
              CSS
            </a>
            <a
              href='https://www.w3schools.com/js/default.asp'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-highlight p-2 rounded-md hover:rounded-lg w-full focus:outline-none hover:opacity-90 transition-all ease-in-out'
            >
              JavaScript
            </a>
          </section>
        ) : null}
      </div>
      {isAdmin ? (
        <section className='w-4/5 rounded-md px-4 py-2 bg-light h-96'>
          <h1 className='text-center text-lg'>User Management</h1>
          <input
            type='text'
            placeholder='Search Users'
            className='bg-highlight p-2 rounded-lg w-full placeholder:text-dark focus:outline-none'
            onChange={searchUsers}
          />
          <div className='flex flex-col gap-2 mt-2 overflow-y-scroll h-72'>
            {filteredUserList.map((user: any) => (
              <div key={user.uid} className=' bg-highlight p-2 rounded-lg'>
                <h2 className='px-1'>{user.name}</h2>
                <p className='px-1'>{user.email}</p>
                <p className='px-1'>
                  {user.isMember ? "Member" : "Not Member"}
                </p>
                <button
                  onClick={() => updateUsersMemberStatus(user)}
                  className='px-1 rounded-md hover:bg-light active:tracking-wider transition-all ease-in-out'
                >
                  {user.isMember ? "Remove Member" : "Add Member"}
                </button>
              </div>
            ))}
          </div>
        </section>
      ) : null}
      {popupShown ? (
        <ActionPopup
          title={popupTitle}
          message={popupMessage}
          inputVisible={true}
          expectedInput={popupExpectedInput}
          confirmText={popupConfirmText}
          cancelText={popupCancelText}
          onConfirm={() => setPopupShown(false)}
          onCancel={() => setPopupShown(false)}
        />
      ) : null}
      {error ? (
        <ErrorPopup
          title='Error'
          message={errorMessage}
          timeout={5000}
          updateError={updateError}
        />
      ) : null}
    </main>
  );
}
