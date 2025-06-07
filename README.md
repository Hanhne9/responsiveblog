# Full Blog Website Creation

*Modern MDX Blog with PHP Admin Panel*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/hiangs-projects/v0-full-blog-website-creation)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/bDagKGZz4d2)

## 📋 Tổng quan

Blog website hiện đại được xây dựng với Next.js 14, MDX, và PHP Admin Panel. Hỗ trợ dark mode, responsive design, và quản lý nội dung dễ dàng.

## ✨ Tính năng

### Frontend (Next.js)
- 🎨 **Modern UI**: Glass morphism, blur effects, gradient backgrounds
- 🌙 **Dark Mode**: Toggle light/dark mode
- 📱 **Responsive**: Hoạt động tốt trên mọi thiết bị
- 🔍 **Search**: Tìm kiếm bài viết theo từ khóa
- 🏷️ **Categories & Tags**: Phân loại và gắn thẻ bài viết
- 📝 **MDX Support**: Viết bài với Markdown và React components

### Backend (PHP Admin)
- ✏️ **Rich Text Editor**: TinyMCE với đầy đủ tính năng
- 📊 **Content Management**: Tạo, sửa, xóa bài viết
- 🖼️ **Image Upload**: Upload và quản lý hình ảnh
- 📱 **Responsive Admin**: Giao diện quản trị responsive
- 🔒 **Secure**: Bảo vệ thư mục admin

## 🚀 Deploy trên cPanel Hosting

### Bước 1: Chuẩn bị files

1. **Download source code** từ repository này
2. **Build Next.js project**:
   \`\`\`bash
   npm install
   npm run build
   npm run export
   \`\`\`

### Bước 2: Upload lên cPanel

1. **Đăng nhập cPanel** của hosting provider
2. **Mở File Manager**
3. **Điều hướng đến thư mục public_html**
4. **Upload và extract** file zip chứa source code

### Bước 3: Cấu trúc thư mục

Sau khi upload, cấu trúc thư mục sẽ như sau:

\`\`\`
public_html/
├── admin/                 # PHP Admin Panel
│   ├── index.php         # Trang quản lý chính
│   ├── edit.php          # Trang tạo/sửa bài viết
│   ├── upload.php        # Upload hình ảnh
│   └── .htaccess         # Bảo vệ thư mục
├── content/              # Nội dung blog
│   └── posts/            # Các file MDX
├── _next/                # Next.js static files
├── images/               # Hình ảnh upload
├── index.html            # Trang chủ
└── [other Next.js files] # Các file static khác
\`\`\`

### Bước 4: Cấu hình PHP

1. **Kiểm tra PHP version**: Đảm bảo hosting hỗ trợ PHP 7.4+
2. **Cấu hình permissions**:
   \`\`\`bash
   chmod 755 admin/
   chmod 644 admin/*.php
   chmod 777 content/posts/
   chmod 777 images/
   \`\`\`

### Bước 5: Cấu hình Next.js cho Static Hosting

1. **Tạo file .htaccess** trong public_html:
   ```apache
   RewriteEngine On
   
   # Handle Next.js routing
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^(.*)$ /index.html [L]
   
   # Security headers
   Header always set X-Content-Type-Options nosniff
   Header always set X-Frame-Options DENY
   Header always set X-XSS-Protection "1; mode=block"
   \`\`\`

### Bước 6: Cấu hình Admin Panel

1. **Truy cập admin panel**: `https://yourdomain.com/admin/`
2. **Tạo bài viết đầu tiên** để test
3. **Kiểm tra permissions** của thư mục content/posts/

### Bước 7: Bảo mật Admin Panel (Tùy chọn)

1. **Thêm Basic Authentication** vào admin/.htaccess:
   ```apache
   AuthType Basic
   AuthName "Admin Area"
   AuthUserFile /path/to/.htpasswd
   Require valid-user
   \`\`\`

2. **Tạo file .htpasswd**:
   \`\`\`bash
   htpasswd -c .htpasswd admin
   \`\`\`

## 🔧 Cấu hình nâng cao

### SSL Certificate
1. **Kích hoạt SSL** trong cPanel
2. **Force HTTPS** bằng cách thêm vào .htaccess:
   ```apache
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   \`\`\`

### Caching
1. **Browser Caching** trong .htaccess:
   ```apache
   <IfModule mod_expires.c>
   ExpiresActive On
   ExpiresByType text/css "access plus 1 year"
   ExpiresByType application/javascript "access plus 1 year"
   ExpiresByType image/png "access plus 1 year"
   ExpiresByType image/jpg "access plus 1 year"
   ExpiresByType image/jpeg "access plus 1 year"
   </IfModule>
   \`\`\`

### Backup tự động
1. **Cron job** để backup content:
   \`\`\`bash
   0 2 * * * tar -czf /backup/content-$(date +\%Y\%m\%d).tar.gz /public_html/content/
   \`\`\`

## 📝 Sử dụng Admin Panel

### Truy cập Admin
- URL: `https://yourdomain.com/admin/`
- Không có link từ trang public (bảo mật)

### Tạo bài viết mới
1. Click "Tạo bài viết mới"
2. Điền thông tin: tiêu đề, nội dung, category, tags
3. Upload ảnh bìa (nếu có)
4. Click "Lưu bài viết"

### Chỉnh sửa bài viết
1. Click "Sửa" trên bài viết cần chỉnh sửa
2. Thay đổi nội dung
3. Click "Cập nhật bài viết"

## 🛠️ Troubleshooting

### Lỗi thường gặp

1. **500 Internal Server Error**
   - Kiểm tra file permissions
   - Xem error logs trong cPanel

2. **Admin panel không load**
   - Kiểm tra PHP version
   - Đảm bảo mod_rewrite được bật

3. **Không tạo được bài viết**
   - Kiểm tra permissions thư mục content/posts/
   - Đảm bảo PHP có quyền ghi file

4. **Hình ảnh không upload được**
   - Kiểm tra permissions thư mục images/
   - Kiểm tra upload_max_filesize trong PHP

### Logs và Debug
- **Error logs**: cPanel → Error Logs
- **PHP errors**: Bật display_errors trong development
- **File permissions**: Sử dụng File Manager để kiểm tra

## 📞 Hỗ trợ

Nếu gặp vấn đề trong quá trình deploy:

1. **Kiểm tra requirements**: PHP 7.4+, mod_rewrite
2. **Xem error logs** trong cPanel
3. **Liên hệ hosting provider** nếu cần hỗ trợ server
4. **Tham khảo documentation** của hosting provider

## 📄 License

MIT License - Sử dụng tự do cho mục đích cá nhân và thương mại.
