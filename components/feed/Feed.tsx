import { SparklesIcon } from "@heroicons/react/24/outline"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { db } from "../../firebase"
import FeedInput from "./FeedInput"
import FeedPost from "./FeedPost"

export default function Feed() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "tweets"), orderBy("timestamp", "desc")),
      (snapshot: any) => {
        setPosts(snapshot.docs)
      }
    )
    return unsub
  }, [])
  return (
    <div className="sm:ml-20 xl:ml-56 border-l border-r border-gray-200 lg:min-w-[720px] flex-grow max-w-2xl">
      <div className="flex items-center py-2 px-3 top-0 sticky z-10 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center ml-auto">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <FeedInput />
      <AnimatePresence>
        {posts.map((post) => (
          <motion.div
            // @ts-ignore
            key={post.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}>
            {/* @ts-ignore */}
            <FeedPost id={post.id} post={post} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
