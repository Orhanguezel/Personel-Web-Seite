import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiFillLike } from 'react-icons/ai';
import axios from '../axios'; // Axios importu

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchBlogs = async () => {
            const { data } = await axios.get('/api/blogs');
            setBlogs(data);
        };

        fetchBlogs();
    }, []);

    const handleCreateBlog = () => {
        setIsEditing(false);
        setShowModal(true);
    };

    const handleEditBlog = (blog) => {
        setIsEditing(true);
        setSelectedBlog(blog);
        setTitle(blog.title);
        setContent(blog.content);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`/api/blogs/${selectedBlog._id}`, { title, content });
            } else {
                await axios.post('/api/blogs', { title, content });
            }
            setShowModal(false);
            window.location.reload(); // Sayfayı yeniden yükleyerek güncellenmiş blog listesini göster
        } catch (error) {
            console.error('API call failed:', error.response ? error.response.data.message : error.message);
        }
    };

    const increaseLikes = async (id) => {
        const foundPost = blogs.find((post) => post._id === id);
        let tempArray = [...foundPost.whoClicked];
        const userLocal = JSON.parse(localStorage.getItem("user"));
        tempArray.push(userLocal._id);

        try {
            await axios.put(`/api/blogs/${id}/like`, { likes: foundPost.likes + 1, whoClicked: tempArray });
            const updatedBlogs = blogs.map(blog => blog._id === id ? { ...blog, likes: blog.likes + 1, whoClicked: tempArray } : blog);
            setBlogs(updatedBlogs);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <h2 className="page-title">Blog</h2>
            <Button variant="primary" onClick={handleCreateBlog} className="mb-3">Yeni Blog Oluştur</Button>
            <Row>
                {blogs.map((blog) => (
                    <Col key={blog._id} sm={12} md={6} lg={4}>
                        <Card className="blog-card">
                            <Card.Body>
                                <Card.Title className="blogUser">
                                    {blog.author.username}
                                </Card.Title>
                                <Card.Subtitle className="blogTitle">
                                    {blog.title}
                                </Card.Subtitle>
                                <Card.Text className="blogContent">
                                    {blog.content.substring(0, 100)}...
                                </Card.Text>
                                <Card.Footer className="d-flex">
                                    <AiFillLike
                                        onClick={() =>
                                            blog.whoClicked.includes(JSON.parse(localStorage.getItem("user"))._id)
                                                ? null
                                                : increaseLikes(blog._id)
                                        }
                                        className="likeButton"
                                    />
                                    <span className="likesNumber">
                                        &nbsp;{blog.likes}
                                    </span>
                                    <Button variant="link" onClick={() => handleEditBlog(blog)}>Düzenle</Button>
                                    <Link to={`/blogs/${blog._id}`} className="ml-auto">Mehr lesen</Link>
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
                        <Button variant="primary" type="submit">
                            {isEditing ? 'Güncelle' : 'Oluştur'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default BlogPage;
