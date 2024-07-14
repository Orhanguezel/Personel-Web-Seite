import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function HomePage() {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md="auto">
                    <h1>Welcome to My Personal Website</h1>
                    <p>
                        I specialize in restaurant management systems, e-commerce sites, promotional pages, and news sites.
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;
