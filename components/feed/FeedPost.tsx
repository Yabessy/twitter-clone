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
import { commentModalState, postIdState } from "../atom/modalState"

export default function FeedPost({ post, id }: any) {
  const router = useRouter()
  const [currentUser] = useRecoilState(userState)
  const [likes, setLikes] = useState([])
  const [comments, setComments] = useState([])
  const [liked, setLiked] = useState(false)
  const [open, setOpen] = useRecoilState(commentModalState)
  const [postId, setPostIdState] = useRecoilState(postIdState)
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "tweets", id, "likes"),
      (snapshot: any) => {
        setLikes(snapshot.docs)
      }
    )
  }, [db])
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "tweets", id, "comments"),
      (snapshot: any) => {
        setComments(snapshot.docs)
      }
    )
  }, [db])
  useEffect(() => {
    // @ts-ignore
    setLiked(likes.findIndex((like) => like.id === currentUser?.uid) !== -1)
  }, [likes])
  async function likeTweet(e:any) {
    e.stopPropagation()
    if (!currentUser) {
      router.push("/signin")
      return
    } else {
      if (liked) {
        // @ts-ignore
        await deleteDoc(doc(db, "tweets", id, "likes", currentUser?.uid))
      } else {
        // @ts-ignore
        await setDoc(doc(db, "tweets", id, "likes", currentUser?.uid), {
          // @ts-ignore
          username: currentUser?.username
        })
      }
    }
  }
  async function deletePost() {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deleteDoc(doc(db, "tweets", id))
      if (post.data().image) {
        await deleteObject(ref(storage, `tweets/${id}/image`))
      }
      router.push("/")
    }
  }
  return (
    <div
      onClick={() => router.push(`/tweet/${id}`)}
      className="flex w-[355px] sm:w-full pl-3 pr-10 py-3 cursor-pointer border-b border-gray-200">
      {/* userProfileImg */}
      <img
        src={post?.data()?.userImg}
        alt="user"
        referrerPolicy="no-referrer"
        className="w-10 h-10 rounded-full mt-2 mr-4"
      />
      {/* right side */}
      <div className="w-[270px] sm:w-auto sm:flex-1">
        {/* header */}
        <div className="flex items-center justify-between">
          {/* userInfo */}
          <div className="flex flex-row space-x-1 items-center whitespace-nowrap">
            <h4 className="font-bold text-base hover:underline">
              {post?.data()?.name}
            </h4>
            <p className="text-sm sm:text-base">@{post?.data()?.username} - </p>
            <span className="hidden sm:inline text-sm sm:text-base hover:underline">
              <Moment fromNow>
                {post?.data()?.timestamp !== null
                  ? post?.data()?.timestamp.toDate()
                  : new Date()}
              </Moment>
            </span>
          </div>
        </div>
        {/* post text */}
        <span className="inline sm:hidden text-sm sm:text-base hover:underline">
          <Moment fromNow>
            {post?.data()?.timestamp !== null
              ? post?.data()?.timestamp.toDate()
              : new Date()}
          </Moment>
        </span>
        <p className="text-gray-800 text-base mb-2">{post?.data()?.text}</p>

        {/* post img */}
        {post?.data()?.image && (
          <img
            className="rounded-xl w-full object-contain"
            src={post?.data()?.image}
            alt="postImg"
          />
        )}

        {/* icons */}
        <div className="flex justify-start space-x-10 text-gray-500 p-2 mt-1">
          <div className="flex">
            <ChatBubbleLeftIcon
              onClick={(e) => {
                e.stopPropagation()
                if (!currentUser) {
                  router.push("/signin")
                }
                setPostIdState(id)
                setOpen(!open)
              }}
              className="w-9 h-9 hoverEffect p-1 hover:text-sky-500 hover:bg-sky-100"
            />
            {comments.length > 0 && (
              <span className="text-base font-bold">{comments.length}</span>
            )}
          </div>
          {/* @ts-ignore */}
          {currentUser?.uid === post?.data()?.uid && (
            <TrashIcon
              onClick={() => deletePost()}
              className="w-9 h-9 hoverEffect p-1 hover:text-red-500 hover:bg-red-100"
            />
          )}
          <div className="flex">
            {liked ? (
              <FilledHeartIcon
                onClick={(e) => likeTweet(e)}
                className="w-9 h-9 hoverEffect p-1 text-red-500 hover:text-red-500 hover:bg-red-100"
              />
            ) : (
              <HeartIcon
                onClick={(e) => likeTweet(e)}
                className="w-9 h-9 hoverEffect p-1 hover:text-red-500 hover:bg-red-100"
              />
            )}
            {likes.length > 0 && (
              <span
                className={`text-base font-bold ${
                  liked ? "text-red-500" : "text-gray-500"
                }`}>
                {likes.length}
              </span>
            )}
          </div>
          <ShareIcon className="w-9 h-9 hoverEffect p-1 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  )
}
