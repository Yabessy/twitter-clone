import { SparklesIcon } from "@heroicons/react/24/outline";

export default function Feed() {
  return (
    <div className="sm:ml-20 xl:ml-72 border-l border-r border-gray-200 xl:min-w-[576px] flex-grow max-w-2xl">
      <div className="flex items-center py-2 px-3 top-0 sticky z-10 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center ml-auto">
        <SparklesIcon className="h-5"/>
        </div>
      </div>
    </div>
  )
}
