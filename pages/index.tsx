import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../src/styles";
import SendMessage from "../components/SendMessage";

const Homepage: NextPage = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [windowHeight, setWindowHeight] = useState(100);

  useEffect(() => {
    if (window) {
      setWindowHeight(window.innerHeight);
    }
  }, []);

  //check if user is logged in
  useEffect(() => {
    (async () => {
      const user = await localStorage.getItem("user");
      if (user) {
        setIsLoggedIn(true);
      }
    })();
  }, []);

  const handleLogout = async () => {
    await localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <div style={{ flex: 1, width: "100%", height: "100%" }}>
      {/*LOGGED IN */}
      {isLoggedIn && (
        <main
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100%",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h2>Send a message to someone!</h2>
          <button
            style={{
              ...styles.button,
              position: "absolute",
              right: 0,
              top: 0,
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
          <SendMessage />
        </main>
      )}

      {/* NOT LOGGED IN */}
      {!isLoggedIn && (
        <main
          style={{
            display: "flex",
            justifyContent: "center",
            height: windowHeight,
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h2>Ready to try Twilio conversations?</h2>
          <button style={styles.button} onClick={() => router.push("/login")}>
            Login
          </button>
        </main>
      )}
    </div>
  );
};

export default Homepage;
