import { useRecoilState } from "recoil"
import { commentModalState, postIdState } from "../atom/modalState"
// @ts-ignore
import Modal from "react-modal"
import {
  FaceSmileIcon,
  PhotoIcon,
  XMarkIcon
} from "@heroicons/react/24/outline"
import { useEffect, useRef, useState } from "react"
import { db } from "../../firebase"
import { doc, onSnapshot } from "firebase/firestore"
import Moment from "react-moment"
import { userState } from "../atom/userAtom"

export default function CommentModal() {
  const [open, setOpen] = useRecoilState(commentModalState)
  const [postId] = useRecoilState(postIdState)
  const [post, setPost] = useState({})
  const [currentUser] = useRecoilState(userState)
  const [input, setInput] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const filePickerRef = useRef(null)

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "tweets", postId), (snapshot) => {
      setPost(snapshot)
    })
  }, [postId, db])
  async function sendComment() {}
  async function addImageToPost() {}
  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          ariaHideApp={false}
          onRequestClose={() => setOpen(false)}
          className="max-w-xl w-[90%] absolute z-50 top-24 left-1/2 -translate-x-1/2 border rounded shadow-md bg-white ring-0 outline-none border-gray-200">
          <div className="p-2">
            <div
              onClick={() => setOpen(false)}
              className="border-b border-gray-200">
              <div
                className="hoverEffect p-0 w-9 h-9 flex justify-center items-center"
                onClick={() => setOpen(false)}>
                <XMarkIcon className="h-6 text-gray-700" />
              </div>
            </div>
            <div className="flex flex-col p-2  relative">
              <div className="flex items-center space-x-1">
                <span className="w-0.5 h-full bg-gray-200 z-[-1] absolute left-8 top-11" />
                <img
                  src={post?.data()?.userImg}
                  alt="user"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full mt-2 mr-4"
                />
                <h4 className="font-bold text-base hover:underline">
                  {post?.data()?.displayName}
                </h4>
                <p className="text-sm sm:text-base">
                  @{post?.data()?.username} -{" "}
                </p>
                <span className="text-sm sm:text-base hover:underline">
                  <Moment fromNow>
                    {post?.data()?.timestamp !== null
                      ? post?.data()?.timestamp.toDate()
                      : new Date()}
                  </Moment>
                </span>
              </div>
              <p className="ml-16 text-gray-600 text-base mb-2">
                {post.data().text}
              </p>
              {/* <img
                className="ml-16 rounded-xl w-[75%] object-contain"
                src={post.data().image}
                alt="postImg"
              /> */}
            </div>

            {/* input */}
            {currentUser && (
              <div className="flex border-gray-200 p-3 space-x-3">
                <img
                  //   @ts-ignore
                  src={currentUser?.userImg}
                  alt="userImg"
                  className="w-10 h-10 rounded-full cursor-pointer hover:brightness-95"
                />
                <div className="w-full divide-y divide-gray-200">
                  <div className="">
                    <textarea
                      rows={2}
                      className="border-none w-full focus:ring-0 text-lg placeholder-gray-400 tracking-wide min-h-[50px] text-gray-700"
                      placeholder="Tweet your reply"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </div>
                  {selectedFile && (
                    <div className="relative">
                      <XMarkIcon
                        className="w-7 text-gray-600 shadow-md absolute cursor-pointer rounded-full"
                        onClick={() => setSelectedFile(null)}
                      />
                      <img
                        src={selectedFile}
                        alt="upload Image"
                        className={`${loading && "animate-pulse"}`}
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2.5">
                    {!loading && (
                      <>
                        <div className="flex">
                          <div>
                            <PhotoIcon
                              // @ts-ignore
                              onClick={() => filePickerRef.current.click()}
                              className="h-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"
                            />
                            <input
                              type="file"
                              hidden
                              ref={filePickerRef}
                              onChange={addImageToPost}
                            />
                          </div>
                          <FaceSmileIcon className="h-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                        </div>
                        <button
                          className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
                          disabled={!input.trim()}
                          onClick={sendComment}>
                          Tweet
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  )
}
