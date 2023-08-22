'use client'

import { useEffect, useState } from "react";
import ProjectCard from "@/components/projects/projectCard";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/orgs/Website-Club/repos")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((repo: any) => {
          return !repo.fork && !repo.archived && !repo.disabled;
        });
        setProjects(filtered);
      });
  }, []);

  return (
    <main className='flex flex-col flex-1 p-4 items-center'>
      <section className="w-4/5">
        {projects.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {projects.map((project: any) => (
              <ProjectCard
                key={project.id}
                name={project.name}
                description={project.description}
                url={project.html_url}
                homepage={project.homepage}
                stars={project.stargazers_count}
                topics={project.topics}
              />
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </main>
  );
}
