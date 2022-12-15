import {
  ChartBarIcon,
  ChatBubbleLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon
} from "@heroicons/react/24/outline"
import { HeartIcon as FilledHeartIcon } from "@heroicons/react/24/solid"
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc
} from "firebase/firestore"
import { useEffect, useState } from "react"
import Moment from "react-moment"
import { useRecoilState } from "recoil"
import { db, storage } from "../../firebase"
import { userState } from "../atom/userAtom"
import { useRouter } from "next/router"
import Image from "next/image"
import { deleteObject, ref } from "firebase/storage"

export default function FeedPost({ post }: any) {
  const router = useRouter()
  const [currentUser] = useRecoilState(userState)
  const [likes, setLikes] = useState([])
  const [liked, setLiked] = useState(false)
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "tweets", post.id, "likes"),
      (snapshot: any) => {
        setLikes(snapshot.docs)
      }
    )
  }, [db])
  useEffect(() => {
    // @ts-ignore
    setLiked(likes.findIndex((like) => like.id === currentUser?.uid) !== -1)
  }, [likes])
  async function likeTweet() {
    if (!currentUser) {
      router.push("/signin")
      return
    } else {
      if (liked) {
        // @ts-ignore
        await deleteDoc(doc(db, "tweets", post.id, "likes", currentUser?.uid))
      } else {
        // @ts-ignore
        await setDoc(doc(db, "tweets", post.id, "likes", currentUser?.uid), {
          // @ts-ignore
          username: currentUser?.username
        })
      }
    }
  }
  async function deletePost() {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deleteDoc(doc(db, "tweets", post.id))
      await deleteObject(ref(storage, `tweets/${post.id}/image`)).catch(() => {})
    }
  }
  return (
    <div className="flex w-full pl-3 pr-10 py-3 cursor-pointer border-b border-gray-200">
      {/* userProfileImg */}
      <img
        src={post.data().userImg}
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
              <Moment fromNow>
                {post.data().timestamp !== null
                  ? post.data().timestamp.toDate()
                  : new Date()}
              </Moment>
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
          {/* @ts-ignore */}
          {currentUser?.uid === post.data().uid && (
            <TrashIcon
              onClick={() => deletePost()}
              className="w-9 h-9 hoverEffect p-1 hover:text-red-500 hover:bg-red-100"
            />
          )}
          <div className="flex">
            {liked ? (
              <FilledHeartIcon
                onClick={() => likeTweet()}
                className="w-9 h-9 hoverEffect p-1 text-red-500 hover:text-red-500 hover:bg-red-100"
              />
            ) : (
              <HeartIcon
                onClick={() => likeTweet()}
                className="w-9 h-9 hoverEffect p-1 hover:text-red-500 hover:bg-red-100"
              />
            )}
            {likes.length > 0 && (
              <span
                className={`text-base ${
                  liked ? "text-red-500" : "text-gray-500"
                } font-bold`}>
                {likes.length}
              </span>
            )}
          </div>
          <ShareIcon className="w-9 h-9 hoverEffect p-1 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="w-9 h-9 hoverEffect p-1 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  )
}
