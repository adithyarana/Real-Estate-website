"use client";

import { useEffect, useState } from "react";
import { getPublishedProjects } from "@/Services/operations/Project";
import ProjectCard from "./ProjectCard";
import PropertyCardSkeleton from "@/app/properties/_components/Skelton";

const ProjectListingClient = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getPublishedProjects();
      setProjects(data);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl font-bold text-green-800">Our Projects</h1>
          <p className="font-body text-gray-600 mt-3 max-w-2xl mx-auto">
            Discover premium developments by Kirty Realty. Open a project to explore pricing, floor plans, amenities and more.
          </p>
        </div>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <PropertyCardSkeleton key={i} />)
            : projects.length === 0
            ? (
              <div className="col-span-full text-center text-green-700 font-semibold py-16">
                New projects will appear here once published.
              </div>
            )
            : projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </div>
    </div>
  );
};

export default ProjectListingClient;
