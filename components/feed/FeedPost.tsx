import {
  ChartBarIcon,
  ChatBubbleLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon
} from "@heroicons/react/24/outline"
import Moment from "react-moment"

export default function FeedPost({ post }: any) {
  return (
    <div className="flex w-full pl-3 pr-10 py-3 cursor-pointer border-b border-gray-200">
      {/* userProfileImg */}
      <img
        src={post.data().userProfileImg}
        alt="user"
        className="w-10 h-10 rounded-full mt-2 mr-4"
      />
      {/* right side */}
      <div className="w-full">
        {/* header */}
        <div className="flex items-center justify-between">
          {/* userInfo */}
          <div className="flex space-x-1 items-center whitespace-nowrap">
            <h4 className="font-bold text-base hover:underline">
              {post.data().displayName}
            </h4>
            <p className="text-sm sm:text-base">@{post.data().username} - </p>
            <span className="text-sm sm:text-base hover:underline">
              <Moment fromNow>{post.data().timestamp.toDate()}</Moment>
            </span>
          </div>
          {/* dot icon */}
          <EllipsisHorizontalIcon className="h-14 w-14 p-2 hoverEffect hover:bg-sky-100 hover:text-sky-500" />
        </div>
        {/* post text */}
        <p className="text-gray-800 text-base mb-2">{post.data().text}</p>

        {/* post img */}
        <img
          className="rounded-xl w-full object-contain"
          src={post.data().image}
          alt="postImg"
        />

        {/* icons */}
        <div className="flex justify-between text-gray-500 p-2 mt-1">
          <ChatBubbleLeftIcon className="w-9 h-9 hoverEffect p-1 hover:text-sky-500 hover:bg-sky-100" />
          <TrashIcon className="w-9 h-9 hoverEffect p-1 hover:text-red-500 hover:bg-red-100" />
          <HeartIcon className="w-9 h-9 hoverEffect p-1 hover:text-red-500 hover:bg-red-100" />
          <ShareIcon className="w-9 h-9 hoverEffect p-1 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="w-9 h-9 hoverEffect p-1 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  )
}
