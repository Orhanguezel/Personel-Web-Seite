import React from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ userInfo }) => {
    const navigate = useNavigate();

    return (
        <Container className="mt-4">
            <h2>Profil</h2>
            <Card>
                <Card.Body>
                    <Card.Title>Benutzerinformationen</Card.Title>
                    <Card.Text>
                        <strong>Benutzername:</strong> {userInfo.username}
                    </Card.Text>
                    <Card.Text>
                        <strong>Email:</strong> {userInfo.email}
                    </Card.Text>
                    <Card.Text>
                        <strong>Rolle:</strong> {userInfo.role}
                    </Card.Text>

                    {userInfo.role === 'admin' && (
                        <>
                            <h3>Admin Optionen</h3>
                            <Row className="mt-4">
                                <Col>
                                    <Button 
                                        variant="primary" 
                                        onClick={() => navigate('/admin/blogs')}
                                        className="w-100"
                                    >
                                        Blog Admin Verwaltung
                                    </Button>
                                </Col>
                                <Col>
                                    <Button 
                                        variant="secondary" 
                                        onClick={() => navigate('/admin/users')}
                                        className="w-100"
                                    >
                                        Benutzerverwaltung
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProfilePage;
