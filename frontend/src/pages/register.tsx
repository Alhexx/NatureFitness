import Head from "next/head";
import Router from "next/router";
import React, { useState } from "react";
import { Container, Row, Col, Alert, Form } from "react-bootstrap";
import api from "../services/api";
import style from "../styles/login.module.scss";
import Link from "next/link";
import { backend_url } from "../../utils/conf";
import { stringify } from "querystring";

export default function register() {
  // muda de client para change password
  const [role, setRole] = useState("client");
  // inputs do formulário
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordconf, setPasswordconf] = useState("");
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);

  //envio das informações para o backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (role == "client") {
      //se estiver no client

      const userData = {
        login: username,
        password: password,
        client: true,
        trainer: false,
        admin: false,
      };

      if (password == passwordconf) {
        setIsWaitingResponse(true);
        try {
          console.log(JSON.stringify(userData));
          await api.post(backend_url + "/users", userData, {
            headers: { "content-type": "application/json" },
          });
        } catch (error) {
          console.log(JSON.stringify(error));
          setIsWaitingResponse(false);
          alert("Cadastration error!");
        }
        setIsWaitingResponse(false);
      } else alert("Divergence on password!");
    } else if (role == "trainers") {
      const userData = {
        login: username,
        password: password,
        client: false,
        trainer: true,
        admin: false,
      };
      if (password == passwordconf) {
        setIsWaitingResponse(true);
        try {
          console.log(JSON.stringify(userData));
          await api.post(backend_url + "/users", userData, {
            headers: { "content-type": "application/json" },
          });
        } catch (error) {
          console.log(JSON.stringify(error));
          setIsWaitingResponse(false);
          alert("Cadastration error!");
        }
        setIsWaitingResponse(false);
      } else alert("Divergence on password!");
    }
  };

  //mudando o valor das variáveis
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const onChangePasswordconf = (event) => {
    setPasswordconf(event.target.value);
  };

  return (
    <div>
      <Head>
        <title>NatureFitness</title>
        <meta name="Register" content="Naturefitness" />
      </Head>
      <Container className={style.container}>
        <hgroup>
          <h1>Register</h1>
          <h2>To begin organizing your fitness life</h2>
        </hgroup>
        <div className={style.row}>
          <form className={style.form} onSubmit={handleSubmit}>
            <label htmlFor="USERNAME">Username</label>
            <input
              type="text"
              name="USERNAME"
              onChange={onChangeUsername}
              value={username}
              required
            />
            <label htmlFor="PASSWORD">PASSWORD</label>
            <input
              type="password"
              name="PASSWORD"
              value={password}
              onChange={onChangePassword}
              required
            />
            <label htmlFor="PASSWORDCONF">CONFIRM PASSWORD</label>
            <input
              type="password"
              name="PASSWORDCONF"
              value={passwordconf}
              onChange={onChangePasswordconf}
              required
            />
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  value="client"
                  onClick={(e) => setRole("client")}
                  checked
                />
                <label className="form-check-label">Client</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  value="trainer"
                  onClick={(e) => setRole("trainer")}
                />
                <label className="form-check-label">Trainer</label>
              </div>
            </div>
            <input
              className={style.submit}
              type="submit"
              value="Register"
              disabled={isWaitingResponse}
            />
          </form>
        </div>
      </Container>
    </div>
  );
}
