import requests

register_url = "http://localhost:5000/api/users/register"
login_url = "http://localhost:5000/api/users/login"
category_url = "http://localhost:5000/api/categories"

admin_user = {"username": "admin", "email": "admin@example.com", "password": "adminpassword", "role": "admin"}
category = {"name": "Test Category"}

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

def create_category(category, token):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(category_url, json=category, headers=headers)
    if response.status_code == 201:
        print(f"Category '{category['name']}' created successfully.")
    else:
        print(f"Failed to create category '{category['name']}'. Response: {response.text}")
    return response

def get_categories():
    response = requests.get(category_url)
    if response.status_code == 200:
        categories = response.json()
        print(f"Retrieved {len(categories)} categories:")
        for category in categories:
            print(category)
    else:
        print(f"Failed to retrieve categories. Response: {response.text}")
    return response

# Admin user kaydı ve girişi
register_response = register_user(admin_user)
login_response = login_user(admin_user)

if login_response:
    token = login_response['token']
    # Kategori oluşturma testi
    create_category_response = create_category(category, token)
    # Kategorileri alma testi
    get_categories()
