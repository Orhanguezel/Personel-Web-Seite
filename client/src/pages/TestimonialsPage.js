import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

const testimonials = [
    {
        name: 'John Doe',
        feedback: 'Excellent service and great attention to detail!',
        image: 'https://via.placeholder.com/150'
    },
    {
        name: 'Jane Smith',
        feedback: 'Highly professional and reliable. Would definitely recommend!',
        image: 'https://via.placeholder.com/150'
    },
    // Daha fazla referans ekleyin
];

function TestimonialsPage() {
    return (
        <Container>
            <h2>Testimonials</h2>
            <Row>
                {testimonials.map((testimonial, index) => (
                    <Col key={index} sm={12} md={6} lg={4}>
                        <Card className="card" style={{ margin: '10px' }}>
                            <Card.Img variant="top" src={testimonial.image} />
                            <Card.Body>
                                <Card.Title className="card-title">{testimonial.name}</Card.Title>
                                <Card.Text>{testimonial.feedback}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default TestimonialsPage;
