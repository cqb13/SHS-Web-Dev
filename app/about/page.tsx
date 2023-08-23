"use client";

import MemberCard from "@/components/about/memberCard";
import { collection, getDocs } from "@firebase/firestore";
import ActivityCard from "@/components/about/activityCard";
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

  //TODO: make this look good later
  return (
    <main className='flex flex-col flex-1 py-2 px-4 gap-2 items-center'>
      <h1 className='text-3xl font-semibold text-center'>
        The SHS Web Dev Club
      </h1>
      <section className='flex w-4/5 gap-2 mt-2 md-lg:h-32 max-md-lg:flex-col max-sm:w-11/12'>
        <div className='bg-light py-2 px-4 rounded-lg'>
          <h2 className='text-xl font-semibold mb-1'>Goals & Objectives</h2>
          <p className='text-lg'>
            We aim to provide you with hands-on experience in web development.
          </p>
        </div>
        <div className='bg-light py-2 px-4 rounded-lg'>
          <h2 className='text-xl font-semibold mb-1'>Meetings</h2>
          <p className='text-lg'>
            We meet twice a month after school, on Wednesdays, in room 2411. Our
            meetings last from 30minutes to an hour.
          </p>
        </div>
      </section>
      <section className='flex w-4/5 gap-2 max-sm:flex-col max-sm:w-11/12'>
        <div className='bg-light py-2 px-4 rounded-lg flex-1'>
          <h2 className='text-xl font-semibold mb-1'>Technologies</h2>
          <ul className='px-2 text-lg'>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript & TypeScript</li>
            <li>React & NextJS</li>
            <li>VueJS</li>
            <li>Git</li>
            <li>More...</li>
          </ul>
        </div>
        <div className='bg-light py-2 px-4 rounded-lg flex-1'>
          <h2 className='text-xl font-semibold mb-1'>Activities</h2>
          <ul className='px-2 text-lg'>
            <li>Develope Websites</li>
            <li>Partake in Hackathons</li>
            <li>Learn Web Hosting</li>
            <li>More...</li>
          </ul>
        </div>
        <div className='bg-light py-2 px-4 rounded-lg flex-1'>
          <h2 className='text-xl font-semibold mb-1'>Links</h2>
          <ul className='px-2 text-lg'>
            <li className='bg-highlight p-2 rounded-md hover:rounded-lg w-full focus:outline-none hover:opacity-90 transition-all ease-in-out'>
              <a href='https://github.com/Website-Club' target='_blank'>
                Our Github
              </a>
            </li>
            <li className='bg-highlight p-2 mt-2 rounded-md hover:rounded-lg w-full focus:outline-none hover:opacity-90 transition-all ease-in-out'>
              <a href='https://www.instagram.com/webapp_club/' target='_blank'>
                Our Instagram
              </a>
            </li>
          </ul>
        </div>
      </section>
      <h1 className='text-3xl m-2 w-4/5 pl-4'>You Opportunities</h1>
      <section className='bg-light rounded-lg w-4/5 py-2 px-4 max-sm:w-11/12'>
        <h2 className='text-xl font-semibold mb-1'>If you can code</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <ActivityCard content='Work on group projects to build mobile and web apps.' />
          <ActivityCard content='Participate in coding challenges.' />
          <ActivityCard content='Help guide fellow members in their learning.' />
          <ActivityCard content='Participate in / Organize hackathons' />
          <ActivityCard content='Participate in code review sessions to give feedback on the code of other members.' />
          <ActivityCard content='Create content for websites, such as graphics.' />
        </div>
      </section>
      <section className='bg-light rounded-lg w-4/5 py-2 px-4 max-sm:w-11/12'>
        <h2 className='text-xl font-semibold mb-1'>If you can&apos;t code</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <ActivityCard
            content='Learn to code!'
            links={[
              ["Code.Org", "https://code.org/"],
              ["Scratch", "https://scratch.mit.edu/"]
            ]}
          />
          <ActivityCard content='Participate in testing sessions to provide feedback on websites and apps created by members.' />
          <ActivityCard content='Help create content for websites and apps, such as designing graphics.' />
          <ActivityCard content='Participate in code review sessions to give feedback on the code of other members.' />
          <ActivityCard content='Help with project management tasks, such as organizing schedules,coordinating team members, and tracking progress.' />
          <ActivityCard content='Create app ideas for members to develop.' />
        </div>
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
