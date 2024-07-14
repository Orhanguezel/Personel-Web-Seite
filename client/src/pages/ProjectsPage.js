import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import './ProjectsPage.css';

const projects = [
    { 
        title: 'Antalya Döner Pizzeria', 
        description: 'A website for a döner restaurant in Germany.',
        link: 'https://www.antalya-doner-pizzeria.de',
        image: 'https://www.antalya-doner-pizzeria.de/images/logo.png'
    },
    { 
        title: 'Kuhlturm', 
        description: 'Website for a refrigeration company.',
        link: 'https://kuhlturm.com/',
        image: 'https://kuhlturm.com/assets/images/logo.png'
    },
    { 
        title: 'BTU Holding', 
        description: 'Corporate website for BTU Holding.',
        link: 'https://btuholding.com.tr/',
        image: 'https://btuholding.com.tr/assets/images/logo.png'
    },
    { 
        title: 'Hazer Piliç', 
        description: 'Website for Hazer Piliç, a poultry company.',
        link: 'https://hazerpilic.com.tr/',
        image: 'https://hazerpilic.com.tr/assets/images/logo.png'
    }
];

function ProjectsPage() {
    return (
        <Container>
            <h2 className="page-title">Projects</h2>
            <Row>
                {projects.map((project, index) => (
                    <Col key={index} sm={12} md={6} lg={4}>
                        <Card className="project-card">
                            <Card.Img variant="top" src={project.image} />
                            <Card.Body>
                                <Card.Title className="card-title">{project.title}</Card.Title>
                                <Card.Text>{project.description}</Card.Text>
                                <Card.Link href={project.link} target="_blank">Learn more</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ProjectsPage;
