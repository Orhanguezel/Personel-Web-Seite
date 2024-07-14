import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './HomePage.css';
import phpIcon from '../assets/php.png';
import jsIcon from '../assets/javascript.png';
import nodejsIcon from '../assets/nodejs.png';
import laravelIcon from '../assets/laravel.png';
import reactIcon from '../assets/react.png';
import vueIcon from '../assets/vuejs.png';
import angularIcon from '../assets/angular.png';
import mysqlIcon from '../assets/mysql.png';
import redisIcon from '../assets/redis.png';
import elasticIcon from '../assets/elasticsearch.png';
import postgresIcon from '../assets/postgresql.png';
import mongodbIcon from '../assets/mongodb.png';
import sqliteIcon from '../assets/sqlite.png';
import mariaIcon from '../assets/mariadb.png';
import firebaseIcon from '../assets/firebase.png';
import figmaIcon from '../assets/figma.png';
import sketchIcon from '../assets/sketch.png';
import xdIcon from '../assets/adobe_xd.png';
import illustratorIcon from '../assets/adobe_illustrator.png';
import canvaIcon from '../assets/canva.png';
import bootstrapIcon from '../assets/bootstrap.png';
import htmlIcon from '../assets/html.png';
import cssIcon from '../assets/css.png';

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
                            <Col><img src={phpIcon} alt="PHP" className="tech-icon" /></Col>
                            <Col><img src={jsIcon} alt="JavaScript" className="tech-icon" /></Col>
                            <Col><img src={nodejsIcon} alt="Node.js" className="tech-icon" /></Col>
                        </Row>
                    </Col>
                    <Col md={12}>
                        <h4>Framework</h4>
                        <Row>
                            <Col><img src={laravelIcon} alt="Laravel" className="tech-icon" /></Col>
                            <Col><img src={reactIcon} alt="React" className="tech-icon" /></Col>
                            <Col><img src={vueIcon} alt="Vue.js" className="tech-icon" /></Col>
                            <Col><img src={angularIcon} alt="Angular" className="tech-icon" /></Col>
                            <Col><img src={bootstrapIcon} alt="Bootstrap" className="tech-icon" /></Col>
                        </Row>
                    </Col>
                    <Col md={12}>
                        <h4>Datenbank</h4>
                        <Row>
                            <Col><img src={mysqlIcon} alt="MySQL" className="tech-icon" /></Col>
                            <Col><img src={redisIcon} alt="Redis" className="tech-icon" /></Col>
                            <Col><img src={elasticIcon} alt="Elasticsearch" className="tech-icon" /></Col>
                            <Col><img src={postgresIcon} alt="PostgreSQL" className="tech-icon" /></Col>
                            <Col><img src={mongodbIcon} alt="MongoDB" className="tech-icon" /></Col>
                            <Col><img src={sqliteIcon} alt="SQLite" className="tech-icon" /></Col>
                            <Col><img src={mariaIcon} alt="MariaDB" className="tech-icon" /></Col>
                            <Col><img src={firebaseIcon} alt="Firebase" className="tech-icon" /></Col>
                        </Row>
                    </Col>
                    <Col md={12}>
                        <h4>UX/UI Design</h4>
                        <Row>
                            <Col><img src={figmaIcon} alt="Figma" className="tech-icon" /></Col>
                            <Col><img src={sketchIcon} alt="Sketch" className="tech-icon" /></Col>
                            <Col><img src={xdIcon} alt="Adobe XD" className="tech-icon" /></Col>
                            <Col><img src={illustratorIcon} alt="Adobe Illustrator" className="tech-icon" /></Col>
                            <Col><img src={canvaIcon} alt="Canva" className="tech-icon" /></Col>
                        </Row>
                    </Col>
                    <Col md={12}>
                        <h4>Web-Technologien</h4>
                        <Row>
                            <Col><img src={htmlIcon} alt="HTML" className="tech-icon" /></Col>
                            <Col><img src={cssIcon} alt="CSS" className="tech-icon" /></Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HomePage;
