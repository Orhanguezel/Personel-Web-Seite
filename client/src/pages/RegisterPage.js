import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './AuthPage.css';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/register', { username, email, password });
            localStorage.setItem('userInfo', JSON.stringify(response.data));
        } catch (error) {
            console.error(error.response.data.message);
        }
    };

    return (
        <Container>
            <h2>Registrieren</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Benutzername</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Benutzername eingeben"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email Adresse</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Email eingeben"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Passwort</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Passwort eingeben"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Registrieren</Button>
            </Form>
        </Container>
    );
}

export default RegisterPage;
