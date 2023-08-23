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
          if (doc.data().github == "" || doc.data().isMember == false) {
            return;
          }

          data.push(doc.data().github);
        });
        setMembers(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <main className='flex flex-col flex-1 py-2 px-4 items-center'>
      <h1 className='text-3xl font-semibold text-center'>
        The SHS Web Dev Club
      </h1>
      <section className="flex w-4/5 gap-2 h-32 mt-4">
        <div className="bg-light py-2 px-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-1">Goals & Objectives</h2>
          <p>We aim to provide you with hands-on experience in web development.</p>
        </div>
        <div className="bg-light py-2 px-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-1">Meetings</h2>
          <p>We meet twice a month after school, on Wednesdays, in room 2411. Our meetings last from 30minutes to an hour.</p>
        </div>
      </section>
      <section className="flex w-4/5 gap-2 mt-2">
        <div className="bg-light py-2 px-4 rounded-lg flex-1">
          <h2 className="text-xl font-semibold mb-1">Technologies</h2>
          <ul className="px-2">
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript & TypeScript</li>
            <li>React & NextJS</li>
            <li>VueJS</li>
            <li>Git</li>
            <li>More...</li>
          </ul>
        </div>
        <div className="bg-light py-2 px-4 rounded-lg flex-1">
          <h2 className="text-xl font-semibold mb-1">Activities</h2>
          <ul className="px-2">
            <li>Develope Websites</li>
            <li>Partake in Hackathons</li>
            <li>Learn Web Hosting</li>
            <li>More...</li>
          </ul>
        </div>
        <div className="bg-light py-2 px-4 rounded-lg flex-1">
          <h2 className="text-xl font-semibold mb-1">Activities</h2>

        </div>
      </section>
      <h1 className='text-3xl m-2 w-4/5 pl-4'>You Opportunities</h1>
      <section className="bg-light rounded-lg w-4/5 h-32 mt-2 py-2 px-4">
        <h2>If you can code</h2>
      </section>
      <section className="bg-light rounded-lg w-4/5 h-32 mt-2 py-2 px-4">
        <h2>If you can&apos;t code</h2>
      </section>
      <section className='flex flex-col items-center mt-2'>
        <h1 className='text-3xl'>Members</h1>
        <div className='flex gap-4 m-2'>
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
