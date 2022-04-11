import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../src/styles";

export interface ILogin {
  email?: string;
  passowrd?: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState<ILogin>({});
  const [windowHeight, setWindowHeight] = useState(100);

  useEffect(() => {
    if (window) {
      setWindowHeight(window.innerHeight);
    }
  }, []);

  const handleLogin = async (credentials: ILogin) => {
    await localStorage.setItem("user", JSON.stringify(credentials));
    router.push("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: windowHeight,
        width: "100%",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <input
        type="text"
        placeholder="Email"
        style={styles.input}
        onChange={({ target: { value } }) =>
          setCredentials((oldVal) => ({ ...oldVal, email: value }))
        }
      />
      <input
        type="password"
        placeholder="Password"
        style={styles.input}
        onChange={({ target: { value } }) =>
          setCredentials((oldVal) => ({ ...oldVal, password: value }))
        }
      />
      <button style={styles.button} onClick={() => handleLogin(credentials)}>
        Login
      </button>
    </div>
  );
};

export default Login;
