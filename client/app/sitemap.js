export default async function sitemap() {
  const staticRoutes = ["", "/properties", "/projects", "/aboutus", "/ourservices", "/contactus"].map(
    (path) => ({
      url: `https://kirtyrealty.in${path || "/"}`,
      lastModified: new Date(),
    })
  );

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/project/published`,
      { next: { revalidate: 300 } }
    );
    const json = await response.json();
    const projectRoutes = (json.data || []).map((project) => ({
      url: `https://kirtyrealty.in/projects/${project.slug}`,
      lastModified: project.createdAt || new Date(),
    }));
    return [...staticRoutes, ...projectRoutes];
  } catch {
    return staticRoutes;
  }
}
