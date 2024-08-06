import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiFillLike } from 'react-icons/ai';
import axios from '../axios'; // Axios importu

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const { data } = await axios.get('/blogs');
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    const increaseLikes = async (id) => {
        const foundPost = blogs.find((post) => post._id === id);
        let tempArray = [...foundPost.whoClicked];
        const userLocal = JSON.parse(localStorage.getItem("userInfo"));
        tempArray.push(userLocal._id);

        try {
            await axios.put(`/blogs/${id}/like`, { likes: foundPost.likes + 1, whoClicked: tempArray });
            const updatedBlogs = blogs.map(blog => blog._id === id ? { ...blog, likes: blog.likes + 1, whoClicked: tempArray } : blog);
            setBlogs(updatedBlogs);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <h2 className="page-title">Blog</h2>
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
                                            blog.whoClicked.includes(JSON.parse(localStorage.getItem("userInfo"))._id)
                                                ? null
                                                : increaseLikes(blog._id)
                                        }
                                        className="likeButton"
                                    />
                                    <span className="likesNumber">
                                        &nbsp;{blog.likes}
                                    </span>
                                    <Link to={`/blogs/${blog._id}`} className="ml-auto">Mehr lesen</Link>
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default BlogPage;
