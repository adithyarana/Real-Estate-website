// components/PropertyCardSkeleton.jsx
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const PropertyCardSkeleton = () => {
  return (
    <div className="rounded-xl bg-white shadow-lg p-4">
      <Skeleton height={160} className="mb-4 rounded-xl" />
      <Skeleton height={24} width="80%" className="mb-2" />
      <Skeleton height={18} width="60%" className="mb-4" />
      <Skeleton height={14} width="70%" className="mb-1" />
      <Skeleton height={14} width="50%" className="mb-1" />
      <Skeleton height={14} width="60%" className="mb-3" />
      <Skeleton height={40} className="rounded-md" />
    </div>
  );
};

export default PropertyCardSkeleton;

