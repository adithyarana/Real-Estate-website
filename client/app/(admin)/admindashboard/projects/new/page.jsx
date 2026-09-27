"use client";

import AdminProtect from "@/Component/AdminProtect";
import AdminNav from "@/app/(admin)/admindashboard/_components/AdminNav";
import ProjectForm from "@/app/(admin)/admindashboard/projects/_components/ProjectForm";

const NewProjectPage = () => (
  <AdminProtect>
    <div className="p-5 shadow-md">
      <h1 className="text-3xl font-bold text-gray-800">Add New Project</h1>
    </div>
    <AdminNav />
    <div className="p-6">
      <ProjectForm />
    </div>
  </AdminProtect>
);

export default NewProjectPage;
