import { useEffect, useState } from "react";
import { Container, Row, Col, Alert, Form, Card, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import api from "../../services/api";

export function ListClientsAdmin() {
  const [isLoading, setIsLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [modalClient, setModalClient] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [idPatch, setIdPatch] = useState("");
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);

  const handleClosePagClient = () => {
    setIdPatch("");
    setModalClient(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(idPatch);

    const userData = {
      name: name,
      number: number,
      email: email,
    };

    setIsWaitingResponse(true);
    try {
      const res = await api.patch(`/clients/` + idPatch, userData, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      setNumber("");
      setName("");
      setEmail("");
      setIdPatch("");
      window.location.reload(false);
    } catch (error) {
      console.log(JSON.stringify(error));
      setIsWaitingResponse(false);
      toast.error("Patch Error");
    }
    setIsWaitingResponse(false);
  };

  const handleClickUpdate = async (param) => {
    setIdPatch(param);
    console.log(idPatch);
    setModalClient(true);
  };

  const handleClickDelete = async (param) => {
    try {
      const response = await api.delete(`/clients/` + param, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      window.location.reload(false);
    } catch (err) {
      console.log(err);
      toast.error("Couldn't Delete!");
      setIsLoading(false);
    }
  };

  const getClients = async () => {
    try {
      setIsLoading(true);
      console.log(sessionStorage.getItem("token"));
      const response = await api.get(`/clients/`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      console.log(response.data);
      setClients(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <main className="container">
      {isLoading ? (
        <span>LOADING</span>
      ) : (
        <>
          <section>
            <div className="container">
              <article>
                {clients.map((client, i) => (
                  <>
                    <details>
                      <summary>{client.data.name}</summary>
                      <div className="grid">
                        <div>
                          <p>
                            Contatos: {client.data.number} ou{" "}
                            {client.data.email}
                          </p>
                        </div>
                        <div>
                          <ul>
                            <li>
                              <span>Client</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <dl>
                            <dt>
                              <a>
                                <button
                                  onClick={(e) =>
                                    handleClickUpdate(JSON.stringify(client.id))
                                  }
                                >
                                  Update
                                </button>
                              </a>
                            </dt>
                            <dt>
                              <a>
                                <button
                                  className="contrast outline"
                                  onClick={() =>
                                    handleClickDelete(JSON.stringify(client.id))
                                  }
                                >
                                  Deletar
                                </button>
                              </a>
                            </dt>
                          </dl>
                        </div>
                      </div>
                      <Card>
                        <Card.Title>Trainers:</Card.Title>
                        <Card.Body>
                          {client.trainers.map((trainer, i) => (
                            <>
                              <span className="me-1">{trainer.data.name};</span>
                            </>
                          ))}
                        </Card.Body>
                      </Card>
                    </details>
                  </>
                ))}
              </article>
            </div>
          </section>
          <Modal show={modalClient} onHide={handleClosePagClient}>
            <Modal.Header closeButton>
              <Modal.Title>Update a Registered Trainer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <main className="container">
                <h1></h1>
                <article>
                  <Form onSubmit={handleSubmit}>
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
                      value="Update"
                      disabled={isWaitingResponse}
                    />
                  </Form>
                </article>
              </main>
            </Modal.Body>
          </Modal>
        </>
      )}
    </main>
  );
}
