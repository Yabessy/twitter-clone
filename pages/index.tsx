import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { Sidebar } from "../components"

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen max-w-7xl mx-auto ">
        <Sidebar />
      </main>
    </div>
  )
}

export default Home
