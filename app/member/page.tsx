'use client'

import { auth, db } from "@lib/firebase";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import userIsMember from "@/utils/firebase/userIsMember";
import { useRouter } from "next/router";
import User from "@/types/user";
import Image from "next/image";

export default function MemberPage() {
  //const router = useRouter();
  const [pfp, setPfp] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(
    () => {
      //if (!auth.currentUser) {
      //  router.push("/");
      //} else {
      //  userIsMember(auth.currentUser).then(isMember => {
      //    if (isMember != true) {
      //      router.push("/");
      //    }
      //  });
      //}

      setPfp(auth.currentUser?.photoURL || "");
        setName(auth.currentUser?.displayName || "");
    },
    []
  );

  return (
    <main className="flex flex-col flex-1 items-center">
      <Image src={pfp.replaceAll("s96-c", "s500-c")} alt={`${name}'s pfp`} width={400} height={400} className="rounded-full mt-2"/>
        <h1 className="text-3xl px-4 py-2">Welcome to SHS Web Dev Club, {name}</h1>
        <div className="w-4/5 flex gap-4">
            <section className="flex flex-col gap-2 bg-light px-4 py-2 rounded-lg flex-1">
                <p>To make you membership public, enter your Github username bellow.</p>
                <input type="text" placeholder="Github Username" className="bg-highlight p-2 rounded-lg w-full placeholder:text-dark focus:outline-none"/>
                {/*get users doc, if they have a github link there, get the name, and make it value here*/}
                <button className="bg-highlight p-2 rounded-md hover:opacity-90 hover:rounded-lg w-full placeholder:text-dark focus:outline-none transition-all ease-in-out">Submit</button>
                <div className="flex gap-2">
                    <button className="bg-red-500 hover:bg-red-400 hover:rounded-lg p-2 flex-1 rounded-md placeholder:text-dark focus:outline-none transition-all ease-in-out">Leave Club</button>
                    <button className="bg-red-500 hover:bg-red-400 hover:rounded-lg p-2 flex-1 rounded-md placeholder:text-dark focus:outline-none transition-all ease-in-out">Delete Account</button>
                </div>
            </section>
            <section className="flex flex-col gap-2 bg-light px-4 py-2 rounded-lg">
                <p>Here are some resources to get you started:</p>
                <a href="https://www.w3schools.com/html/default.asp" target="_blank" rel="noopener noreferrer" className="bg-highlight p-2 rounded-md hover:rounded-lg w-full placeholder:text-dark focus:outline-none hover:opacity-90 transition-all ease-in-out">HTML</a>
                <a href="https://www.w3schools.com/css/default.asp" target="_blank" rel="noopener noreferrer" className="bg-highlight p-2 rounded-md hover:rounded-lg w-full placeholder:text-dark focus:outline-none hover:opacity-90 transition-all ease-in-out">CSS</a>
                <a href="https://www.w3schools.com/js/default.asp" target="_blank" rel="noopener noreferrer" className="bg-highlight p-2 rounded-md hover:rounded-lg w-full placeholder:text-dark focus:outline-none hover:opacity-90 transition-all ease-in-out">JavaScript</a>
            </section>
        </div>
    </main>
  );
}
