import Head from "next/head";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { Form, Container, Row } from "react-bootstrap";
import api from "../../services/api";

export default function trainer() {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    try {
      setIsLoading(true);
      const resRole = await api.get(
        "/users/" + sessionStorage.getItem("token")
      );
      setData(resRole.data);
      if (
        resRole.data.roles[0] != "ADMIN" &&
        resRole.data.roles[0] != "TRAINER"
      ) {
        Router.push("/login");
      }
      setIsLoading(false);
    } catch (error) {
      Router.push("/");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {isLoading ? (
        <span>LOADING...</span>
      ) : (
        <>
          <section>
            <div className="container">
              <article>
                <hgroup>
                  <h2>Welcome back, {data.login}!</h2>
                  <h3>Prescribe workouts and manage your clients</h3>
                </hgroup>
                <Row>
                  <p>ai senhor</p>
                </Row>
              </article>
            </div>
          </section>
        </>
      )}
    </>
  );
}
