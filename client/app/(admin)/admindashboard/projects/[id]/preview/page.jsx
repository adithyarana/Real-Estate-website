"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import AdminProtect from "@/Component/AdminProtect";
import { getAdminProjectById } from "@/Services/operations/Project";
import ProjectMicrosite from "@/app/projects/[slug]/_components/ProjectMicrosite";

const PreviewProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!id) return;
    getAdminProjectById(id).then(setProject);
  }, [id]);

  return (
    <AdminProtect>
      <div className="sticky top-20 z-40 bg-amber-100 text-amber-900 px-4 py-2 flex justify-between items-center text-sm">
        <span>Preview mode — unpublished projects are only visible here.</span>
        <Link href={`/admindashboard/projects/${id}`} className="underline font-medium">
          Back to edit
        </Link>
      </div>
      {project ? <ProjectMicrosite project={project} preview /> : <p className="p-8">Loading preview...</p>}
    </AdminProtect>
  );
};

export default PreviewProjectPage;
