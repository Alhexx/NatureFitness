import { useEffect, useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import api from "../../services/api";
import Router from "next/router";
import { ListTrainersAdmin } from "../../components/ListTrainersAdmin";
import { ListClientsAdmin } from "../../components/ListClientsAdmin";
import { FaPlus } from "react-icons/fa";

export default function trainer() {
  const [modalClient, setModalClient] = useState(false);
  const [modalTrainer, setModalTrainer] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const handleClosePagTrainer = () => {
    setNumber("");
    setName("");
    setEmail("");
    setModalTrainer(false);
  };
  const handleClosePagClient = () => {
    setNumber("");
    setName("");
    setEmail("");
    setModalClient(false);
  };

  const handleSubmitClient = async (event) => {
    event.preventDefault();

    const userData = {
      data: {
        name: name,
        number: number,
        email: email,
      },
    };

    setIsWaitingResponse(true);
    try {
      const res = await api.post(`/clients/`, userData, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      setNumber("");
      setName("");
      setEmail("");
      window.location.reload(false);
    } catch (error) {
      console.log(JSON.stringify(error));
      setIsWaitingResponse(false);
      alert("Patch Error");
    }
    setIsWaitingResponse(false);
  };

  const handleSubmitTrainer = async (event) => {
    event.preventDefault();

    const userData = {
      data: {
        name: name,
        number: number,
        email: email,
      },
    };

    setIsWaitingResponse(true);
    try {
      const res = await api.post(`/trainers/`, userData, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      setNumber("");
      setName("");
      setEmail("");
      window.location.reload(false);
    } catch (error) {
      console.log(JSON.stringify(error));
      setIsWaitingResponse(false);
      alert("Patch Error");
    }
    setIsWaitingResponse(false);
  };

  const getData = async () => {
    try {
      setIsLoading(true);
      const resRole = await api.get(
        "/users/" + sessionStorage.getItem("token")
      );
      setData(resRole.data);
      console.log(resRole.data.roles[0]);
      if (resRole.data.roles[0] != "ADMIN") {
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
                  <h1>ADMIN PAGE:</h1>
                </hgroup>

                <details>
                  <summary style={{ display: "flex" }}>
                    <p>Trainers</p>
                    <Col>
                      <Button
                        variant="success"
                        size="sm"
                        style={{
                          width: "1.5rem",
                          height: "1.5rem",
                          padding: "0",
                          marginLeft: "2%",
                        }}
                        onClick={(e) => setModalTrainer(true)}
                      >
                        <FaPlus />
                      </Button>
                    </Col>
                  </summary>
                  <div className="grid">
                    <div>
                      <ListTrainersAdmin />
                    </div>
                  </div>
                </details>
                <details>
                  <summary style={{ display: "flex" }}>
                    <p>Clients</p>
                    <Col>
                      <Button
                        variant="success"
                        size="sm"
                        style={{
                          width: "1.5rem",
                          height: "1.5rem",
                          padding: "0",
                          marginLeft: "2%",
                        }}
                        onClick={(e) => setModalClient(true)}
                      >
                        <FaPlus />
                      </Button>
                    </Col>
                  </summary>
                  <div className="grid">
                    <div>
                      <ListClientsAdmin />
                    </div>
                  </div>
                </details>
                <div className="grid">
                  <a href="/">
                    <button>Trainers Page</button>
                  </a>

                  <a href="/client">
                    <button>Clients Page</button>
                  </a>
                </div>
              </article>
            </div>
          </section>

          <Modal show={modalClient} onHide={handleClosePagClient}>
            <Modal.Header closeButton>
              <Modal.Title>Register a New Client</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <main className="container">
                <h1></h1>
                <article>
                  <Form onSubmit={handleSubmitClient}>
                    <label htmlFor="NAME">Name</label>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                    />
                    <label htmlFor="EMAIL">Email</label>
                    <Form.Control
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                    <label htmlFor="NUMBER">Number</label>
                    <Form.Control
                      type="text"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      placeholder="Number"
                    />

                    <input
                      type="submit"
                      value="Add"
                      disabled={isWaitingResponse}
                    />
                  </Form>
                </article>
              </main>
            </Modal.Body>
          </Modal>
          <Modal show={modalTrainer} onHide={handleClosePagTrainer}>
            <Modal.Header closeButton>
              <Modal.Title>Register a New Trainer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <main className="container">
                <h1></h1>
                <article>
                  <Form onSubmit={handleSubmitTrainer}>
                    <label htmlFor="NAME">Name</label>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                    />
                    <label htmlFor="EMAIL">Email</label>
                    <Form.Control
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                    <label htmlFor="NUMBER">Number</label>
                    <Form.Control
                      type="text"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      placeholder="Number"
                    />

                    <input
                      type="submit"
                      value="Add"
                      disabled={isWaitingResponse}
                    />
                  </Form>
                </article>
              </main>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
}
