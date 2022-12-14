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
import { useRecoilState } from "recoil"
import { userState } from "../atom/userAtom"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase"
import { useRouter } from "next/router"

export default function Sidebar() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useRecoilState(userState)
  async function onSignOut() {
    setCurrentUser(null)
    await signOut(auth)
  }
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full z-10 bg-white">
      {/* Twitter Logo */}
      <div className="hoverEffect p-3 hover:bg-blue-100 z-20">
        <Image
          alt="twitter logo"
          width="50"
          height="50"
          onClick={() => router.push("/")}
          src={`https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/800px-Twitter-logo.svg.png`}
        />
      </div>
      {/* Menu */}
      <div className="mt-2 xl:items-start">
        <SidebarMenuItem text="Home" Icon={HomeIcon} active />
        <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
        {currentUser && (
          <>
            <SidebarMenuItem text="Notification" Icon={BellIcon} />
            <SidebarMenuItem text="Messages" Icon={InboxIcon} />
            <SidebarMenuItem text="Bookmark" Icon={BookmarkIcon} />
            <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
            <SidebarMenuItem text="Profile" Icon={UserIcon} />
            <SidebarMenuItem text="More" Icon={EllipsisHorizontalCircleIcon} />
          </>
        )}
      </div>
      {/* Button */}
      {currentUser && (
        <div>
          <button className="bg-blue-400 text-white rounded-full w-44 h-12 font-bold shadow hover:brightness-95 text-lg hidden xl:inline">
            Tweet
          </button>
        </div>
      )}
      {/* Mini-Profile */}
      {currentUser ? (
        <div className="hoverEffect xl:w-60 xl:-ml-9 text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
          <img
            // @ts-ignore
            src={currentUser?.userImg}
            alt="userImg"
            className="w-10 h-10 rounded-full xl:mr-2 "
            onClick={() => onSignOut()}
          />
          <div className="leading-5 hidden xl:inline truncate">
            {/* @ts-ignore */}
            <h4 className="font-bold truncate">{currentUser?.name}</h4>
            {/* @ts-ignore */}
            <p className="text-gray-400 truncate">@{currentUser?.username}</p>
          </div>
          <EllipsisHorizontalIcon className="w-6 h-6 xl:ml-4 hidden xl:inline" />
        </div>
      ) : (
        <button
          onClick={() => router.push("/signin")}
          className="bg-blue-400 text-white rounded-full w-44 h-12 font-bold shadow hover:brightness-95 text-lg hidden xl:inline">
          SignIn
        </button>
      )}
    </div>
  )
}
