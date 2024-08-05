import requests

# Kayıt ve giriş URL'leri
register_url = "http://localhost:5000/api/users/register"
login_url = "http://localhost:5000/api/users/login"
blog_url = "http://localhost:5000/api/blogs"

# Test kullanıcıları
user = {"username": "testuser", "email": "testuser@example.com", "password": "testpassword"}

def register_user(user):
    response = requests.post(register_url, json=user)
    if response.status_code == 201:
        print(f"User {user['username']} registered successfully.")
    else:
        print(f"Failed to register user {user['username']}. Response: {response.text}")
    return response

def login_user(user):
    response = requests.post(login_url, json={"email": user['email'], "password": user['password']})
    if response.status_code == 200:
        print(f"User with email {user['email']} logged in successfully.")
        return response.json()
    else:
        print(f"Failed to log in user with email {user['email']}. Response: {response.text}")
    return None

def create_blog(blog, token):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(blog_url, json=blog, headers=headers)
    if response.status_code == 201:
        print(f"Blog '{blog['title']}' created successfully.")
    else:
        print(f"Failed to create blog '{blog['title']}'. Response: {response.text}")
    return response

def get_blogs():
    response = requests.get(blog_url)
    if response.status_code == 200:
        blogs = response.json()
        print(f"Retrieved {len(blogs)} blogs:")
        for blog in blogs:
            print(blog)
    else:
        print(f"Failed to retrieve blogs. Response: {response.text}")
    return response

# Test kayıt ve giriş
register_response = register_user(user)
login_response = login_user(user)

if login_response:
    token = login_response['token']
    # Test blog oluşturma
    blog = {"title": "Test Blog", "content": "This is a test blog.", "author": login_response['user']['_id']}
    create_blog(blog, token)
    # Blogları alma
    get_blogs()

