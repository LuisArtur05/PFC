// src/pages/Dashboard.jsx
import React from 'react';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import CustomNavbar from '../components/Navbar';

const Dashboard = () => {
    return (
      <>
        <CustomNavbar />
        <Container fluid className="min-vh-100 d-flex flex-column">
        <Row className="flex-grow-1">
          <Col md={4} className="d-flex justify-content-center align-items-center">
            <Card className="w-100">
              <Card.Body>
                <Card.Title>Alimentos por Caducar</Card.Title>
                <Card.Text>5 productos</Card.Text>
                <Button variant="warning">Ver Lista</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="d-flex justify-content-center align-items-center">
            <Card className="w-100">
              <Card.Body>
                <Card.Title>Lista de Compra</Card.Title>
                <Card.Text>3 items pendientes</Card.Text>
                <Button variant="success">Generar</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      </>
    );
  }

export default Dashboard;
