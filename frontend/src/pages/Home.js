/* eslint-disable jsx-a11y/img-redundant-alt */
import { Box, styled } from "@mui/material";
import "../styles/Home.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import AuthForm from "../components/AuthForm";

const Component = styled(Box)`
  background: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default function Home() {
  return (
    <Component>
      <Container>
        <Row>
          <Col xs={6} className="left-grid">
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
    </Component>
  );
}
