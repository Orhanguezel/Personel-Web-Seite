// src/pages/UserManagementPage.js
import React, { useState, useEffect } from 'react';
import axios from '../axios'; // Ensure axios is configured correctly

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get('/users'); // Adjust the API endpoint as needed
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Benutzerverwaltung</h1> {/* German for "User Management" */}
            <p>Verwalten Sie hier alle registrierten Benutzer.</p> {/* German for "Manage all registered users here." */}
            <table>
                <thead>
                    <tr>
                        <th>Benutzername</th> {/* Username */}
                        <th>Email</th>
                        <th>Rolle</th> {/* Role */}
                        <th>Aktionen</th> {/* Actions */}
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                {/* Implement Edit and Delete functionality */}
                                <button>Bearbeiten</button> {/* Edit */}
                                <button>Löschen</button> {/* Delete */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagementPage;
