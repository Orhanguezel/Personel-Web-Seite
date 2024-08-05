import requests

# Giriş URL'si
login_url = "http://localhost:5000/api/users/login"

# Test kullanıcıları
users = [
    {"email": "admin@example.com", "password": "adminpassword"},
    {"email": "user1@example.com", "password": "userpassword"},
    {"email": "user2@example.com", "password": "userpassword"},
    {"email": "guest1@example.com", "password": "guestpassword"},
    {"email": "guest2@example.com", "password": "guestpassword"},
]

def login_user(user):
    response = requests.post(login_url, json=user)
    if response.status_code == 200:
        print(f"User with email {user['email']} logged in successfully.")
    else:
        print(f"Failed to login user with email {user['email']}. Response: {response.text}")

for user in users:
    login_user(user)
