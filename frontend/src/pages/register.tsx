import Head from "next/head";
import Router from "next/router";
import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import api from "../services/api";
import style from "../styles/login.module.scss";
import { backend_url } from "../../utils/conf";

export default function register() {
  // muda de client para change password
  const [role, setRole] = useState("");
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
        console.log(role);
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
    } else if (role == "trainer") {
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

  const onChangeRole = (e) => {
    setRole(e.target.value);
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
            <Row>
              <Col>
                <Form.Check
                  type="radio"
                  label="Trainer"
                  value={"trainer"}
                  onChange={onChangeRole}
                />
              </Col>
              <Col>
                <Form.Check
                  type="radio"
                  label="Client"
                  value={"client"}
                  onChange={onChangeRole}
                />
              </Col>
            </Row>
            {console.log(role)}
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
