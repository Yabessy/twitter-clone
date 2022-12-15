import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { getDoc, doc } from "firebase/firestore"
import type { NextPage } from "next"
import Head from "next/head"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { CommentModal, Feed, Sidebar, Widgets } from "../components"
import { userState } from "../components/atom/userAtom"
import { auth, db } from "../firebase"

const Home: NextPage = ({ newsResults, userResults }: any) => {
  const [currentUser, setCurrentUser] = useRecoilState(userState)
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
        <Feed />
        <Widgets
          newsResults={newsResults.articles}
          userResults={userResults.results}
        />
        <CommentModal />
      </main>
    </div>
  )
}

export default Home

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
