import requests

# Kayıt ve giriş URL'leri
register_url = "http://localhost:5000/api/users/register"
login_url = "http://localhost:5000/api/users/login"
blog_url = "http://localhost:5000/api/blogs"
comment_url = "http://localhost:5000/api/blogs/{blog_id}/comment"
rating_url = "http://localhost:5000/api/blogs/{blog_id}/rate"
delete_url = "http://localhost:5000/api/blogs/{blog_id}"

# Test kullanıcıları
user = {"username": "testuser", "email": "testuser@example.com", "password": "testpassword"}

def register_user(user):
    response = requests.post(register_url, json=user)
    if response.status_code == 201:
        print(f"Kullanıcı {user['username']} başarıyla kaydedildi.")
    else:
        print(f"Kullanıcı {user['username']} kaydedilemedi. Yanıt: {response.text}")
    return response

def login_user(user):
    response = requests.post(login_url, json={"email": user['email'], "password": user['password']})
    if response.status_code == 200:
        print(f"E-posta {user['email']} ile giriş yapıldı.")
        return response.json()
    else:
        print(f"E-posta {user['email']} ile giriş yapılamadı. Yanıt: {response.text}")
    return None

def create_blog(blog, token, image_path=None):
    headers = {"Authorization": f"Bearer {token}"}
    files = {'image': open(image_path, 'rb')} if image_path else None
    response = requests.post(blog_url, data=blog, headers=headers, files=files)
    if response.status_code == 201:
        print(f"Blog '{blog['title']}' başarıyla oluşturuldu.")
    else:
        print(f"Blog '{blog['title']}' oluşturulamadı. Yanıt: {response.text}")
    return response

def get_blogs():
    response = requests.get(blog_url)
    if response.status_code == 200:
        blogs = response.json()
        print(f"{len(blogs)} blog alındı:")
        for blog in blogs:
            print(blog)
    else:
        print(f"Bloglar alınamadı. Yanıt: {response.text}")
    return response

def add_comment(blog_id, comment, token):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(comment_url.format(blog_id=blog_id), json=comment, headers=headers)
    if response.status_code == 201:
        print(f"Yorum başarıyla eklendi.")
    else:
        print(f"Yorum eklenemedi. Yanıt: {response.text}")
    return response

def rate_blog(blog_id, rating, token):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(rating_url.format(blog_id=blog_id), json={"rating": rating}, headers=headers)
    if response.status_code == 200:
        print(f"Blog başarıyla puanlandı.")
    else:
        print(f"Blog puanlanamadı. Yanıt: {response.text}")
    return response

def delete_blog(blog_id, token):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.delete(delete_url.format(blog_id=blog_id), headers=headers)
    if response.status_code == 200:
        print(f"Blog başarıyla silindi.")
    else:
        print(f"Blog silinemedi. Yanıt: {response.text}")
    return response

# Test kayıt ve giriş
register_response = register_user(user)
login_response = login_user(user)

if login_response:
    token = login_response['token']
    # Test blog oluşturma
    blog = {"title": "Test Blog", "content": "Bu bir test blogudur.", "author": login_response['_id']}
    created_blog = create_blog(blog, token, image_path="/home/dci-admin/Desktop/personal-website/server/uploads/image-1722954211213.png")
    
    # Blogları alma
    blogs_response = get_blogs()
    
    # Yorum ekleme
    if created_blog.status_code == 201:
        blog_id = created_blog.json()['_id']
        comment = {"comment": "Bu bir test yorumudur."}
        add_comment(blog_id, comment, token)
        
        # Blog puanlama
        rate_blog(blog_id, 5, token)
        
        # Blog silme
        delete_blog(blog_id, token)
