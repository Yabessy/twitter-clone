import Image from "next/image"
import SidebarMenuItem from "./SidebarMenuItem"
import { HomeIcon } from "@heroicons/react/24/solid"
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardIcon,
  UserIcon,
  EllipsisHorizontalIcon,
  EllipsisHorizontalCircleIcon
} from "@heroicons/react/24/outline"

export default function Sidebar() {
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full">
      {/* Twitter Logo */}
      <div className="hoverEffect p-3 hover:bg-blue-100">
        <Image
          alt="twitter logo"
          width="50"
          height="50"
          src={`https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/800px-Twitter-logo.svg.png`}
        />
      </div>
      {/* Menu */}
      <div className="mt-4 xl:items-start">
        <SidebarMenuItem text="Home" Icon={HomeIcon} active />
        <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
        <SidebarMenuItem text="Notification" Icon={BellIcon} />
        <SidebarMenuItem text="Messages" Icon={InboxIcon} />
        <SidebarMenuItem text="Bookmark" Icon={BookmarkIcon} />
        <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
        <SidebarMenuItem text="Profile" Icon={UserIcon} />
        <SidebarMenuItem text="More" Icon={EllipsisHorizontalCircleIcon} />
      </div>
      {/* Button */}
      <div>
        <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow hover:brightness-75 text-lg hidden xl:inline">
          Tweet
        </button>
      </div>
      {/* Mini-Profile */}
      <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/2048px-Circle-icons-profile.svg.png"
          alt=""
          className="w-10 h-10 rounded-full xl:mr-2 "
        />
        <div className="leading-5 hidden xl:inline  ">
          <h4 className="font-bold">Imanul Vernanda</h4>
          <p className="text-gray-400">@Imanul</p>
        </div>
        <EllipsisHorizontalIcon className="w-6 h-6 xl:ml-8 hidden xl:inline"  />
      </div>
    </div>
  )
}
