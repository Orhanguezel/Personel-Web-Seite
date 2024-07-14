import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import TestimonialsPage from './pages/TestimonialsPage';
import BlogPage from './pages/BlogPage';
import LoginPage from './pages/LoginPage';
import { Navbar, Nav, Row, Col, Container } from 'react-bootstrap';
import { FaEnvelope, FaLinkedin, FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa';
import './pages/ContactPage.css';

function App() {
    return (
        <Router>
            <Navbar bg="light" expand="lg" className="navbar">
                <Navbar.Brand href="/">Güzel Web Design</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Startseite</Nav.Link>
                        <Nav.Link href="/projects">Projekte</Nav.Link>
                        <Nav.Link href="/contact">Kontakt</Nav.Link>
                        <Nav.Link href="/about">Über mich</Nav.Link>
                        <Nav.Link href="/testimonials">Referenzen</Nav.Link>
                        <Nav.Link href="/blog">Blog</Nav.Link>
                        <Nav.Link href="/login">Login/Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/testimonials" element={<TestimonialsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
            <footer className="footer">
                <Container>
                    <Row>
                        <Col md={4} className="footer-col">
                            <h5>Güzel Web Design</h5>
                            <p>Ihr Partner für professionelle Webentwicklung und Design.</p>
                        </Col>
                        <Col md={4} className="footer-col">
                            <h5>Links</h5>
                            <ul className="list-unstyled">
                                <li><a href="/">Startseite</a></li>
                                <li><a href="/projects">Projekte</a></li>
                                <li><a href="/contact">Kontakt</a></li>
                                <li><a href="/about">Über mich</a></li>
                                <li><a href="/testimonials">Referenzen</a></li>
                                <li><a href="/blog">Blog</a></li>
                                <li><a href="/login">Login/Register</a></li>
                            </ul>
                        </Col>
                        <Col md={4} className="footer-col">
                            <h5>Kontakt</h5>
                            <ul className="list-unstyled">
                                <li><FaEnvelope /> orhanguzell@gmail.com</li>
                                <li><FaLinkedin /> <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                                <li><FaGithub /> <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                                <li><FaFacebook /> <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                                <li><FaInstagram /> <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                            </ul>
                        </Col>
                    </Row>
                    <div className="text-center mt-4">
                        <span className="text-muted">&copy; 2023 Güzel Web Design. Alle Rechte vorbehalten.</span>
                    </div>
                </Container>
            </footer>
        </Router>
    );
}

export default App;
