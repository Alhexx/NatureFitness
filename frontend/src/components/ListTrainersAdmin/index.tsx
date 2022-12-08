import { useEffect, useState } from "react";
import { Card, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import trainer from "../../pages/admin";
import api from "../../services/api";

export function ListTrainersAdmin() {
  const [isLoading, setIsLoading] = useState(false);
  const [trainers, setTrainers] = useState([]);
  const [modalTrainer, setModalTrainer] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [idPatch, setIdPatch] = useState("");
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);

  const handleClosePagTrainer = () => {
    setIdPatch("");
    setModalTrainer(false);
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
      const res = await api.patch(`/trainers/` + idPatch, userData, {
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
      alert("Patch Error");
    }
    setIsWaitingResponse(false);
  };

  const handleClickDelete = async (param) => {
    try {
      const response = await api.delete(`/trainers/` + param, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      window.location.reload(false);
    } catch (err) {
      console.log(err);
      alert("Couldn't Delete!");
      setIsLoading(false);
    }
  };
  const handleClickUpdate = async (param) => {
    setIdPatch(param);
    console.log(idPatch);
    setModalTrainer(true);
  };

  const getTrainers = async () => {
    try {
      setIsLoading(true);
      console.log(sessionStorage.getItem("token"));
      const response = await api.get(`/trainers/`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      console.log(response.data);
      setTrainers(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTrainers();
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
                {trainers.map((trainer, i) => (
                  <>
                    <details>
                      <summary>{trainer.data.name}</summary>
                      <div className="grid">
                        <div>
                          <p>
                            Contatos: {trainer.data.number} ou{" "}
                            {trainer.data.email}
                          </p>
                        </div>
                        <div>
                          <ul>
                            <li>
                              <span>Personal Trainer</span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <dl>
                            <dt>
                              <a>
                                <button
                                  onClick={(e) =>
                                    handleClickUpdate(
                                      JSON.stringify(trainer.id)
                                    )
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
                                    handleClickDelete(
                                      JSON.stringify(trainer.id)
                                    )
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
                        <Card.Title>Clients:</Card.Title>
                        <Card.Body>
                          {trainer.clients.map((client, i) => (
                            <>
                              <span className="me-1">{client.data.name};</span>
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

          <Modal show={modalTrainer} onHide={handleClosePagTrainer}>
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
