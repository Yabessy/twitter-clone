import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { Feed, Sidebar, Widgets } from "../components"

const Home: NextPage = ({ newsResults, userResults }: any) => {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-[1080px] max-w-7xl mx-auto ">
        <Sidebar />
        <Feed />
        <Widgets newsResults={newsResults.articles} userResults={userResults.results}/>
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
