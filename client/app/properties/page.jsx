import React, { Suspense } from 'react'
import PropertyFilter from './_components/Filter'
import PropertyCard from './_components/Crad'
import { getAllProperties } from '@/Services/operations/Property';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export async function generateMetadata({ searchParams }) {
  const { propertyType, propertySubtype, location, type } = await searchParams || {};

  let title = 'Explore Properties for Sale, Rent & Lease | Apartments, Villas, Offices';
  let description = "Browse a wide range of properties including apartments, villas, offices, and plots across Delhi NCR. Filter by location, type, and more to find your perfect property.";


  if (type !== 'All' || location || propertyType || propertySubtype) {
    const titleParts = [];

    if (propertySubtype) titleParts.push(propertySubtype.replace('_', ' '));
    else if (propertyType) titleParts.push(propertyType);


    titleParts.push('properties')

    if (type) titleParts.push(`for ${type}`);
    if (location) titleParts.push(`in ${location.replace('_', ' ')}`);

    title = `${titleParts.join(' ')} | Real Estate`;

    description = `Find ${propertySubtype ? propertySubtype.toLowerCase().replace('_', ' ') : propertyType?.toLowerCase()} properties ${type ? `available for ${type.toLowerCase()}` : ''} ${location ? `in ${location.replace('_', ' ')}` : ''}. Best real estate deals available now!`;
  }


  return {
    title,
    description,
  };
}


function page() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <>
          <PropertyFilter />
          <PropertyCard />
        </>
      </Suspense>
    </ErrorBoundary>
  )
}

export default page