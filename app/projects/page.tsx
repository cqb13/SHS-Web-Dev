"use client";

import React, { useEffect, useState } from "react";
import { collection, getDoc, doc } from "firebase/firestore";
import ProjectCard from "@/components/projects/projectCard";
import { db } from "@/lib/firebase";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [filteredFeatured, setFilteredFeatured] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/orgs/Website-Club/repos"
        );
        const data = await response.json();
        const filtered = data.filter((repo: any) => {
          return !repo.fork && !repo.archived && !repo.disabled;
        });
        setProjects(filtered);

        const projectRef = doc(collection(db, "projects"), "all");
        const docSnap = await getDoc(projectRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const repoList: string[] = data.projects || [];
          getFeaturedProjects(repoList);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredProjectsList = projects.filter((project: any) => {
      if (search.startsWith("topic:")) {
        const topic = search.split("topic:")[1];
        return project.topics.includes(topic);
      }

      return project.name.toLowerCase().includes(search.toLowerCase());
    });

    const filteredFeaturedList = featured.filter((project: any) => {
      if (search.startsWith("topic:")) {
        const topic = search.split("topic:")[1];
        return project.topics.includes(topic);
      }

      return project.name.toLowerCase().includes(search.toLowerCase());
    });

    setFilteredProjects(filteredProjectsList);
    setFilteredFeatured(filteredFeaturedList);
  }, [search, projects, featured]);

  const getFeaturedProjects = async (repoList: string[]) => {
    const featuredProjects: any = [];
    for (const repo of repoList) {
      try {
        const { user, repo: repoName } = splitFeaturedProjectDetails(repo);
        const response = await fetch(
          `https://api.github.com/repos/${user}/${repoName}`
        );
        const data = await response.json();
        featuredProjects.push(data);
      } catch (error) {
        console.error("Error fetching featured project:", error);
      }
    }
    setFeatured(featuredProjects);
  };

  const splitFeaturedProjectDetails = (projectDetails: string) => {
    const [user, repo] = projectDetails.split("/");
    return { user, repo };
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <main className='flex flex-col flex-1 p-4 items-center gap-4'>
      <section className='w-4/5 bg-light px-4 py-2 rounded-lg sticky top-14 shadow-md'>
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
          <p>Loading Projects...</p>
        )}
      </section>
      {featured.length > 0 ? (
        <>
          <div className='w-4/5 '>
            <h2 className='text-lg'>Featured Projects</h2>
            <p>Here are some project created by members</p>
          </div>
          <section className='w-4/5'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {filteredFeatured.map((project: any) => (
                <ProjectCard
                  key={project.id}
                  name={project.name}
                  description={project.description}
                  url={project.html_url}
                  homepage={project.homepage}
                  stars={project.stargazers_count}
                  topics={project.topics}
                  owner={project.owner.login}
                />
              ))}
            </div>
          </section>
        </>
      ) : null}
    </main>
  );
}
