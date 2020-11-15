import styles from "../styles/Home.module.css";
import React, { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import API from "../utils/API";
import Link from "next/link";

const cookie = new Cookies();

export default function Home() {
  const [loginData, setLoginData] = useState({});
  const [tokenState, setTokenState] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleChange = (name, value) => {
    setLoginData({ ...loginData, [name]: value });
  };

  useEffect(() => {
    const id = setInterval(() => {
      console.log("calling api...");
      callAPI();
    }, 5000);
    return () => clearInterval(id);
  });

  const callAPI = () => {
    API.get("/token/ping", {
      headers: {
        Authorization: tokenState
      }
    })
    .then(res => res.data.status === 401 && setIsValid(false))
  }

  const onClick = async () => {
    const res = await API.post("/user/login", loginData.email && loginData.password ? {
      ...loginData
    } : {email: "", password: ""});
    if(res.data.status === 200){
      setTokenState(res.data.token);
      setIsValid(true);
      cookie.set("token", res.data.token);
      console.log("sikeres bejelentkezés");
    }
    else{
      window.alert(res.data.msg);
    }
  }

  return (
    <div className={styles.container}>
      <Link href="/secret">
        <a>Go to this secret Page!</a>
      </Link>
      <p>Token: {isValid ? "Valid Token" : "INVALID TOKEN!"}</p>
      <h3>Login</h3>
      <label>E-mail</label>
      <input
        name="email"
        type="text"
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />
      <label>Password</label>
      <input
        name="password"
        type="password"
        onChange={(e) => handleChange(e.target.name, e.target.value)}
      />
      <button style={{ margin: "20px 0" }} onClick={() => onClick()}>Login!</button>
    </div>
  );
}
