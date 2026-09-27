"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import AdminProtect from "@/Component/AdminProtect";
import AdminNav from "@/app/(admin)/admindashboard/_components/AdminNav";
import { archiveProject, deleteProject, getAdminProjects, updateProjectStatus } from "@/Services/operations/Project";

const statusStyles = {
  PUBLISHED: "bg-green-100 text-green-800",
  DRAFT: "bg-amber-100 text-amber-800",
  ARCHIVED: "bg-gray-200 text-gray-700",
};

const AdminProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const load = async () => {
    setLoading(true);
    const data = await getAdminProjects();
    setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await updateProjectStatus(id, { status });
      toast.success(`Project ${status.toLowerCase()}`);
      load();
    } catch {
      toast.error("Unable to update status");
    }
  };

  const handleArchive = async (id) => {
    if (!window.confirm("Archive this project? It will no longer appear on the website.")) return;
    try {
      await archiveProject(id);
      toast.success("Project archived");
      load();
    } catch {
      toast.error("Unable to archive project");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteProject(deleteTarget.id);
      toast.success("Project deleted");
      setDeleteTarget(null);
      load();
    } catch {
      toast.error("Unable to delete project");
    }
  };

  return (
    <AdminProtect>
      <div className="p-5 flex items-center justify-between shadow-md w-full">
        <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
        <Link href="/admindashboard/projects/new" className="bg-green-600 text-white px-5 py-2 rounded-lg font-medium">
          + Add New Project
        </Link>
      </div>
      <AdminNav />

      <div className="p-6 overflow-x-auto">
        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-600">No projects yet. Create the first project microsite.</p>
        ) : (
          <table className="min-w-full bg-white rounded-xl overflow-hidden shadow">
            <thead className="bg-green-50 text-left text-sm">
              <tr>
                <th className="p-3">Project</th>
                <th className="p-3">Location</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-t text-sm">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      {project.heroImage && (
                        <img src={project.heroImage} alt="" className="h-12 w-16 object-cover rounded" />
                      )}
                      <div>
                        <p className="font-semibold">{project.name}</p>
                        <p className="text-gray-500">/{project.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">{project.location}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${statusStyles[project.status]}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/admindashboard/projects/${project.id}`} className="text-green-700 underline">
                        Edit
                      </Link>
                      <Link href={`/admindashboard/projects/${project.id}/preview`} className="text-blue-700 underline">
                        Preview
                      </Link>
                      {project.status !== "PUBLISHED" && (
                        <button onClick={() => handleStatus(project.id, "PUBLISHED")} className="text-emerald-700">
                          Publish
                        </button>
                      )}
                      {project.status === "PUBLISHED" && (
                        <button onClick={() => handleStatus(project.id, "DRAFT")} className="text-amber-700">
                          Unpublish
                        </button>
                      )}
                      {project.status !== "ARCHIVED" && (
                        <button onClick={() => handleArchive(project.id)} className="text-red-600">
                          Archive
                        </button>
                      )}
                      <button onClick={() => setDeleteTarget(project)} className="text-red-700">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <p className="text-gray-800 font-medium">Are you sure you want to delete this project?</p>
            <p className="text-sm text-gray-500 mt-2">{deleteTarget.name}</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminProtect>
  );
};

export default AdminProjectsPage;
