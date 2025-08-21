export default function ProgressBar({ currentStep, totalSteps }) {
  const progressPercentage = (currentStep / totalSteps) * 100

  return (
    <div className="absolute top-20 left-0 right-0 w-full">
      <div className="w-[50%] bg-gray-200 h-2 mx-auto md:mt-8 sm:mt-4">
        <div
          className="bg-red-500 h-2 transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  )
}