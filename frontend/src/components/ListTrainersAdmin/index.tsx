import { useEffect, useState } from "react";
import { Container, Row, Col, Alert, Form, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import trainer from "../../pages/admin";
import api from "../../services/api";

export function ListTrainersAdmin() {
  const [isLoading, setIsLoading] = useState(false);
  const [trainers, setTrainers] = useState([]);

  const handleClickDelete = async (value) => {
    console.log("teste" + value.data);
  };

  useEffect(() => {
    async function getWorkers() {
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
    }

    getWorkers();
  }, []);

  return (
    <main className="container">
      {isLoading ? (
        <span>LOADING</span>
      ) : (
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
                              <button>Update</button>
                            </a>
                          </dt>
                          <dt>
                            <a>
                              <button
                                className="contrast outline"
                                value={trainer.id}
                                onClick={(value) => handleClickDelete(value)}
                              >
                                Deletar
                              </button>
                            </a>
                          </dt>
                        </dl>
                      </div>
                    </div>
                    <Card>
                      <Card.Title>Clientes:</Card.Title>
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
      )}
    </main>
  );
}
