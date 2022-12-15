import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import WidgetNews from "./WidgetNews"
import WidgetUser from "./WidgetUser"

export default function Widgets({ newsResults, userResults }: any) {
  const [articleNumber, setArticleNumber] = useState(3)
  const [userNumber, setUserNumber] = useState(3)
  return (
    <div className="xl:w-auto hidden lg:inline ml-7 space-y-7">
      <div className="w-[90%] xl:w-[85%] sticky top-0 bg-white py-1.5 z-10">
        <div className="flex items-center p-3 rounded-full w-full relative">
          <MagnifyingGlassIcon className="w-7 h-7 z-10 text-gray-400 absolute inset-y-1.5" />
          <input
            type="text"
            placeholder="Search Tweet"
            className="absolute inset-0 rounded-full pl-12 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-50"
          />
        </div>
      </div>
      <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-3 w-[100%] xl:w-[90%]">
        <h4 className="font-bold text-lg px-4 mb-2">What's Happening</h4>
        <AnimatePresence>
          {newsResults.slice(0, articleNumber).map((news: any) => (
            <motion.div
              key={news.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}>
              <WidgetNews news={news} />
            </motion.div>
          ))}
        </AnimatePresence>
        <button
          onClick={() => setArticleNumber(articleNumber + 3)}
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400">
          ShowMore
        </button>
      </div>
      <div className="sticky top-16 text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-3 w-[100%] xl:w-[90%]">
        <h4 className="font-bold text-lg px-4 mb-2">Who to follow</h4>
        <AnimatePresence>
          {userResults.slice(0, userNumber).map((user: any) => (
            <motion.div
              key={user.login.md5}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}>
              <WidgetUser user={user} />
            </motion.div>
          ))}
        </AnimatePresence>
        <button
          className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
          onClick={() => setUserNumber(userNumber + 3)}>
          ShowMore
        </button>
      </div>
    </div>
  )
}
