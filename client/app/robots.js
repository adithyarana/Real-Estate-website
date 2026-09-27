export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admindashboard", "/adminlogin", "/adminhome"],
    },
    sitemap: "https://kirtyrealty.in/sitemap.xml",
  };
}
