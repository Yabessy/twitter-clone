import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import { onAuthStateChanged } from "firebase/auth"
import {
  getDoc,
  doc,
  onSnapshot,
  query,
  collection,
  orderBy
} from "firebase/firestore"
import { AnimatePresence, motion } from "framer-motion"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { CommentModal, Sidebar, Widgets } from "../../components"
import { userState } from "../../components/atom/userAtom"
import FeedComment from "../../components/feed/FeedComment"
import FeedPost from "../../components/feed/FeedPost"
import { auth, db } from "../../firebase"

const Tweet = ({ newsResults, userResults }: any) => {
  const [currentUser, setCurrentUser] = useRecoilState(userState)
  const [post, setPost] = useState()
  const [comments, setComments] = useState([])
  const router = useRouter()
  const { id } = router.query
  useEffect(
    // @ts-ignore
    () => onSnapshot(doc(db, "tweets", id), (snapshot) => setPost(snapshot)),
    [db, id]
  )
  useEffect(() => {
    onSnapshot(
      query(
        // @ts-ignore
        collection(db, "tweets", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      // @ts-ignore
      (snapshot) => setComments(snapshot.docs)
    )
  }, [db, id])
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const uid = auth.currentUser?.uid
      if (user) {
        const fetchUser = async () => {
          // @ts-ignore
          const docRef = doc(db, "users", uid)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            // @ts-ignore
            setCurrentUser(docSnap.data())
          }
        }
        fetchUser()
      }
    })
  }, [])
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-[1080px] max-w-7xl mx-auto ">
        <Sidebar />
        <div className="sm:ml-20 xl:ml-56 border-l border-r border-gray-200 lg:min-w-[720px] flex-grow max-w-2xl">
          <div className="flex items-center py-2 px-3 top-0 sticky z-10 bg-white border-b border-gray-200">
            <div
              className="hoverEffect p-1 mr-2"
              onClick={() => router.push("/")}>
              <ArrowLeftIcon className="h-5 mx-auto mt-3 lg:mx-0 lg:mt-0" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold cursor-pointer">
              Home
            </h2>
          </div>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}>
              <FeedPost key={id} id={id} post={post} />
            </motion.div>
          </AnimatePresence>
          {comments.length > 0 && (
            <>
              <AnimatePresence>
                {comments.map((comment: any) => (
                  <motion.div
                    // @ts-ignore
                    key={comment.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}>
                    <FeedComment
                      commentId={comment.id}
                      orignialPostId={id}
                      comment={comment.data()}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </>
          )}
        </div>
        <Widgets
          newsResults={newsResults.articles}
          userResults={userResults.results}
        />
        <CommentModal />
      </main>
    </div>
  )
}

export default Tweet

export async function getServerSideProps(context: any) {
  const newsResults = await fetch(
    `https://saurav.tech/NewsAPI/everything/cnn.json`
  ).then((res) => res.json())
  const userResults = await fetch(
    "https://randomuser.me/api/?results=10&inc=name,login,picture"
  ).then((res) => res.json())
  return {
    props: {
      newsResults,
      userResults
    }
  }
}
