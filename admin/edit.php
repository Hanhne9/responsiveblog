<?php
session_start();

// Configuration
$contentDir = '../content/posts/';
$uploadsDir = '../public/images/';

// Ensure uploads directory exists
if (!file_exists($uploadsDir)) {
    mkdir($uploadsDir, 0755, true);
}

// Helper functions
function slugify($text) {
    // Convert to lowercase and replace spaces with hyphens
    $text = strtolower(trim($text));
    $text = preg_replace('/[^a-z0-9-]/', '-', $text);
    $text = preg_replace('/-+/', '-', $text);
    return trim($text, '-');
}

// Initialize variables
$title = '';
$excerpt = '';
$content = '';
$date = date('Y-m-d');
$author = '';
$category = '';
$tags = '';
$coverImage = '';
$isEditing = false;
$originalFilename = '';

// Check if we're editing an existing post
if (isset($_GET['file'])) {
    $filename = basename($_GET['file']);
    $filePath = $contentDir . $filename;
    $isEditing = true;
    $originalFilename = $filename;
    
    if (file_exists($filePath)) {
        $fileContent = file_get_contents($filePath);
        
        // Extract frontmatter
        preg_match('/^---\s*(.*?)\s*---/s', $fileContent, $matches);
        $frontmatter = isset($matches[1]) ? $matches[1] : '';
        
        // Extract content (everything after frontmatter)
        $content = preg_replace('/^---\s*(.*?)\s*---/s', '', $fileContent, 1);
        $content = trim($content);
        
        // Extract title
        preg_match('/title:\s*[\'"]?(.*?)[\'"]?\s*$/m', $frontmatter, $titleMatches);
        $title = isset($titleMatches[1]) ? $titleMatches[1] : '';
        
        // Extract excerpt
        preg_match('/excerpt:\s*[\'"]?(.*?)[\'"]?\s*$/m', $frontmatter, $excerptMatches);
        $excerpt = isset($excerptMatches[1]) ? $excerptMatches[1] : '';
        
        // Extract date
        preg_match('/date:\s*[\'"]?(.*?)[\'"]?\s*$/m', $frontmatter, $dateMatches);
        $date = isset($dateMatches[1]) ? $dateMatches[1] : date('Y-m-d');
        
        // Extract author
        preg_match('/author:\s*[\'"]?(.*?)[\'"]?\s*$/m', $frontmatter, $authorMatches);
        $author = isset($authorMatches[1]) ? $authorMatches[1] : '';
        
        // Extract category
        preg_match('/category:\s*[\'"]?(.*?)[\'"]?\s*$/m', $frontmatter, $categoryMatches);
        $category = isset($categoryMatches[1]) ? $categoryMatches[1] : '';
        
        // Extract tags
        preg_match('/tags:\s*\[(.*?)\]/s', $frontmatter, $tagsMatches);
        if (isset($tagsMatches[1])) {
            $tagsArray = explode(',', $tagsMatches[1]);
            $tags = implode(', ', array_map(function($tag) {
                return trim(str_replace('"', '', $tag));
            }, $tagsArray));
        }
        
        // Extract cover image
        preg_match('/coverImage:\s*[\'"]?(.*?)[\'"]?\s*$/m', $frontmatter, $coverMatches);
        $coverImage = isset($coverMatches[1]) ? $coverMatches[1] : '';
    }
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'] ?? '';
    $excerpt = $_POST['excerpt'] ?? '';
    $content = $_POST['content'] ?? '';
    $date = $_POST['date'] ?? date('Y-m-d');
    $author = $_POST['author'] ?? '';
    $category = $_POST['category'] ?? '';
    $tags = $_POST['tags'] ?? '';
    $coverImage = $_POST['coverImage'] ?? '';
    
    // Handle file upload
    if (isset($_FILES['newCoverImage']) && $_FILES['newCoverImage']['error'] === UPLOAD_ERR_OK) {
        $tempName = $_FILES['newCoverImage']['tmp_name'];
        $originalName = $_FILES['newCoverImage']['name'];
        $extension = pathinfo($originalName, PATHINFO_EXTENSION);
        $newFilename = slugify($title) . '-cover.' . $extension;
        $destination = $uploadsDir . $newFilename;
        
        if (move_uploaded_file($tempName, $destination)) {
            $coverImage = '/images/' . $newFilename;
        }
    }
    
    // Format tags for frontmatter
    $tagsArray = array_map('trim', explode(',', $tags));
    $formattedTags = implode('", "', $tagsArray);
    if (!empty($formattedTags)) {
        $formattedTags = '"' . $formattedTags . '"';
    }
    
    // Create slug from title
    $slug = slugify($title);
    
    // Create frontmatter
    $frontmatter = <<<EOT
---
title: "$title"
excerpt: "$excerpt"
date: "$date"
author: "$author"
category: "$category"
tags: [$formattedTags]
coverImage: "$coverImage"
---

EOT;

    // Combine frontmatter and content
    $fullContent = $frontmatter . $content;
    
    // Determine filename
    $filename = $slug . '.mdx';
    if ($isEditing && $originalFilename !== $filename) {
        // Delete the old file if the slug changed
        unlink($contentDir . $originalFilename);
    }
    
    // Save the file
    if (file_put_contents($contentDir . $filename, $fullContent)) {
        $_SESSION['flash'] = "Bài viết đã được lưu thành công!";
        header('Location: index.php');
        exit;
    } else {
        $_SESSION['flash_error'] = "Không thể lưu bài viết!";
    }
}
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $isEditing ? 'Sửa bài viết' : 'Tạo bài viết mới'; ?> - Quản lý Blog</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <!-- Include TinyMCE -->
    <script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>
    <style>
        .glass {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.18);
        }
        
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        /* Custom styling for TinyMCE */
        .tox-tinymce {
            border-radius: 0.5rem !important;
            border: 1px solid #e2e8f0 !important;
        }
        
        .preview-image {
            max-height: 200px;
            object-fit: cover;
        }
    </style>
