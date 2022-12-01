import { Container, Row, Col, Alert, Form, Card } from "react-bootstrap";

export default function Home() {
  return (
    <>
      <section>
        <div className="container">
          <article>
            <hgroup>
              <h2>Hop on</h2>
              <h3>Begin to organize your fitness life</h3>
            </hgroup>
            <div className="grid">
              <a href="/register">
                <button>Subscribe</button>
              </a>

              <a href="/login">
                <button>Login</button>
              </a>
            </div>
            <hgroup>
              <h3>
                To have access to all the neat features that naturefitness has
                you must login or register.
              </h3>
            </hgroup>
          </article>
        </div>
      </section>

      <main className="container">
        <section>
          <hgroup>
            <h2>
              We count with many professionals who are qualified to assist with
              your fitness life
            </h2>
          </hgroup>
          <p>
            Physical well-being proves to be very important not only
            individually, but also in the way in which man interacts with the
            world, be healthy and make the world healthier.
          </p>
        </section>
      </main>
    </>
  );
}
