"use client";

import { useEffect, useState } from "react";
import ProjectCard from "@/components/projects/projectCard";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [search, setSearch] = useState("");

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

  useEffect(() => {
    const filtered = projects.filter((project: any) => {
      if (search.startsWith("topic:")) {
        const topic = search.split("topic:")[1];
        return project.topics.includes(topic);
      }

      return project.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredProjects(filtered);
  }, [search, projects]);

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };

  return (
    <main className='flex flex-col flex-1 p-4 items-center gap-4'>
      <section className="w-4/5 bg-light px-4 py-2 rounded-lg sticky top-14 shadow-md">
        <input
          type='text'
          placeholder='Search Projects'
          onChange={handleSearch}
          value={search}
          className='bg-highlight p-2 rounded-lg w-full placeholder:text-dark focus:outline-none'
        />
      </section>
      <section className='w-4/5'>
        {projects.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {filteredProjects.map((project: any) => (
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