</head>
<body>
    <div class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold text-white">
                <?php echo $isEditing ? 'Sửa bài viết' : 'Tạo bài viết mới'; ?>
            </h1>
            <a href="index.php" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-300 flex items-center">
                <i class="fas fa-arrow-left mr-2"></i> Quay lại
            </a>
        </div>
        
        <div class="glass rounded-xl p-6 shadow-xl">
            <form method="post" enctype="multipart/form-data">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="col-span-2">
                        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
                        <input type="text" name="title" id="title" required
                               class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                               value="<?php echo htmlspecialchars($title); ?>">
                    </div>
                    
                    <div class="col-span-2">
                        <label for="excerpt" class="block text-sm font-medium text-gray-700 mb-1">Tóm tắt</label>
                        <textarea name="excerpt" id="excerpt" rows="3"
                                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"><?php echo htmlspecialchars($excerpt); ?></textarea>
                    </div>
                    
                    <div>
                        <label for="date" class="block text-sm font-medium text-gray-700 mb-1">Ngày đăng</label>
                        <input type="date" name="date" id="date" required
                               class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                               value="<?php echo htmlspecialchars($date); ?>">
                    </div>
                    
                    <div>
                        <label for="author" class="block text-sm font-medium text-gray-700 mb-1">Tác giả</label>
                        <input type="text" name="author" id="author"
                               class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                               value="<?php echo htmlspecialchars($author); ?>">
                    </div>
                    
                    <div>
                        <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                        <input type="text" name="category" id="category"
                               class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                               value="<?php echo htmlspecialchars($category); ?>">
                    </div>
                    
                    <div>
                        <label for="tags" class="block text-sm font-medium text-gray-700 mb-1">Tags (phân cách bằng dấu phẩy)</label>
                        <input type="text" name="tags" id="tags"
                               class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                               value="<?php echo htmlspecialchars($tags); ?>">
                    </div>
                    
                    <div class="col-span-2">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Ảnh bìa</label>
                        <div class="flex items-center space-x-4">
                            <?php if (!empty($coverImage)): ?>
                                <div>
                                    <img src="<?php echo htmlspecialchars($coverImage); ?>" alt="Cover Image" class="preview-image rounded">
                                    <input type="hidden" name="coverImage" value="<?php echo htmlspecialchars($coverImage); ?>">
                                </div>
                            <?php endif; ?>
                            <div class="flex-1">
                                <input type="file" name="newCoverImage" id="newCoverImage" accept="image/*"
                                       class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <p class="text-xs text-gray-500 mt-1">Tải lên ảnh mới hoặc giữ nguyên ảnh hiện tại</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-span-2">
                        <label for="content" class="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
                        <textarea name="content" id="content" rows="20"><?php echo htmlspecialchars($content); ?></textarea>
                    </div>
                    
                    <div class="col-span-2 flex justify-end">
                        <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition duration-300">
                            <i class="fas fa-save mr-2"></i> Lưu bài viết
                        </button>
                    </div>
                </div>
            </form>
        </div>
        
        <div class="mt-8 text-center text-white text-sm">
            <p>© <?php echo date('Y'); ?> Blog Admin Panel. Không hiển thị link cho người dùng.</p>
        </div>
    </div>
    
    <script>
        // Initialize TinyMCE
        tinymce.init({
            selector: '#content',
            plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' },
            ],
            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
            height: 500,
            setup: function(editor) {
                // Add custom MDX support
                editor.on('init', function() {
                    editor.formatter.register('mdxcode', {
                        block: 'pre',
                        classes: 'language-jsx'
                    });
                });
                
                // Add MDX code block button
                editor.ui.registry.addButton('mdxcode', {
                    text: 'MDX Code',
                    onAction: function() {
                        editor.formatter.apply('mdxcode');
                    }
                });
            },
            content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 16px; }'
        });
    </script>
</body>
</html>
