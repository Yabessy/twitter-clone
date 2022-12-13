import { SparklesIcon } from "@heroicons/react/24/outline"
import FeedInput from "./FeedInput"
import FeedPost from "./FeedPost"

export default function Feed() {
  const posts = [
    {
      id: 1,
      userProfileImg:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png",
      displayName: "John Doe",
      username: "johndoe",
      image:
        "https://images.unsplash.com/photo-1670881528060-17142d874661?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      text: "Museum",
      timestamp: "1h"
    },
    {
      id: 2,
      userProfileImg:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png",
      displayName: "Imanuel",
      username: "Imanul",
      image:
        "https://images.unsplash.com/photo-1670443373385-490a6fb4d73b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
      text: "Bandara Keren",
      timestamp: "1h"
    }
  ]
  return (
    <div className="sm:ml-20 xl:ml-72 border-l border-r border-gray-200 xl:min-w-[576px] flex-grow max-w-2xl">
      <div className="flex items-center py-2 px-3 top-0 sticky z-10 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center ml-auto">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <FeedInput />
      {posts.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
    </div>
  )
}
