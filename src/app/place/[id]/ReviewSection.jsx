export default function ReviewsSection() {
  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold mb-6">💬 Reviews</h2>

      {/* Review 1 */}
      <div className="bg-white p-5 rounded-xl shadow-sm border mb-4">
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold text-gray-800">Great Zoo</p>
          <p className="text-xs text-gray-500">Jun 2024</p>
        </div>
        <p className="text-sm text-gray-700 mb-2">
          I saw many animals like leopard, elephant, tiger, wolf, monkey...
        </p>
        <p className="text-xs text-gray-500">By <span className="font-medium">Aditya Kumar</span></p>
      </div>

      {/* Review 2 */}
      <div className="bg-white p-5 rounded-xl shadow-sm border">
        <div className="flex justify-between items-center mb-2">
          <p className="font-semibold text-gray-800">Nice</p>
          <p className="text-xs text-gray-500">Apr 2023</p>
        </div>
        <p className="text-sm text-gray-700 mb-2">
          The zoological park in Delhi is a fantastic destination...
        </p>
        <p className="text-xs text-gray-500">By <span className="font-medium">Manish</span></p>
      </div>
    </div>
  );
}