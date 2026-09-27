"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPublishedProjects } from "@/Services/operations/Project";
import ProjectCard from "@/app/projects/_components/ProjectCard";

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedProjects({ featured: "true", limit: "6" })
      .then((data) => setProjects(data || []))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && !projects.length) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="font-heading text-3xl font-bold text-green-800">Featured Projects</h2>
            <p className="text-gray-600 mt-2">A selection of developments currently promoted by Kirty Realty.</p>
          </div>
          <Link href="/projects" className="text-green-700 font-semibold">
            View All Projects
          </Link>
        </div>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
