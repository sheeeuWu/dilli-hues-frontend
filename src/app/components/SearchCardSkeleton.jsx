export default function SearchCardSkeleton() {
  return (
    <div className="animate-pulse flex gap-4 bg-white shadow-sm rounded-xl p-4 border mb-6 w-full max-w-5xl mx-auto">
      {/* Image Skeleton */}
      <div className="w-36 h-28 sm:w-48 sm:h-36 bg-gray-200 rounded-lg" />

      {/* Content Skeleton */}
      <div className="flex-1 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />

        {/* Tags + buttons */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-gray-200 rounded-full" />
            <div className="h-6 w-20 bg-gray-200 rounded-full" />
          </div>
          <div className="h-6 w-24 bg-gray-200 rounded-md" />
        </div>
      </div>
    </div>
  );
}