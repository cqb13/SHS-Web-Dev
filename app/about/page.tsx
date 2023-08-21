"use client"

import MemberCard from "@/components/about/memberCard";

export default function About() {

  const getMembers = () => {

  }

  return (
    <main className="flex flex-col flex-1">
      <section className="flex flex-col items-center">
        <h1 className="text-5xl font-medium">Members</h1>
        <hr className="w-4/5" />
        <button onClick={getMembers}>get</button>
        <div className="flex gap-4 m-4">
          {/*TODO: make this scrape org */}
          <MemberCard
            name="cqb13"
            icon="https://avatars.githubusercontent.com/u/74616162?s=96&v=4"
            github="https://github.com/cqb13"
          />
        </div>
      </section>
    </main>
  );
}
