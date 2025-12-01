export default function SkeletonLoader() {
  return (
    <div className="space-y-4 mt-8 animate-pulse">
      {[1, 2, 3].map((_, i) => (
        <div key={i} className="bg-gray-200 h-24 rounded-md" />
      ))}
    </div>
  );
}