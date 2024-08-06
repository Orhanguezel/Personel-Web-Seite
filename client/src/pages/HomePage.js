import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './HomePage.css';
// import your icons here...

function HomePage() {
    return (
        <div>
            <div className="hero">
                <Container>
                    <Row className="justify-content-md-center text-center">
                        <Col md="auto">
                            <h1>Willkommen bei Güzel Web Design</h1>
                            <p>
                                Wir spezialisieren uns auf Webdesign, maßgeschneiderte Softwareentwicklung und mobile Anwendungen.
                            </p>
                            <Button variant="primary" href="/projects" className="mt-3">Unsere Projekte ansehen</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container className="summary-sections">
                <Row>
                    <Col md={4}>
                        <Card className="text-center summary-card">
                            <Card.Body>
                                <Card.Title>Über uns</Card.Title>
                                <Card.Text>
                                    Erfahren Sie mehr über unser Team und unsere Fähigkeiten.
                                </Card.Text>
                                <Button variant="secondary" href="/about">Mehr erfahren</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="text-center summary-card">
                            <Card.Body>
                                <Card.Title>Projekte</Card.Title>
                                <Card.Text>
                                    Entdecken Sie einige unserer erfolgreichen Projekte.
                                </Card.Text>
                                <Button variant="secondary" href="/projects">Projekte ansehen</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="text-center summary-card">
                            <Card.Body>
                                <Card.Title>Kontakt</Card.Title>
                                <Card.Text>
                                    Kontaktieren Sie uns für weitere Informationen.
                                </Card.Text>
                                <Button variant="secondary" href="/contact">Kontakt aufnehmen</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Container className="technology-section">
                <h2 className="text-center">Unsere Technologien</h2>
                <p className="text-center">
                    Für Ihre Web- oder Mobilanwendung verwenden wir nur moderne und skalierbare Technologien
                </p>
                <Row>
                    <Col md={12}>
                        <h4>Backend</h4>
                        <Row>
                            {/* Add your technology icons here */}
                        </Row>
                    </Col>
                    <Col md={12}>
                        <h4>Framework</h4>
                        <Row>
                            {/* Add your technology icons here */}
                        </Row>
                    </Col>
                    <Col md={12}>
                        <h4>Datenbank</h4>
                        <Row>
                            {/* Add your technology icons here */}
                        </Row>
                    </Col>
                    <Col md={12}>
                        <h4>UX/UI Design</h4>
                        <Row>
                            {/* Add your technology icons here */}
                        </Row>
                    </Col>
                    <Col md={12}>
                        <h4>Web-Technologien</h4>
                        <Row>
                            {/* Add your technology icons here */}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HomePage;
