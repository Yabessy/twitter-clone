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

export default function FeedComment({
  comment,
  commentId,
  orignialPostId
}: any) {
  const router = useRouter()
  const [currentUser] = useRecoilState(userState)
  const [likes, setLikes] = useState([])
  const [liked, setLiked] = useState(false)
  const [open, setOpen] = useRecoilState(commentModalState)
  const [postId, setPostIdState] = useRecoilState(postIdState)
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "tweets", orignialPostId, "comments", commentId, "likes"),
      (snapshot: any) => {
        setLikes(snapshot.docs)
      }
    )
  }, [db, orignialPostId, commentId])
  useEffect(() => {
    // @ts-ignore
    setLiked(likes.findIndex((like) => like.id === currentUser?.uid) !== -1)
  }, [likes])

  async function likeComment() {
    if (!currentUser) {
      router.push("/signin")
      return
    } else {
      if (liked) {
        await deleteDoc(
          doc(
            db,
            "tweets",
            orignialPostId,
            "comments",
            commentId,
            "likes",
            // @ts-ignore
            currentUser?.uid
          )
        )
      } else {
        await setDoc(
          doc(
            db,
            "tweets",
            orignialPostId,
            "comments",
            commentId,
            "likes",
            // @ts-ignore
            currentUser?.uid
          ),
          {
            // @ts-ignore
            username: currentUser?.username
          }
        )
      }
    }
  }
  async function deleteComment() {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      await deleteDoc(doc(db, "tweets", orignialPostId, "comments", commentId))
    }
  }
  return (
    <div className="flex w-[355px] sm:w-full pl-4 sm:pl-20 pr-10 py-3 cursor-pointer border-b border-gray-200">
      {/* userProfileImg */}
      <img
        src={comment?.userImg}
        alt="user"
        referrerPolicy="no-referrer"
        className="w-10 h-10 rounded-full mt-2 mr-4"
      />
      {/* right side */}
      <div className="flex-1">
        {/* header */}
        <div className="flex items-center justify-between">
          {/* userInfo */}
          <div className="flex space-x-1 items-center whitespace-nowrap">
            <h4 className="font-bold text-base hover:underline">
              {comment?.name}
            </h4>
            <p className="text-sm sm:text-base">@{comment?.username} - </p>
            <span className="hidden sm:inline text-sm sm:text-base hover:underline">
              <Moment fromNow>
                {comment?.timestamp !== null
                  ? comment?.timestamp.toDate()
                  : new Date()}
              </Moment>
            </span>
          </div>
        </div>
        {/* comment text */}
        <span className="inline sm:hidden text-sm sm:text-base hover:underline">
          <Moment fromNow>
            {comment?.timestamp !== null
              ? comment?.timestamp.toDate()
              : new Date()}
          </Moment>
        </span>
        <p className="text-gray-800 text-base mb-2">{comment?.comment}</p>

        {/* icons */}
        <div className="flex justify-start space-x-10 text-gray-500 p-2 mt-1">
          {/* @ts-ignore */}
          {currentUser?.uid === comment?.uid && (
            <TrashIcon
              onClick={() => deleteComment()}
              className="w-9 h-9 hoverEffect p-1 hover:text-red-500 hover:bg-red-100"
            />
          )}
          <div className="flex">
            {liked ? (
              <FilledHeartIcon
                onClick={() => likeComment()}
                className="w-9 h-9 hoverEffect p-1 text-red-500 hover:text-red-500 hover:bg-red-100"
              />
            ) : (
              <HeartIcon
                onClick={() => likeComment()}
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
