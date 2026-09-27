import { toast } from "react-toastify";
import { apiConnector } from "../apiConnecter";
import { projectEndpoints } from "../api";
import axios from "axios";

const adminHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getPublishedProjects = async (params = {}) => {
  let result = [];
  try {
    const query = new URLSearchParams(params).toString();
    const url = query
      ? `${projectEndpoints.GET_PUBLISHED_PROJECTS_API}?${query}`
      : projectEndpoints.GET_PUBLISHED_PROJECTS_API;
    const response = await apiConnector("GET", url);
    if (!response.data.success) throw new Error("Couldn't fetch projects");
    result = response?.data?.data || [];
  } catch (error) {
    console.log("GET_PUBLISHED_PROJECTS_API ERROR", error);
  }
  return result;
};

export const getProjectBySlug = async (slug) => {
  try {
    const response = await apiConnector(
      "GET",
      `${projectEndpoints.GET_PROJECT_BY_SLUG_API}/${slug}`
    );
    if (!response.data.success) throw new Error("Project not found");
    return response.data.data;
  } catch (error) {
    console.log("GET_PROJECT_BY_SLUG_API ERROR", error);
    return null;
  }
};

export const getAdminProjects = async () => {
  try {
    const response = await axios.get(projectEndpoints.GET_ADMIN_PROJECTS_API, {
      headers: adminHeaders(),
      withCredentials: true,
    });
    return response.data.data || [];
  } catch (error) {
    console.log("GET_ADMIN_PROJECTS_API ERROR", error);
    toast.error("Unable to load projects");
    return [];
  }
};

export const getAdminProjectById = async (id) => {
  try {
    const response = await axios.get(`${projectEndpoints.GET_ADMIN_PROJECT_API}/${id}`, {
      headers: adminHeaders(),
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    console.log("GET_ADMIN_PROJECT_API ERROR", error);
    return null;
  }
};

export const saveProject = async (formData, id) => {
  const url = id
    ? `${projectEndpoints.UPDATE_PROJECT_API}/${id}`
    : projectEndpoints.CREATE_PROJECT_API;
  const method = id ? "put" : "post";
  const response = await axios({
    method,
    url,
    data: formData,
    headers: adminHeaders(),
    withCredentials: true,
    timeout: 120000,
  });
  if (!response?.data?.success) {
    const error = new Error(response?.data?.message || "Unable to save project");
    error.response = response;
    error.field = response?.data?.field;
    throw error;
  }
  return response.data;
};

export const updateProjectStatus = async (id, payload) => {
  const response = await axios.patch(
    `${projectEndpoints.STATUS_PROJECT_API}/${id}/status`,
    payload,
    { headers: adminHeaders(), withCredentials: true }
  );
  return response.data;
};

export const archiveProject = async (id) => {
  const response = await axios.delete(`${projectEndpoints.ARCHIVE_PROJECT_API}/${id}`, {
    headers: adminHeaders(),
    withCredentials: true,
  });
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await axios.delete(`${projectEndpoints.GET_ADMIN_PROJECT_API}/${id}`, {
    headers: adminHeaders(),
    withCredentials: true,
  });
  return response.data;
};
