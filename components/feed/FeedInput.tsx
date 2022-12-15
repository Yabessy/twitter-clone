import {
  FaceSmileIcon,
  PhotoIcon,
  XMarkIcon
} from "@heroicons/react/24/outline"
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc
} from "firebase/firestore"
import { getDownloadURL, ref, uploadString } from "firebase/storage"
import { useRef, useState } from "react"
import { useRecoilState } from "recoil"
import { db, storage } from "../../firebase"
import { userState } from "../atom/userAtom"

export default function FeedInput() {
  const [currentUser, setCurrentUser] = useRecoilState(userState)
  const [input, setInput] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const filePickerRef = useRef(null)

  const sendPost = async () => {
    if (loading) return
    setLoading(true)
    const docRef = await addDoc(collection(db, "tweets"), {
      // @ts-ignore
      uid: currentUser?.uid,
      text: input,
      // @ts-ignore
      userImg: currentUser?.userImg,
      timestamp: serverTimestamp(),
      // @ts-ignore
      name: currentUser?.name,
      // @ts-ignore
      username: currentUser?.username
    })
    const imageRef = ref(storage, `tweets/${docRef.id}/image`)
    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadUrl = await getDownloadURL(imageRef)
        await updateDoc(doc(db, "tweets", docRef.id), {
          image: downloadUrl
        })
      })
    }
    setLoading(false)
    setInput("")
    setSelectedFile(null)
  }
  const addImageToPost = (e: any) => {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      // @ts-ignore
      setSelectedFile(readerEvent.target?.result)
    }
  }
  return (
    <>
      {currentUser && (
        <div className="flex border-b border-gray-200 p-3 space-x-3">
          <img
            //   @ts-ignore
            src={currentUser?.userImg}
            alt="userImg"
            className="w-10 h-10 rounded-full cursor-pointer hover:brightness-95"
          />
          <div className="w-full divide-y divide-gray-200">
            <div className="">
              <textarea
                rows={3}
                className="border-none w-full focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
                placeholder="What's happening"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            {selectedFile && (
              <div className="relativer">
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
                    onClick={sendPost}>
                    Tweet
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
