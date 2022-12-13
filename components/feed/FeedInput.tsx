import { FaceSmileIcon, PhotoIcon } from "@heroicons/react/24/outline"

export default function FeedInput() {
  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png"
        alt="userImg"
        className="w-10 h-10 rounded-full cursor-pointer hover:brightness-95"
      />
      <div className="w-full divide-y divide-gray-200">
        <div className="">
          <textarea
            rows={3}
            className="border-none w-full focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
            placeholder="What's happening"
          />
        </div>
        <div className="flex items-center justify-between pt-2.5">
          <div className="flex">
            <PhotoIcon className="h-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
            <FaceSmileIcon className="h-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
          </div>
          <button className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50" disabled>Tweet</button>
        </div>
      </div>
    </div>
  )
}
