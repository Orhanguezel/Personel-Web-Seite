import requests
import json

# Load users from JSON file
with open('users.json', 'r') as file:
    users = json.load(file)

# API endpoint URL
url = 'http://localhost:5000/api/users/register'

# Function to register a user
def register_user(user):
    response = requests.post(url, json=user)
    if response.status_code == 201:
        print(f"User {user['username']} registered successfully.")
    else:
        print(f"Failed to register user {user['username']}. Response: {response.text}")

# Register each user
for user in users:
    register_user(user)
