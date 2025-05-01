import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

function generateRandomCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function seedProperties() {
  const properties = [
    {
      pCode: generateRandomCode(),
      title: "2BHK Apartment in Sector 137, Noida with River View",
      description:
        "Discover a luxurious lifestyle with this beautiful 2BHK apartment in Sector 137, Noida. Featuring a serene river view, modern interiors, and access to top-class amenities like gym, pool, and clubhouse, this property is ideal for small families and working professionals. Its proximity to major IT parks and the metro station ensures seamless connectivity. The apartment boasts natural light, cross ventilation, and modular kitchen setups. The complex offers 24x7 security, power backup, visitor parking, and a landscaped park. Schools, hospitals, and daily convenience stores are within walking distance, making it an ideal place to call home.",
      type: "SALE",
      price: "6500000",
      location: { lat: 28.5425, lng: 77.3910 },
      address: "Apartment 404, Tower E, Sector 137, Noida",
      bedrooms: 2,
      bathrooms: 2,
      area: "1200 sqft",
      region: "NOIDA",
      status: "AVAILABLE",
      thumbnail: "/images/apartment.jpg",
      images: ["/images/apartment1.jpg", "/images/apartment2.jpg"],
      amenities: ["Swimming Pool", "Gym", "Security", "Park"],
      tags: ["Apartment", "2BHK", "River View"],
      additionalData: { floor: 4, totalFloors: 12, facing: "East" },
      propertyType: "RESIDENTIAL",
      propertySubType: "APARTMENT",
      virtualTourUrl: "https://example.com/apartment-tour",
      isActive: true,
    },
    {
      pCode: generateRandomCode(),
      title: "Retail Shop Space in Gaur City Mall, Greater Noida West",
      description:
        "This prime retail shop is located on the ground floor of Gaur City Mall, Greater Noida West. With high footfall and excellent visibility, it's an ideal spot for businesses such as salons, showrooms, or mobile stores. The shop comes with a ready-to-move-in setup, attached washroom, and air-conditioning. The mall is centrally located and offers amenities such as escalators, lifts, 24x7 security, fire alarms, and a food court. The shop faces the main entrance, ensuring maximum exposure. It is surrounded by residential apartments and IT offices, offering a steady stream of customers throughout the day.",
      type: "LEASE",
      price: "80000",
      location: { lat: 28.6001, lng: 77.4295 },
      address: "Shop 12, Gaur City Mall, Greater Noida West",
      bedrooms: 0,
      bathrooms: 1,
      area: "450 sqft",
      region: "GREATER_NOIDA",
      status: "AVAILABLE",
      thumbnail: "/images/shop.jpg",
      images: ["/images/shop1.jpg", "/images/shop2.jpg"],
      amenities: ["AC", "Security", "Parking", "Power Backup"],
      tags: ["Shop", "Retail", "Commercial"],
      additionalData: { floor: 0, roadFacing: true },
      propertyType: "COMMERCIAL",
      propertySubType: "SHOP",
      virtualTourUrl: "https://example.com/shop-tour",
      isActive: true,
    },
    {
      pCode: generateRandomCode(),
      title: "Luxury 3BHK Flat in Indirapuram, Delhi with Smart Home Features",
      description:
        "Experience futuristic living in this smart 3BHK flat located in the heart of Indirapuram, Delhi. Integrated with home automation, voice-controlled lighting, and high-speed internet, this flat is tailored for modern urban families. It features a spacious hall, modular kitchen, three airy bedrooms, and two contemporary bathrooms. The building includes a fitness center, rooftop terrace garden, 24-hour CCTV surveillance, and underground parking. Schools, shopping malls, hospitals, and metro access are within 5 minutes. A perfect mix of convenience, luxury, and technology, this home redefines urban lifestyle.",
      type: "SALE",
      price: "8800000",
      location: { lat: 28.6361, lng: 77.3777 },
      address: "Flat 9C, Tower 2, Indirapuram, Ghaziabad",
      bedrooms: 3,
      bathrooms: 2,
      area: "1600 sqft",
      region: "DELHI",
      status: "AVAILABLE",
      thumbnail: "/images/smartflat.jpg",
      images: ["/images/smartflat1.jpg", "/images/smartflat2.jpg"],
      amenities: ["Smart Home", "Security", "Clubhouse", "Parking"],
      tags: ["3BHK", "Smart Home", "Ghaziabad"],
      additionalData: { automation: true, floor: 9 },
      propertyType: "RESIDENTIAL",
      propertySubType: "APARTMENT",
      virtualTourUrl: "https://example.com/smartflat-tour",
      isActive: true,
    },
    {
      pCode: generateRandomCode(),
      title: "Warehouse Space Near NH-24, Delhi for Industrial Use",
      description:
        "This spacious warehouse near NH-24, Delhi is designed for logistics, manufacturing, and storage purposes. It offers wide loading docks, high ceilings, fire safety systems, and separate office space for administrative use. With a strong concrete structure and 24x7 access, it is perfect for eCommerce, FMCG, or retail supply chain businesses. Connectivity to Delhi and Noida is seamless via NH-24 and the upcoming Rapid Rail Corridor. CCTV surveillance, parking for trucks, and power backup ensure smooth operations at all times.",
      type: "LEASE",
      price: "300000",
      location: { lat: 28.6689, lng: 77.4470 },
      address: "Plot 19, Industrial Area, NH-24, Delhi",
      bedrooms: 0,
      bathrooms: 2,
      area: "12000 sqft",
      region: "DELHI",
      status: "AVAILABLE",
      thumbnail: "/images/warehouse.jpg",
      images: ["/images/warehouse1.jpg", "/images/warehouse2.jpg"],
      amenities: ["Fire Safety", "Loading Dock", "Office Space", "Power Backup"],
      tags: ["Warehouse", "Industrial", "NH-24"],
      additionalData: { entryWidth: "20ft", craneAccess: true },
      propertyType: "INDUSTRIAL",
      propertySubType: "WAREHOUSE",
      virtualTourUrl: "https://example.com/warehouse-tour",
      isActive: true,
    },
    {
      pCode: generateRandomCode(),
      title: "Ready-to-Move Studio Apartment in Delhi NCR",
      description:
        "Perfect for students or working professionals, this compact studio apartment offers style, efficiency, and affordability. Located in Delhi NCR near public transport hubs, the apartment features a modern kitchenette, bathroom, and balcony with a city view. The property is Vastu-compliant and ready to move in with essential furniture and appliances. Society offers security, intercom, lift access, and a shared laundry area. A great rental investment opportunity or first home in the city.",
      type: "SALE",
      price: "3200000",
      location: { lat: 28.5678, lng: 77.4567 },
      address: "Unit 103, DLF Avenue, Delhi NCR",
      bedrooms: 1,
      bathrooms: 1,
      area: "480 sqft",
      region: "DELHI",
      status: "AVAILABLE",
      thumbnail: "/images/studio.jpg",
      images: ["/images/studio1.jpg", "/images/studio2.jpg"],
      amenities: ["Lift", "Intercom", "Laundry", "Security"],
      tags: ["Studio", "Rental", "Delhi"],
      additionalData: { floor: 1, furnished: true },
      propertyType: "RESIDENTIAL",
      propertySubType: "FARM_HOUSE",
      virtualTourUrl: "https://example.com/studio-tour",
      isActive: true,
    },
    {
      pCode: generateRandomCode(),
      title: "Open Plot for Residential Construction in Yamuna Expressway",
      description:
        "Located along the fast-developing Yamuna Expressway corridor, this open residential plot is perfect for constructing your dream home or investment property. Surrounded by smart city development, universities, and upcoming metro plans, the plot ensures long-term appreciation. The site is fully leveled and has access to electricity, water lines, and paved roads. The locality is peaceful, pollution-free, and ideal for families. Close to the proposed Noida International Airport, this plot guarantees promising returns.",
      type: "SALE",
      price: "4500000",
      location: { lat: 28.2854, lng: 77.5308 },
      address: "Plot 78, Sector 22D, Yamuna Expressway",
      bedrooms: 0,
      bathrooms: 0,
      area: "200 sq yards",
      region: "GREATER_NOIDA",
      status: "AVAILABLE",
      thumbnail: "/images/plot.jpg",
      images: ["/images/plot1.jpg", "/images/plot2.jpg"],
      amenities: ["Road Access", "Electricity", "Water Line"],
      tags: ["Plot", "Investment", "Yamuna Expressway"],
      additionalData: { registryReady: true },
      propertyType: "INDUSTRIAL",
      propertySubType: "PLOT",
      virtualTourUrl: "https://example.com/plot-tour",
      isActive: true,
    }
    
    // Add more objects similarly (5 more)
  ];

  try {
    for (const property of properties) {
      await prisma.property.create({
        data: {
          ...property,
          location: property.location,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }
    console.log("✅ Seeded properties successfully");
  } catch (error) {
    console.error("❌ Error seeding properties:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedProperties();
