"use client";

import MemberCard from "@/components/about/memberCard";
import { collection, getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";

type MemberCardProps = {
  name: string;
  icon: string;
  github: string;
};

export default function About() {
  const [members, setMembers] = useState([]);
  const [memberCardInfo, setMemberCardInfo] = useState<MemberCardProps[]>([]);

  useEffect(() => {
    getMembers();
  }, []);

  useEffect(() => {
    const data: MemberCardProps[] = [];
    members.forEach((member) => {
      if (member == "") {
        return;
      }
      data.push({
        name: member,
        icon: `https://github.com/${member}.png?size=96`,
        github: `https://github.com/${member}`
      });
    });
    setMemberCardInfo(data);
  }, [members]);

  const getMembers = () => {
    const users = collection(db, "users");
    getDocs(users)
      .then((querySnapshot) => {
        const data: any = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data().github);
        });
        setMembers(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <main className='flex flex-col flex-1'>
      <section className='flex flex-col items-center'>
        <h1 className='text-5xl font-medium'>Members</h1>
        <hr className='w-4/5' />
        <div className='flex gap-4 m-4'>
          {memberCardInfo.map((member) => (
            <MemberCard
              key={member.name}
              name={member.name}
              icon={member.icon}
              github={member.github}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
