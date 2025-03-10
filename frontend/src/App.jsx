import React, { useEffect, useState } from "react";
import supabase from "./supabase";

function App() {
  const [user, setUser] = useState(null);

  const signInWithTwitter = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "twitter",
    });

    if (error) console.error("Login Error:", error);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => authListener?.subscription.unsubscribe();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Twitter OAuth with Supabase</h1>
      {user ? (
        <p>Welcome, {user.email}</p>
      ) : (
        <button onClick={signInWithTwitter}>Login with Twitter</button>
      )}
    </div>
  );
}

export default App;
