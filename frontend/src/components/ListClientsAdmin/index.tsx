import { useEffect, useState } from "react";
import { Container, Row, Col, Alert, Form, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import api from "../../services/api";

export function ListClientsAdmin() {
  const [isLoading, setIsLoading] = useState(false);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function getWorkers() {
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
        err.response?.data?.errors
          ? err.response.data.errors.map((error) => toast.error(error))
          : toast.error(err.message);
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
              {clients.map((client, i) => (
                <>
                  <details>
                    <summary>{client.data.name}</summary>
                    <div className="grid">
                      <div>
                        <p>
                          Contatos: {client.data.number} ou {client.data.email}
                        </p>
                      </div>
                      <div>
                        <ul>
                          <li>
                            <span>Client</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <Card>
                      <Card.Title>Clientes:</Card.Title>
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
      )}
    </main>
  );
}
