import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

import Dashboard from "./Dashboard";

export default function Home() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  // Redirect users based on session status
  useEffect(() => {
    if (sessionData) {
      // Redirect to the dashboard page if the user is logged in
      router.push("/dashboard").catch((error) => {
        // Handle the error if the redirection fails
        console.error("Failed to redirect to the dashboard:", error);
      });
    }
  }, [sessionData, router]);

  // Render content for the home/login page
return (
    <div>
        {/* Your home/login page content goes here */}
        <h1>Welcome to FIRSync</h1>
        <button onClick={() => signIn()}>Sign In</button>
    </div>
);
}
