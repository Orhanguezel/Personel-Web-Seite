import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './AuthPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = 'http://localhost:5000/api/users'; // Backend URL hier überprüfen
            if (isLogin) {
                const response = await axios.post(`${apiUrl}/login`, { email, password });
                localStorage.setItem('userInfo', JSON.stringify(response.data));
            } else {
                const response = await axios.post(`${apiUrl}/register`, { username, email, password });
                localStorage.setItem('userInfo', JSON.stringify(response.data));
            }
        } catch (error) {
            console.error('API-Anruf fehlgeschlagen:', error.response ? error.response.data.message : error.message);
        }
    };

    return (
        <Container>
            <div className="auth-form">
                <h2>{isLogin ? 'Anmelden' : 'Registrieren'}</h2>
                <Form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <Form.Group controlId="username">
                            <Form.Label>Benutzername</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Benutzernamen eingeben"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                    )}
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
                    <Button variant="primary" type="submit">{isLogin ? 'Anmelden' : 'Registrieren'}</Button>
                    <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Neues Konto erstellen' : 'Haben Sie bereits ein Konto? Anmelden'}
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

export default LoginPage;
