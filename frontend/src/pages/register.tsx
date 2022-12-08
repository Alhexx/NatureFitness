import Head from "next/head";
import Router from "next/router";
import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import api from "../services/api";
import style from "../styles/register.module.scss";
import { backend_url } from "../../utils/conf";
import { toast } from "react-toastify";

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
  const [emailC, setEmailC] = useState("");
  const [nameC, setNameC] = useState("");
  const [numberC, setNumberC] = useState("");
  const [usernameC, setUsernameC] = useState("");
  const [passwordC, setPasswordC] = useState("");
  const [passwordconfC, setPasswordconfC] = useState("");
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);

  //envio das informações para o backend
  const handleSubmitClient = async (event) => {
    event.preventDefault();
    const userData = {
      login: usernameC,
      password: passwordC,
      client: true,
      trainer: false,
      admin: false,
      data: {
        name: nameC,
        email: emailC,
        number: numberC,
      },
    };

    if (passwordC == passwordconfC) {
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
        toast.error("Cadastration error!");
      }
      setIsWaitingResponse(false);
    } else toast.error("Divergence on password!");
  };

  const handleSubmitTrainer = async (event) => {
    event.preventDefault();
    const userData = {
      login: username,
      password: password,
      client: false,
      trainer: true,
      admin: false,
      data: {
        name: name,
        email: email,
        number: number,
      },
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
        toast.error("Cadastration error!");
      }
      setIsWaitingResponse(false);
    } else toast.error("Divergence on password!");
  };

  return (
    <main className="container">
      <section>
        <Row>
          <Col>
            <div className="container">
              <article>
                <details>
                  <summary>Resgister as Client</summary>
                  <div className="grid">
                    <div>
                      <form
                        className={style.form}
                        onSubmit={handleSubmitClient}
                      >
                        <Row>
                          <Col>
                            <label htmlFor="NAME">Name</label>
                            <input
                              type="text"
                              name="NAMe"
                              onChange={(event) => setNameC(event.target.value)}
                              value={nameC}
                              required
                            />
                            <label htmlFor="USERNAME">Username</label>
                            <input
                              type="text"
                              name="USERNAME"
                              onChange={(event) =>
                                setUsernameC(event.target.value)
                              }
                              value={usernameC}
                              required
                            />
                            <label htmlFor="EMAIL">EMAIL</label>
                            <input
                              type="text"
                              name="EMAIL"
                              onChange={(event) =>
                                setEmailC(event.target.value)
                              }
                              value={emailC}
                              required
                            />
                          </Col>
                          <Col>
                            <label htmlFor="NUMBER">Number</label>
                            <input
                              type="text"
                              name="NUMBER"
                              onChange={(event) =>
                                setNumberC(event.target.value)
                              }
                              value={numberC}
                              required
                            />
                            <label htmlFor="PASSWORD">PASSWORD</label>
                            <input
                              type="password"
                              name="PASSWORD"
                              value={passwordC}
                              onChange={(event) =>
                                setPasswordC(event.target.value)
                              }
                              required
                            />
                            <label htmlFor="PASSWORDCONF">
                              CONFIRM PASSWORD
                            </label>
                            <input
                              type="password"
                              name="PASSWORDCONF"
                              value={passwordconfC}
                              onChange={(event) =>
                                setPasswordconfC(event.target.value)
                              }
                              required
                            />
                          </Col>
                        </Row>
                        <input
                          className={style.submit}
                          type="submit"
                          value="Register as Client"
                          disabled={isWaitingResponse}
                        />
                      </form>
                    </div>
                  </div>
                </details>
              </article>
            </div>
          </Col>
          <Col>
            <div className="container">
              <article>
                <details>
                  <summary>Resgister as Trainer</summary>
                  <div className="grid">
                    <div>
                      <div>
                        <form
                          className={style.form}
                          onSubmit={handleSubmitTrainer}
                        >
                          <Row>
                            <Col>
                              <label htmlFor="NAME">Name</label>
                              <input
                                type="text"
                                name="NAMe"
                                onChange={(event) =>
                                  setName(event.target.value)
                                }
                                value={name}
                                required
                              />
                              <label htmlFor="USERNAME">Username</label>
                              <input
                                type="text"
                                name="USERNAME"
                                onChange={(event) =>
                                  setUsername(event.target.value)
                                }
                                value={username}
                                required
                              />
                              <label htmlFor="EMAIL">EMAIL</label>
                              <input
                                type="text"
                                name="EMAIL"
                                onChange={(event) =>
                                  setEmail(event.target.value)
                                }
                                value={email}
                                required
                              />
                            </Col>
                            <Col>
                              <label htmlFor="NUMBER">Number</label>
                              <input
                                type="text"
                                name="NUMBER"
                                onChange={(event) =>
                                  setNumber(event.target.value)
                                }
                                value={number}
                                required
                              />
                              <label htmlFor="PASSWORD">PASSWORD</label>
                              <input
                                type="password"
                                name="PASSWORD"
                                value={password}
                                onChange={(event) =>
                                  setPassword(event.target.value)
                                }
                                required
                              />
                              <label htmlFor="PASSWORDCONF">
                                CONFIRM PASSWORD
                              </label>
                              <input
                                type="password"
                                name="PASSWORDCONF"
                                value={passwordconf}
                                onChange={(event) =>
                                  setPasswordconf(event.target.value)
                                }
                                required
                              />
                            </Col>
                          </Row>
                          <input
                            className={style.submit}
                            type="submit"
                            value="Register as Trainer"
                            disabled={isWaitingResponse}
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </details>
              </article>
            </div>
          </Col>
        </Row>
      </section>
    </main>
  );
}
