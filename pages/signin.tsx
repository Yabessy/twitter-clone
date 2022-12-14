import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { auth, db } from "../firebase";

export default function signin() {
    const router = useRouter()
    async function onGoogleClick() {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user
        const docRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists()) {
          await setDoc(docRef, {
            name: user.displayName,
            email: user.email,
            userImg: user.photoURL,
            uid: user.uid,
            timestamp: serverTimestamp(),
            username: user.displayName?.split(" ").join("").toLocaleLowerCase()
          })
        }
        router.push("/")
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
      })
  }
  return (
    <div className="flex flex-col items-center w-screen">
      <img
        src="https://cdn0.iconfinder.com/data/icons/popular-social-media-colored/48/JD-14-512.png"
        alt=""
        width={500}
      />
        <div className="">
          <p className="italic text-lg">This App is created for learning purpose</p>
          <button className="w-full py-2 px-5 bg-sky-100 text-blue-500 rounded-xl" onClick={()=>onGoogleClick()}>SignIn with Google</button>
        </div>
    </div>
  )
}
