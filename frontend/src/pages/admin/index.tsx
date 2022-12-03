import { useEffect, useState } from "react";
import { Container, Row, Col, Alert, Form, Card, Modal } from "react-bootstrap";
import { ListTrainers } from "../../components/ListTrainers";
import { toast } from "react-toastify";
import api from "../../services/api";
import { ListClients } from "../../components/ListClients";
import Router from "next/router";
import { ListTrainersAdmin } from "../../components/ListTrainersAdmin";
import { ListClientsAdmin } from "../../components/ListClientsAdmin";

export default function trainer() {
  const [openTrainer, setOpenTrainer] = useState(false);
  const [openClient, setOpenClient] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleClosePagTrainer = () => setOpenTrainer(false);
  const handleClosePagClient = () => setOpenClient(false);

  useEffect(() => {
    async function getData() {
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
    }

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
                  <h1>
                    At Nature Fitness we have a large number of professionals
                    who contribuite to our community:
                  </h1>
                </hgroup>

                <details>
                  <summary>Trainers</summary>
                  <div className="grid">
                    <div>
                      <ListTrainersAdmin />
                    </div>
                  </div>
                </details>
                <details>
                  <summary>Clients</summary>
                  <div className="grid">
                    <div>
                      <ListClientsAdmin />
                    </div>
                  </div>
                </details>
              </article>
            </div>
          </section>
        </>
      )}
    </>
  );
}
