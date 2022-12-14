import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import WidgetNews from "./WidgetNews"

export default function Widgets({ newsResults }: any) {
  const [articleNumber, setArticleNumber] = useState(3)
  return (
    <div className="xl:w-auto hidden lg:inline ml-4 space-y-7">
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
      <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-3 w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-lg px-4 mb-2">What's Happening</h4>
        {newsResults.slice(0, articleNumber).map((news: any) => (
          <WidgetNews key={news.source.id} news={news} />
        ))}
        <button
          onClick={()=>setArticleNumber(articleNumber + 3)}
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400">
          ShowMore
        </button>
      </div>
    </div>
  )
}
