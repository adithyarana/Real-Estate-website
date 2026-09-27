"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Download,
  Building2,
  Shield,
  Trees,
  Car,
  Dumbbell,
  Waves,
  Home,
  Play,
  X,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import ProjectEnquiry from "./ProjectEnquiry";
import StickyCta from "./StickyCta";
import MicrositeNavbar from "./MicrositeNavbar";

const PHONE = "918076913424";
const amenityIcons = {
  pool: Waves,
  swimming: Waves,
  gym: Dumbbell,
  club: Building2,
  garden: Trees,
  park: Trees,
  parking: Car,
  security: Shield,
  default: Home,
};

const iconFor = (label = "") => {
  const key = Object.keys(amenityIcons).find((item) => label.toLowerCase().includes(item));
  return amenityIcons[key] || amenityIcons.default;
};

const Section = ({ id, title, children, hidden }) => {
  if (hidden) return null;
  return (
    <section id={id} className="py-10 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {title && (
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-green-800 mb-6">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
};

const ProjectMicrosite = ({ project, preview = false }) => {
  const router = useRouter();
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [floorPlanOpen, setFloorPlanOpen] = useState(null);
  const [playVideo, setPlayVideo] = useState(false);

  const gallery = Array.isArray(project.gallery) ? project.gallery.filter((item) => item?.url) : [];
  const highlights = Array.isArray(project.highlights) ? project.highlights.filter(Boolean) : [];
  const amenities = Array.isArray(project.amenities) ? project.amenities.filter(Boolean) : [];
  const floorPlans = Array.isArray(project.floorPlans)
    ? project.floorPlans.filter((plan) => plan?.configuration || plan?.image)
    : [];
  const nearby = project.nearby || {};
  const nearbyGroups = [
    { title: "Landmarks", items: nearby.landmarks },
    { title: "Schools", items: nearby.schools },
    { title: "Hospitals", items: nearby.hospitals },
    { title: "Metro", items: nearby.metro },
    { title: "Highways", items: nearby.highways },
  ].filter((group) => Array.isArray(group.items) && group.items.length);

  const overviewItems = [
    ["Developer", project.developer],
    ["Type", project.projectType],
    ["Location", project.location],
    ["Configuration", project.configurations],
    ["Possession", project.possession],
    ["Status", project.constructionStatus],
  ].filter(([, value]) => value);

  const mapSrc = useMemo(() => {
    if (project.mapsUrl && project.mapsUrl.includes("embed")) return project.mapsUrl;
    if (project.latitude && project.longitude) {
      return `https://maps.google.com/maps?q=${project.latitude},${project.longitude}&z=14&output=embed`;
    }
    if (project.address || project.location) {
      return `https://maps.google.com/maps?q=${encodeURIComponent(project.address || project.location)}&z=14&output=embed`;
    }
    return null;
  }, [project]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "amenities", label: "Amenities" },
    { id: "floor-plans", label: "Floor Plans" },
    { id: "gallery", label: "Gallery" },
    { id: "location", label: "Location" },
    { id: "pricing", label: "Pricing" },
    { id: "enquire", label: "Enquire" },
  ];

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/projects");
  };

  return (
    <div className="bg-white pb-16 md:pb-0">
      <MicrositeNavbar
        navItems={navItems}
        onScrollTo={scrollTo}
        onBack={goBack}
        onEnquire={() => setEnquiryOpen(true)}
      />

      <section className="relative min-h-[420px] md:min-h-[480px] text-white">
        <img
          src={project.heroImage || "/banner.jpg"}
          alt={project.name}
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-16 md:pt-32 md:pb-20">
          {preview && (
            <span className="inline-block mb-3 bg-amber-400 text-amber-950 text-xs font-bold px-3 py-1 rounded-full">
              {project.status} PREVIEW
            </span>
          )}
          <p className="uppercase tracking-[0.2em] text-green-200 text-xs md:text-sm mb-2">Kirty Realty Project</p>
          <h1 className="font-heading text-3xl md:text-5xl font-bold max-w-3xl leading-tight">{project.name}</h1>
          {project.location && (
            <p className="mt-3 flex items-center gap-2 text-base md:text-lg">
              <MapPin size={18} /> {project.location}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            {project.configurations && <span className="bg-white/15 px-3 py-1 rounded-full">{project.configurations}</span>}
            {project.startingPrice && <span className="bg-green-600 px-3 py-1 rounded-full">{project.startingPrice}</span>}
          </div>
          {project.shortDescription && <p className="mt-4 max-w-2xl text-white/90 text-sm md:text-base leading-relaxed">{project.shortDescription}</p>}
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => setEnquiryOpen(true)} className="bg-green-600 hover:bg-green-700 px-5 py-2.5 rounded-lg font-semibold text-sm md:text-base">
              Enquire Now
            </button>
            {project.brochureUrl && (
              <a href={project.brochureUrl} target="_blank" rel="noreferrer" className="bg-white text-green-800 px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 text-sm md:text-base">
                <Download size={18} /> Download Brochure
              </a>
            )}
          </div>
        </div>
      </section>

      <Section id="overview" title="Project Overview" hidden={!project.description && overviewItems.length === 0}>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 font-body text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
            {project.description}
          </div>
          {overviewItems.length > 0 && (
            <div className="rounded-xl border border-green-100 bg-green-50/80 p-4 space-y-2.5">
              {overviewItems.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 text-sm border-b border-green-100 last:border-0 pb-2 last:pb-0">
                  <span className="text-gray-500">{label}</span>
                  <span className="font-semibold text-gray-800 text-right">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>

      <Section id="highlights" title="Project Highlights" hidden={!highlights.length}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {highlights.map((item) => {
            const Icon = iconFor(item);
            return (
              <div key={item} className="rounded-xl border border-green-100 p-4 bg-white shadow-sm">
                <Icon className="text-green-600 mb-2" size={22} />
                <p className="font-semibold text-gray-800 text-sm">{item}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section id="amenities" title="Amenities" hidden={!amenities.length}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {amenities.map((item) => {
            const Icon = iconFor(item);
            return (
              <div key={item} className="rounded-xl border border-green-100 bg-green-50 p-3.5 text-center">
                <Icon className="mx-auto text-green-700 mb-1.5" size={22} />
                <p className="text-sm font-medium text-gray-800">{item}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section id="floor-plans" title="Floor Plans" hidden={!floorPlans.length}>
        <div className="grid md:grid-cols-3 gap-5">
          {floorPlans.map((plan, index) => (
            <button
              key={`${plan.configuration}-${index}`}
              type="button"
              onClick={() => plan.image && setFloorPlanOpen(plan)}
              className="text-left rounded-xl overflow-hidden border border-green-100 hover:shadow-md transition bg-white"
            >
              {plan.image && (
                <img src={plan.image} alt={plan.configuration} className="h-44 w-full object-cover" loading="lazy" />
              )}
              <div className="p-4">
                <p className="font-semibold text-green-800">{plan.configuration}</p>
                {plan.area && <p className="text-sm text-gray-600 mt-0.5">{plan.area}</p>}
                {plan.price && <p className="text-sm font-medium mt-1">{plan.price}</p>}
              </div>
            </button>
          ))}
        </div>
      </Section>

      <Section id="pricing" title="Pricing & Configurations" hidden={!floorPlans.length && !project.startingPrice}>
        <div className="overflow-x-auto rounded-xl border border-green-100">
          <table className="min-w-full text-sm">
            <thead className="bg-green-50">
              <tr>
                <th className="p-3 text-left font-semibold text-green-900">Configuration</th>
                <th className="p-3 text-left font-semibold text-green-900">Area</th>
                <th className="p-3 text-left font-semibold text-green-900">Price</th>
              </tr>
            </thead>
            <tbody>
              {floorPlans.length
                ? floorPlans.map((plan, index) => (
                    <tr key={index} className="border-t border-green-50">
                      <td className="p-3">{plan.configuration}</td>
                      <td className="p-3">{plan.area || "-"}</td>
                      <td className="p-3">{plan.price || project.startingPrice || "-"}</td>
                    </tr>
                  ))
                : (
                    <tr>
                      <td className="p-3">{project.configurations || "-"}</td>
                      <td className="p-3">-</td>
                      <td className="p-3">{project.startingPrice || project.priceRange || "-"}</td>
                    </tr>
                  )}
            </tbody>
          </table>
        </div>
        {project.priceRange && <p className="text-gray-600 mt-3 text-sm">Price range: {project.priceRange}</p>}
      </Section>

      <Section id="gallery" title="Gallery" hidden={!gallery.length && !project.videoUrl}>
        {project.videoUrl && (
          <div className="mb-8 relative rounded-2xl overflow-hidden bg-black aspect-video">
            {playVideo ? (
              <iframe
                src={project.videoUrl}
                title={`${project.name} video`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <button type="button" className="w-full h-full relative" onClick={() => setPlayVideo(true)}>
                <img src={project.heroImage || "/banner.jpg"} alt="" className="w-full h-full object-cover opacity-80" />
                <span className="absolute inset-0 flex items-center justify-center text-white">
                  <span className="bg-green-600 rounded-full p-4">
                    <Play />
                  </span>
                </span>
              </button>
            )}
          </div>
        )}
        {gallery.length > 0 && (
          <Swiper modules={[Navigation, Pagination]} navigation pagination spaceBetween={16} slidesPerView={1} breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}>
            {gallery.map((item, index) => (
              <SwiperSlide key={`${item.url}-${index}`}>
                <button type="button" className="block w-full" onClick={() => setLightboxIndex(index)}>
                  <img src={item.url} alt={item.category || project.name} className="h-56 w-full object-cover rounded-xl" loading="lazy" />
                  {item.category && <p className="mt-2 text-xs uppercase tracking-wide text-gray-500">{item.category}</p>}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Section>

      <Section id="location" title="Location" hidden={!project.address && !mapSrc && !nearbyGroups.length}>
        {project.address && <p className="text-gray-700 mb-4">{project.address}</p>}
        {mapSrc && (
          <iframe
            src={mapSrc}
            title="Project location"
            className="w-full h-80 rounded-2xl border"
            loading="lazy"
          />
        )}
        {nearbyGroups.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            {nearbyGroups.map((group) => (
              <div key={group.title} className="rounded-xl border border-green-100 bg-green-50 p-4">
                <h3 className="font-semibold text-green-800 mb-2 text-sm">{group.title}</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section id="rera" title="RERA / Legal Details" hidden={!project.reraNumber && !project.legalInfo}>
        {project.reraNumber && <p className="font-semibold text-gray-800 mb-2">RERA: {project.reraNumber}</p>}
        {project.legalInfo && <p className="text-gray-700 whitespace-pre-line">{project.legalInfo}</p>}
      </Section>

      {project.brochureUrl && (
        <Section id="brochure" title="Brochure">
          <a href={project.brochureUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold">
            <Download size={18} /> Download Brochure
          </a>
        </Section>
      )}

      {project.properties?.length > 0 && (
        <Section id="units" title="Available Units">
          <div className="grid md:grid-cols-2 gap-4">
            {project.properties.map((unit) => (
              <Link key={unit.id} href={`/properties/${unit.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${unit.id}`} className="flex gap-3 rounded-xl border p-3 hover:shadow-md">
                <img src={unit.thumbnail} alt="" className="h-20 w-24 object-cover rounded" loading="lazy" />
                <div>
                  <p className="font-semibold">{unit.title}</p>
                  <p className="text-sm text-gray-500">{unit.area} {unit.price ? `• ${unit.price}` : ""}</p>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <Section id="enquire">
        <div className="grid md:grid-cols-2 gap-6 items-start rounded-2xl border border-green-100 bg-green-50/40 p-5 md:p-8">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-green-800 mb-2">Schedule a site visit</h2>
            <p className="text-gray-600 mb-4 text-sm md:text-base">Our advisors will share pricing, inventory and visit options for {project.name}.</p>
            <Link href="/projects" className="text-green-700 font-semibold text-sm">View all projects</Link>
          </div>
          <ProjectEnquiry project={project} />
        </div>
      </Section>

      <StickyCta onEnquire={() => setEnquiryOpen(true)} />

      {enquiryOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-5 relative">
            <button className="absolute right-3 top-3" onClick={() => setEnquiryOpen(false)}>
              <X />
            </button>
            <ProjectEnquiry project={project} />
          </div>
        </div>
      )}

      {floorPlanOpen?.image && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setFloorPlanOpen(null)}>
          <img src={floorPlanOpen.image} alt={floorPlanOpen.configuration} className="max-h-[90vh] max-w-full rounded-lg" />
        </div>
      )}

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={gallery.map((item) => ({ src: item.url }))}
      />
    </div>
  );
};

export default ProjectMicrosite;
