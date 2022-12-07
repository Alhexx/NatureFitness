import Head from "next/head";
import Router from "next/router";
import React, { useState } from "react";
import api from "../services/api";
import style from "../styles/login.module.scss";

import { Form, Container } from "react-bootstrap";

export default function login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);

  //envio das informações para o backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      login: username,
      password: password,
    };
    var res;
    setIsWaitingResponse(true);
    try {
      res = await api.post("/users/token", userData, {
        headers: { "content-type": "application/json" },
      });
      console.log(res);
      sessionStorage.setItem("token", res.data.token);
      try {
        const resRole = await api.get("/users/" + res.data.token);
        switch (resRole.data.roles[0]) {
          case "ADMIN": {
            Router.push("/admin");
            break;
          }
          case "TRAINER": {
            console.log("TRAINER");
            break;
          }
          case "CLIENT": {
            Router.push("/client");
            break;
          }
          default: {
            alert("No assigned role. Please contact administration!");
            break;
          }
        }
      } catch (error) {
        console.log(JSON.stringify(error));
        alert("No assigned role. Please contact administration!");
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      setIsWaitingResponse(false);
      alert("Login error!");
    }
    setIsWaitingResponse(false);
  };

  return (
    <div>
      <Head>
        <title>NatureFitness</title>
        <meta name="Sign in" content="Naturefitness" />
      </Head>
      <Container className={style.container}>
        <hgroup>
          <h1>Sign in</h1>
          <h2>To begin organizing your fitness life</h2>
        </hgroup>
        <div className={style.row}>
          <form className={style.form} onSubmit={handleSubmit}>
            <label htmlFor="USERNAME">Username</label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
              aria-label="Login"
              aria-describedby="basic-addon1"
            />
            <label htmlFor="PASSWORD">PASSWORD</label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              aria-label="password"
              aria-describedby="basic-addon1"
            />

            <input
              className={style.submit}
              type="submit"
              value="Sign in"
              disabled={isWaitingResponse}
            />
          </form>
        </div>
      </Container>
    </div>
  );
}
