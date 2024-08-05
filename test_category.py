import requests

# Kayıt, giriş ve kategori URL'leri
register_url = "http://localhost:5000/api/users/register"
login_url = "http://localhost:5000/api/users/login"
category_url = "http://localhost:5000/api/categories"

# Test admin kullanıcısı
admin_user = {"username": "admin", "email": "admin@example.com", "password": "adminpassword", "role": "admin"}
category = {"name": "Test Category"}

def register_user(user):
    response = requests.post(register_url, json=user)
    return response.json()

def login_user(user):
    response = requests.post(login_url, json={"email": user['email'], "password": user['password']})
    return response.json()

def create_category(category, token):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(category_url, json=category, headers=headers)
    if response.status_code == 201:
        print(f"Category '{category['name']}' created successfully.")
    else:
        print(f"Failed to create category '{category['name']}'. Status code: {response.status_code}, Response: {response.text}")
    return response

def get_categories():
    response = requests.get(category_url)
    if response.status_code == 200:
        categories = response.json()
        print(f"Retrieved {len(categories)} categories:")
        for cat in categories:
            print(cat)
    else:
        print(f"Failed to retrieve categories. Response: {response.text}")
    return response

# Test admin kayıt ve giriş
register_response = register_user(admin_user)
login_response = login_user(admin_user)

if login_response:
    token = login_response['token']
    # Test kategori oluşturma
    create_category_response = create_category(category, token)
    # Kategorileri alma
    get_categories()
