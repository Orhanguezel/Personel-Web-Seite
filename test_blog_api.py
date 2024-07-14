import requests

# API URL'leri
register_url = "http://localhost:5000/api/users/register"
login_url = "http://localhost:5000/api/users/login"
create_blog_url = "http://localhost:5000/api/blogs"
update_blog_url = "http://localhost:5000/api/blogs/{id}"
# delete_blog_url = "http://localhost:5000/api/blogs/{id}"

# Kullanıcıları kaydetme
users = [
    {"username": "admin", "email": "admin@example.com", "password": "adminpassword", "role": "admin"},
    {"username": "user1", "email": "user1@example.com", "password": "userpassword", "role": "user"},
    {"username": "user2", "email": "user2@example.com", "password": "userpassword", "role": "user"},
    {"username": "guest1", "email": "guest1@example.com", "password": "guestpassword", "role": "guest"},
    {"username": "guest2", "email": "guest2@example.com", "password": "guestpassword", "role": "guest"},
]

for user in users:
    response = requests.post(register_url, json=user)
    if response.status_code == 201:
        print(f"User {user['username']} registered successfully.")
    else:
        print(f"Failed to register user {user['username']}. Response: {response.text}")

# Kullanıcı giriş testleri
tokens = {}
for user in users:
    login_payload = {"email": user['email'], "password": user['password']}
    response = requests.post(login_url, json=login_payload)
    if response.status_code == 200:
        token = response.json()['token']
        tokens[user['username']] = token
        print(f"User {user['username']} logged in successfully. Token: {token}")
    else:
        print(f"Failed to login user {user['username']}. Response: {response.text}")

# Admin kullanıcısı ile giriş yap
admin_token = tokens.get('admin')

# Yeni blog oluştur
new_blog_payload = {
    "title": "Test Blog",
    "content": "Bu bir test blog yazısıdır."
}
headers = {"Authorization": f"Bearer {admin_token}"}
create_response = requests.post(create_blog_url, json=new_blog_payload, headers=headers)
if create_response.status_code == 201:
    print(f"Blog created successfully: {create_response.json()}")
    blog_id = create_response.json()['_id']

    # Blog'u güncelle
    update_blog_payload = {
        "title": "Güncellenmiş Test Blog",
        "content": "Bu, güncellenmiş bir test blog yazısıdır."
    }
    update_response = requests.put(update_blog_url.format(id=blog_id), json=update_blog_payload, headers=headers)
    print(f"Blog updated successfully: {update_response.json()}")

    # Blog'u silme yönlendirmesi geçici olarak kaldırılıyor
    # delete_response = requests.delete(delete_blog_url.format(id=blog_id), headers=headers)
    # if delete_response.status_code == 200:
    #     print(f"Blog deleted successfully: {delete_response.json()}")
    # else:
    #     print(f"Failed to delete blog. Response: {delete_response.text}")
else:
    print(f"Failed to create blog. Response: {create_response.text}")
