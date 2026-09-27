"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";

const ProjectCard = ({ project }) => (
  <article className="group overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition">
    <Link href={`/projects/${project.slug}`} className="block">
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.heroImage || "/placeholder.jpg"}
          alt={project.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {project.projectType && (
          <span className="absolute top-3 left-3 bg-white/90 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
            {project.projectType}
          </span>
        )}
      </div>
      <div className="p-5 space-y-2">
        <h3 className="font-heading text-xl font-bold text-gray-900 line-clamp-1">{project.name}</h3>
        {project.location && (
          <p className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin size={16} className="text-green-600" />
            {project.location}
          </p>
        )}
        {project.configurations && (
          <p className="text-sm text-gray-700">{project.configurations}</p>
        )}
        {project.startingPrice && (
          <p className="text-green-700 font-semibold">{project.startingPrice}</p>
        )}
        {project.shortDescription && (
          <p className="text-sm text-gray-500 line-clamp-2">{project.shortDescription}</p>
        )}
        <span className="inline-flex mt-2 text-sm font-semibold text-white bg-green-600 group-hover:bg-green-700 px-4 py-2 rounded-lg">
          View Project
        </span>
      </div>
    </Link>
  </article>
);

export default ProjectCard;
