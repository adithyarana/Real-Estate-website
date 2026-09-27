import ProjectListingClient from "./_components/ProjectListingClient";

export const revalidate = 120;

export const metadata = {
  title: "Projects | Kirty Realty",
  description:
    "Explore Kirty Realty residential and commercial projects across Delhi NCR. View pricing, configurations and dedicated project microsites.",
};

export default function ProjectsPage() {
  return <ProjectListingClient />;
}
