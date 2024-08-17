import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import './AdminProfilePage.css';

const AdminProfilePage = ({ userInfo }) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get('/users'); // Assuming there's an endpoint to fetch all users
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`/users/${userId}`);
            setUsers(users.filter(user => user._id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await axios.put(`/users/${userId}/role`, { role: newRole });
            setUsers(users.map(user => user._id === userId ? { ...user, role: newRole } : user));
        } catch (error) {
            console.error('Error changing user role:', error);
        }
    };

    return (
        <Container className="admin-profile-page">
            <h1>Willkommen, {userInfo.username}!</h1>
            <Card className="admin-info-card">
                <Card.Body>
                    <Card.Title>Admin Informationen</Card.Title>
                    <Card.Text>
                        <strong>Email:</strong> {userInfo.email}
                    </Card.Text>
                    <Card.Text>
                        <strong>Rolle:</strong> {userInfo.role}
                    </Card.Text>
                    <div className="admin-links">
                        <Button
                            variant="primary"
                            className="admin-link-btn"
                            onClick={() => navigate('/admin/blogs')}
                        >
                            Blog Admin Verwaltung
                        </Button>
                        <Button
                            variant="secondary"
                            className="admin-link-btn"
                            onClick={() => navigate('/admin/users')}
                        >
                            Benutzerverwaltung
                        </Button>
                    </div>
                </Card.Body>
            </Card>

            <h2>Benutzerverwaltung</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Benutzername</th>
                        <th>Email</th>
                        <th>Rolle</th>
                        <th>Aktionen</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <Form.Select 
                                    value={user.role}
                                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </Form.Select>
                            </td>
                            <td>
                                <Button variant="danger" onClick={() => handleDeleteUser(user._id)}>
                                    Löschen
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default AdminProfilePage;
