import { useEffect, useState } from "react";
import { Container, Row, Col, Alert, Form, Card, Modal } from "react-bootstrap";
import { ListTrainers } from "../../components/ListTrainers";
import { toast } from "react-toastify";
import api from "../../services/api";
import { ListClients } from "../../components/ListClients";
import { ListWorkouts } from "../../components/ListWorkouts";
import Router from "next/router";

export default function trainer() {
  const [openWorkout, setOpenWorkout] = useState(false);
  const [openTrainer, setOpenTrainer] = useState(false);
  const [openClient, setOpenClient] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleClosePagWorkout = () => setOpenWorkout(false);
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
        if (
          resRole.data.roles[0] != "ADMIN" &&
          resRole.data.roles[0] != "CLIENT"
        ) {
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
                  <h2>Welcome back, {data.login}!</h2>
                  <h3>Begin to organize your fitness life</h3>
                </hgroup>

                <button onClick={(e) => setOpenWorkout(true)}>
                  My Workout
                </button>
                <Row>
                  <Col>
                    <button onClick={(e) => setOpenTrainer(true)}>
                      Trainers on our platform
                    </button>
                  </Col>
                  <Col>
                    <button onClick={(e) => setOpenClient(true)}>
                      See other Clients
                    </button>
                  </Col>
                </Row>
              </article>
            </div>
          </section>
          <Modal show={openWorkout} onHide={handleClosePagWorkout}>
            <Modal.Header closeButton>
              <Modal.Title>Workouts</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ListWorkouts />
            </Modal.Body>
          </Modal>
          <Modal show={openTrainer} onHide={handleClosePagTrainer}>
            <Modal.Header closeButton>
              <Modal.Title>Trainers</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ListTrainers />
            </Modal.Body>
          </Modal>
          <Modal show={openClient} onHide={handleClosePagClient}>
            <Modal.Header closeButton>
              <Modal.Title>Client</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ListClients />
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
}
