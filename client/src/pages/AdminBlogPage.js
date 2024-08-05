import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Modal, Card } from 'react-bootstrap';
import axios from '../axios';
import './AdminBlogPage.css';

const AdminBlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await axios.get('/blogs');
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const { data } = await axios.get('/categories');
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchBlogs();
        fetchCategories();
    }, []);

    const handleCreateBlog = () => {
        setIsEditing(false);
        setSelectedBlog(null);
        setTitle('');
        setSummary('');
        setContent('');
        setImage('');
        setCategory('');
        setShowModal(true);
    };

    const handleEditBlog = (blog) => {
        setIsEditing(true);
        setSelectedBlog(blog);
        setTitle(blog.title);
        setSummary(blog.summary);
        setContent(blog.content);
        setImage(blog.image);
        setCategory(blog.category);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`/blogs/${selectedBlog._id}`, { title, summary, content, image, category });
            } else {
                await axios.post('/blogs', { title, summary, content, image, category });
            }
            setShowModal(false);
            window.location.reload();
        } catch (error) {
            console.error('API call failed:', error.response ? error.response.data.message : error.message);
        }
    };

    return (
        <Container>
            <h2 className="page-title">Yönetici Blog Sayfası</h2>
            <Button variant="primary" onClick={handleCreateBlog} className="mb-3">Yeni Blog Oluştur</Button>
            <Row>
                {blogs.map((blog) => (
                    <Col key={blog._id} sm={12} md={6} lg={4}>
                        <Card className="blog-card">
                            <Card.Body>
                                <Card.Title className="blogUser">{blog.author.username}</Card.Title>
                                <Card.Subtitle className="blogTitle">{blog.title}</Card.Subtitle>
                                <Card.Text className="blogContent">{blog.summary}</Card.Text>
                                <Card.Footer className="d-flex">
                                    <Button variant="link" onClick={() => handleEditBlog(blog)}>Düzenle</Button>
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Blog Düzenle' : 'Yeni Blog Oluştur'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>Başlık</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Başlık girin"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="summary">
                            <Form.Label>Kısa Bilgi</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Kısa bilgi girin"
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="content">
                            <Form.Label>İçerik</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="İçeriği girin"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="image">
                            <Form.Label>Resim URL'si</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Resim URL'si girin"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="category">
                            <Form.Label>Kategori</Form.Label>
                            <Form.Control
                                as="select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Kategori seçin</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {isEditing ? 'Güncelle' : 'Oluştur'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default AdminBlogPage;
