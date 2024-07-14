import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

const projects = [
    { title: 'Restaurant Management System', description: 'A complete system for managing restaurant operations.', link: '#' },
    { title: 'E-Commerce Platform', description: 'An online shopping platform.', link: '#' },
    // Daha fazla proje ekleyin
];

function ProjectsPage() {
    return (
        <Container>
            <Row>
                {projects.map((project, index) => (
                    <Col key={index} sm={12} md={6} lg={4}>
                        <Card style={{ margin: '10px' }}>
                            <Card.Body>
                                <Card.Title>{project.title}</Card.Title>
                                <Card.Text>{project.description}</Card.Text>
                                <Card.Link href={project.link}>Learn more</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ProjectsPage;
