import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/users/login', { email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            if (data.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
        }
    };

    return (
        <div className="login-page">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;
