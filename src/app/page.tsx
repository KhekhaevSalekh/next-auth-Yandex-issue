'use client'
import { useSession, signIn, signOut } from "next-auth/react";

export default function ProtectedPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <>
        <h1>Signed in as {session.user?.email}</h1>
        <h1>Сессия есть вы на главной</h1>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  } else {
    return (
      <>
        <h1>Not signed in</h1>
        <button onClick={() => signIn("google",{redirect:true, callbackUrl:'/'})}>Sign in with google</button>
        <button onClick={() => signIn("yandex",{redirect:false, callbackUrl:'/'}).then((response) => {
          console.log('rrrrr', response)
        if (response.url) {
          window.location.assign(response.url); // This handles the post-sign-in redirect
        }
      })}>Sign in with Yandex</button>
        <button onClick={() => signIn("github")}>Sign in with github</button>
      </>
    );
  }
}
