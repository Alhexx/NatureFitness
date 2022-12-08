import { useEffect, useState } from "react";
import { Container, Row, Col, Alert, Form, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import api from "../../services/api";

export function ListWorkouts() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  const getWorkers = async () => {
    try {
      setIsLoading(true);

      const responseUser = await api.get(
        "/users/" + sessionStorage.getItem("token")
      );
      const responseClient = await api.get(
        `/clients/` + responseUser.data.roleEntity,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );
      console.log(responseClient.data);
      setData(responseClient.data.data);
      setWorkouts(responseClient.data.workouts);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  useEffect(() => {
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
                  {data.name}, here you'll find the workouts our trainers made
                  specifically for you
                </h1>
              </hgroup>

              {workouts.map((workout, i) => (
                <>
                  <details>
                    <summary>{workout.title}</summary>
                    <div className="grid">
                      {workout.items.map((item, i) => (
                        <>
                          <details>
                            <summary>Item {i + 1}</summary>
                            <Row>
                              <Col>
                                <ul>
                                  <li>
                                    {item.duration != null ? (
                                      <span>Duration: {item.duration}</span>
                                    ) : (
                                      <span>Repetitions: {item.reps}</span>
                                    )}
                                  </li>
                                  <li>Exercise: {item.exercise.name}</li>
                                  <li>Exercise: {item.exercise.description}</li>
                                </ul>
                              </Col>
                            </Row>
                          </details>
                        </>
                      ))}
                    </div>
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
