import requests

# Admin kullanıcı bilgileri
admin_credentials = {
    "email": "admin@example.com",
    "password": "adminpassword"
}

# Admin olarak giriş yap ve token al
login_response = requests.post("http://localhost:5000/api/users/login", json=admin_credentials)
if login_response.status_code == 200:
    token = login_response.json()["token"]
    print(f"Admin logged in successfully. Token: {token}")
else:
    print(f"Failed to login as admin. Response: {login_response.text}")
    exit()

# Blog oluştur ve ID'sini al
blog_data = {
    "title": "Test Blog",
    "content": "Bu bir test blog yazısıdır."
}
headers = {
    "Authorization": f"Bearer {token}"
}
create_response = requests.post("http://localhost:5000/api/blogs", json=blog_data, headers=headers)
if create_response.status_code == 201:
    blog_id = create_response.json()["_id"]
    print(f"Blog created successfully with ID: {blog_id}")
else:
    print(f"Failed to create blog. Response: {create_response.text}")
    exit()

# Blogu sil
delete_response = requests.delete(f"http://localhost:5000/api/blogs/{blog_id}", headers=headers)
if delete_response.status_code == 200:
    print("Blog deleted successfully.")
else:
    print(f"Failed to delete blog. Response: {delete_response.text}")
