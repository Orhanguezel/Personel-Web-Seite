import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import './BlogPage.css';

const blogs = [
    {
        title: 'React 18 ile Gelen Yenilikler',
        description: 'React 18 sürümündeki yeni özellikler ve iyileştirmeler hakkında detaylı bilgi.',
        link: '#',
        image: 'https://via.placeholder.com/150'
    },
    {
        title: 'BTU Holding İçin Hazırlanan Kurumsal Web Sitesi',
        description: 'Proje süreci, karşılaşılan zorluklar ve çözümler hakkında ayrıntılı bir hikaye.',
        link: '#',
        image: 'https://via.placeholder.com/150'
    },
    {
        title: 'Node.js ile RESTful API Nasıl Oluşturulur?',
        description: 'Adım adım Node.js kullanarak RESTful API oluşturma rehberi.',
        link: '#',
        image: 'https://via.placeholder.com/150'
    }
    // Daha fazla blog yazısı ekleyin
];

function BlogPage() {
    return (
        <Container>
            <h2 className="page-title">Blog</h2>
            <Row>
                {blogs.map((blog, index) => (
                    <Col key={index} sm={12} md={6} lg={4}>
                        <Card className="blog-card">
                            <Card.Img variant="top" src={blog.image} />
                            <Card.Body>
                                <Card.Title className="card-title">{blog.title}</Card.Title>
                                <Card.Text>{blog.description}</Card.Text>
                                <Card.Link href={blog.link} target="_blank">Mehr lesen</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default BlogPage;
