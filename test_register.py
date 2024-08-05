import requests
import json

register_url = "http://localhost:5000/api/users/register"

users = [
    {"username": "admin", "email": "admin@example.com", "password": "adminpassword", "role": "admin"},
    {"username": "user1", "email": "user1@example.com", "password": "userpassword"},
    {"username": "user2", "email": "user2@example.com", "password": "userpassword"},
    {"username": "guest1", "email": "guest1@example.com", "password": "guestpassword"},
    {"username": "guest2", "email": "guest2@example.com", "password": "guestpassword"},
]

def register_user(user):
    response = requests.post(register_url, json=user)
    if response.status_code == 201:
        print(f"User {user['username']} registered successfully.")
    else:
        print(f"Failed to register user {user['username']}. Response: {response.text}")

for user in users:
    register_user(user)
