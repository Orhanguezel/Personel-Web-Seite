import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from '../axios';

const BlogDetailPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState(null); // Hata durumu için state ekleyelim

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await axios.get(`/blogs/${id}`);
                setBlog(data);
            } catch (error) {
                console.error('Error fetching blog:', error);
                setError(error.response ? error.response.data.message : error.message); // Hata durumunu set edelim
            }
        };

        fetchBlog();
    }, [id]);

    if (error) return <p>Hata: {error}</p>; // Hata mesajını göster

    if (!blog) return <p>Loading...</p>;

    return (
        <Container>
            <Card className="blog-card">
                <Card.Body>
                    <Card.Title className="card-title">{blog.title}</Card.Title>
                    <Card.Text>{blog.content}</Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default BlogDetailPage;
