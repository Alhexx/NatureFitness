import { useEffect, useState } from "react";
import { Container, Row, Col, Alert, Form, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import api from "../../services/api";

export function ListTrainers() {
  const [isLoading, setIsLoading] = useState(false);
  const [trainers, setTrainers] = useState([]);

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
              <hgroup>
                <h1>
                  At Nature Fitness we have a large number of professionals who
                  contribuite to our community:
                </h1>
              </hgroup>

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
      )}
    </main>
  );
}
