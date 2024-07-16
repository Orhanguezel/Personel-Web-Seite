import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from '../axios';

const BlogDetailPage = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            const { data } = await axios.get(`/api/blogs/${id}`);
            setBlog(data);
        };

        fetchBlog();
    }, [id]);

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
