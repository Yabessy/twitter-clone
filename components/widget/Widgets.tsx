import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

export default function Widgets() {
  return (
    <div className="xl:w-auto hidden lg:inline ml-4 space-y-5">
      <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-10">
        <div className="flex items-center p-3 rounded-full w-full relative">
          <MagnifyingGlassIcon className="w-7 h-7 z-10 text-gray-400 absolute inset-y-1.5" />
          <input
            type="text"
            placeholder="Search Tweet"
            className="absolute inset-0 rounded-full pl-12 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-50"
          />
        </div>
      </div>
    </div>
  )
}
