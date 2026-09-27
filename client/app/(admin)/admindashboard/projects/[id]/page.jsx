"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminProtect from "@/Component/AdminProtect";
import AdminNav from "@/app/(admin)/admindashboard/_components/AdminNav";
import ProjectForm from "../_components/ProjectForm";
import { getAdminProjectById } from "@/Services/operations/Project";

const EditProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!id) return;
    getAdminProjectById(id).then(setProject);
  }, [id]);

  return (
    <AdminProtect>
      <div className="p-5 shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">Edit Project</h1>
      </div>
      <AdminNav />
      <div className="p-6">
        {project ? <ProjectForm initialProject={project} /> : <p>Loading project...</p>}
      </div>
    </AdminProtect>
  );
};

export default EditProjectPage;
