// JavaScript
export default function Loading() {
  return (
    <div className="min-h-[100vh] bg-gray-50">
      <div className="w-full h-2 bg-gray-200 rounded overflow-hidden mt-10">
        <div className="h-full bg-gray-300 animate-pulse w-1/3" />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          <div className="h-10 bg-gray-200 rounded w-2/3" />
          <div className="h-48 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  )
}