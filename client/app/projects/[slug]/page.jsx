import { notFound } from "next/navigation";
import ProjectMicrosite from "./_components/ProjectMicrosite";

export const revalidate = 120;

const apiBase = process.env.NEXT_PUBLIC_API_URL;

async function fetchProject(slug) {
  try {
    const response = await fetch(`${apiBase}/api/project/slug/${slug}`, {
      next: { revalidate: 120 },
    });
    if (!response.ok) return null;
    const json = await response.json();
    return json.data || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await fetchProject(slug);
  if (!project) {
    return { title: "Project | Kirty Realty" };
  }
  const title =
    project.seoTitle ||
    `${project.name}${project.location ? ` ${project.location}` : ""} | Price, Floor Plans & Amenities`;
  const description =
    project.seoDescription ||
    `Explore ${project.name}${project.location ? ` in ${project.location}` : ""}. View pricing, floor plans, amenities, location and enquire for a site visit.`;
  const canonical = `https://kirtyrealty.in/projects/${project.slug}`;
  const image = project.ogImage || project.heroImage;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function ProjectSlugPage({ params }) {
  const { slug } = await params;
  const project = await fetchProject(slug);
  if (!project) notFound();
  return <ProjectMicrosite project={project} />;
}
