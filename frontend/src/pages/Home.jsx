import "../styles/Home.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import AuthForm from "../components/AuthForm";

export default function Home() {
  return (
    <Container>
      <Row>
        <Col className="left-grid">
          <img
            class="title-image"
            src={"/images/firsync-home.png"}
            alt="Logo"
          />
        </Col>
        <Col className="right-grid">
          <AuthForm />
        </Col>
      </Row>
    </Container>
  );
}
