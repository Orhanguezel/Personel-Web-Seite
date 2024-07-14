import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

const blogs = [
    {
        title: 'My First Blog Post',
        description: 'This is the summary of my first blog post.',
        link: '#',
        image: 'https://via.placeholder.com/150'
    },
    {
        title: 'Another Interesting Post',
        description: 'Summary of another interesting post.',
        link: '#',
        image: 'https://via.placeholder.com/150'
    },
    // Daha fazla blog yazısı ekleyin
];

function BlogPage() {
    return (
        <Container>
            <h2>Blog</h2>
            <Row>
                {blogs.map((blog, index) => (
                    <Col key={index} sm={12} md={6} lg={4}>
                        <Card className="card" style={{ margin: '10px' }}>
                            <Card.Img variant="top" src={blog.image} />
                            <Card.Body>
                                <Card.Title className="card-title">{blog.title}</Card.Title>
                                <Card.Text>{blog.description}</Card.Text>
                                <Card.Link href={blog.link} target="_blank">Read more</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default BlogPage;