import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import axios from '../axios'; // Axios importu

const AdminBlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null); // File input için null olarak başlat
    const [category, setCategory] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [categoryName, setCategoryName] = useState(''); // Yeni kategori adı için

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
        setSelectedBlog(null); // Yeni blog oluştururken önceki seçili blogu temizle
        setTitle('');
        setSummary('');
        setContent('');
        setImage(null);
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
        setCategory(blog.category ? blog.category._id : ''); // Kategori ID'sini al
        setShowModal(true);
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('summary', summary);
        formData.append('content', content);
        formData.append('category', category);
        if (image) {
            formData.append('image', image);
        }

        try {
            if (isEditing) {
                await axios.put(`/blogs/${selectedBlog._id}`, formData);
            } else {
                const userLocal = JSON.parse(localStorage.getItem('userInfo'));
                formData.append('author', userLocal._id); // Author bilgisini ekleyin
                await axios.post('/blogs', formData);
            }
            setShowModal(false);
            window.location.reload();
        } catch (error) {
            console.error('API call failed:', error.response ? error.response.data.message : error.message);
        }
    };

    const handleCreateCategory = async () => {
        try {
            await axios.post('/categories', { name: categoryName });
            setCategoryName('');
            window.location.reload();
        } catch (error) {
            console.error('Error creating category:', error.response ? error.response.data.message : error.message);
        }
    };

    return (
        <Container>
            <h2 className="page-title">Yönetici Blog Sayfası</h2>
            <Button variant="primary" onClick={handleCreateBlog} className="mb-3">Yeni Blog Oluştur</Button>
            <Form onSubmit={handleCreateCategory}>
                <Form.Group controlId="categoryName">
                    <Form.Label>Yeni Kategori Oluştur</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Kategori Adı"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Oluştur</Button>
            </Form>
            <Row>
                {blogs.map((blog) => (
                    <Col key={blog._id} sm={12} md={6} lg={4}>
                        <Card className="blog-card">
                            {blog.image && (
                                <Card.Img
                                    variant="top"
                                    src={`http://localhost:5000/uploads/${blog.image}`}
                                    style={{ objectFit: 'cover', height: '200px', width: '100%' }} // Resim boyutunu ayarlayın
                                />
                            )}
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
                            <Form.Label>Resim</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleFileChange}
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
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
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
