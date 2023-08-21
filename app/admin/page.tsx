'use client'

import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import userIsAdmin from "@/utils/firebase/userIsAdmin";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";

interface User {
  uid: string;
  name: string;
  email: string;
  member: boolean;
  isOwner: boolean;
  isAdmin: boolean;
}

export default function AdminPage() {
  const router = useRouter();
  const [userList, setUserList] = useState<User[]>([]);
  const [filteredUserList, setFilteredUserList] = useState<User[]>(userList);

  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/");
    } else {
        userIsAdmin(auth.currentUser).then(isAdmin => {
            if (isAdmin != true) {
                router.push("/");
            }
        });
    }

    const users = collection(db, "users");
    getDocs(users)
      .then(querySnapshot => {
        const data: any = [];
        querySnapshot.forEach(doc => {
          data.push(doc.data());
        });
        setUserList(data);
        setFilteredUserList(data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }, [router]);

  const updateUsersMemberStatus = (user: any) => {
    if (user.uid === auth.currentUser?.uid) {
        return;
    }

    const updatedUserList = userList.map(u => {
      if (u.uid === user.uid) {
        return { ...u, member: !u.member };
      }
      return u;
    });

    setUserList(updatedUserList);

    const userRef = doc(db, "users", user.uid);
    const newMemberStatus = !user.member;
    setDoc(
      userRef,
      {
        member: newMemberStatus
      },
      { merge: true }
    ).catch(error => {
      console.error("Error writing document: ", error);
    });
  };

  const searchUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredUsers = userList.filter(user => {
      return user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm);
    });
    setFilteredUserList(filteredUsers);
  };

  return (
    <main className="flex flex-col flex-1 px-4 py-2">
      <section className="w-3/5 rounded-md px-4 py-2 bg-light h-96">
        <h1 className="text-center text-lg">User Management</h1>
        <input type="text" placeholder="Search Users" className="bg-highlight p-2 rounded-lg w-full placeholder:text-dark focus:outline-none" onChange={searchUsers}/>
        <div className="flex flex-col gap-2 mt-2 overflow-y-scroll h-72">
          {filteredUserList.map((user: any) =>
            <div key={user.uid} className=" bg-highlight p-2 rounded-lg">
              <h2 className="px-1">
                {user.name}
              </h2>
              <p className="px-1">
                {user.email}
              </p>
              <p className="px-1">
                {user.member ? "Member" : "Not Member"}
              </p>
              <button onClick={() => updateUsersMemberStatus(user)} className="px-1 rounded-md hover:bg-light active:tracking-wider transition-all ease-in-out">
                {user.member ? "Remove Member" : "Add Member"}
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
