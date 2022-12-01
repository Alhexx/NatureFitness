import Head from "next/head";
import Router from "next/router";
import React, { useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import api from "../services/api";
import style from "../styles/login.module.scss";
import Link from "next/link";
import { backend_url } from "../../utils/conf";

export default function register() {
  // muda de client para change password
  const [page, setPage] = useState("client");
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

    if (page == "client") {
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
    } else if (page == "trainers") {
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
    <>
      <div className="hero">
        <header className="container">
          <hgroup>
            <h1>Nature Fitness</h1>
            <h2>Fitness never has so green</h2>
          </hgroup>
          <p>
            <a href="#" role="button">
              Build your training!!!
            </a>
          </p>
        </header>
      </div>
      <main className="container">
        <section>
          <hgroup>
            <h2>
              We count with many professionals who are qualified to assist with
              your fitness life
            </h2>
          </hgroup>
          <p>
            Physical well-being proves to be very important not only
            individually, but also in the way in which man interacts with the
            world, be healthy and make the world healthier.
          </p>
        </section>
        <a href="trainer/getListTrainers">
          <button>Open Trainer List</button>
        </a>
        <a href="client/getListClients">
          <button>Open Client List</button>
        </a>
        <a href="routine/getListRoutines">
          <button>Open Routine List</button>
        </a>
        <a href="workout/getListWorkouts">
          <button>Open Workout List</button>
        </a>
        <a href="exercise/getListExercises">
          <button>Open Exercise List</button>
        </a>
      </main>
      <section aria-label="Subscribe example">
        <div className="container">
          <article>
            <hgroup>
              <h2>Subscribe</h2>
              <h3>Begin to organize your fitness life</h3>
            </hgroup>
            <div className="grid">
              <a href="trainer/showFormTrainer">
                <button>Subscribe as Trainer</button>
              </a>
              <a href="client/showFormClient">
                <button>Subscribe as Client</button>
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
