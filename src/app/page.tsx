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
        You are signed in!
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  } else {
    return (
      <>
        <h1>Not signed in</h1>
        <button onClick={() => signIn("google")}>Sign in with google</button>
        <button onClick={() => signIn("yandex")}>Sign in with Yandex</button>
        <button onClick={() => signIn("github")}>Sign in with github</button>
      </>
    );
  }
}
