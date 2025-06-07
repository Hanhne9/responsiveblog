<?php
// Start session for flash messages
session_start();

// Configuration
$contentDir = '../content/posts/';
$uploadsDir = '../public/images/';

// Helper functions
function slugify($text) {
    // Convert to lowercase and replace spaces with hyphens
    $text = strtolower(trim($text));
    $text = preg_replace('/[^a-z0-9-]/', '-', $text);
    $text = preg_replace('/-+/', '-', $text);
    return trim($text, '-');
}

function formatDisplayName($slug) {
    // Convert slug to display name (e.g., "web-development" to "Web Development")
    return ucwords(str_replace('-', ' ', $slug));
}

// Get all posts
function getPosts() {
    global $contentDir;
    $posts = [];
    
    if (is_dir($contentDir)) {
        $files = scandir($contentDir);
        foreach ($files as $file) {
            if ($file !== '.' && $file !== '..' && pathinfo($file, PATHINFO_EXTENSION) === 'mdx') {
                $content = file_get_contents($contentDir . $file);
                
                // Extract frontmatter
                preg_match('/^---\s*(.*?)\s*---/s', $content, $matches);
                $frontmatter = isset($matches[1]) ? $matches[1] : '';
                
                // Extract title
                preg_match('/title:\s*[\'"]?(.*?)[\'"]?\s*$/m', $frontmatter, $titleMatches);
                $title = isset($titleMatches[1]) ? $titleMatches[1] : pathinfo($file, PATHINFO_FILENAME);
                
                // Extract date
                preg_match('/date:\s*[\'"]?(.*?)[\'"]?\s*$/m', $frontmatter, $dateMatches);
                $date = isset($dateMatches[1]) ? $dateMatches[1] : '';
                
                $posts[] = [
                    'filename' => $file,
                    'title' => $title,
                    'date' => $date,
                    'slug' => pathinfo($file, PATHINFO_FILENAME)
                ];
            }
        }
    }
    
    // Sort by date (newest first)
    usort($posts, function($a, $b) {
        return strtotime($b['date']) - strtotime($a['date']);
    });
    
    return $posts;
}

// Handle delete action
if (isset($_GET['action']) && $_GET['action'] === 'delete' && isset($_GET['file'])) {
    $file = basename($_GET['file']);
    $filePath = $contentDir . $file;
    
    if (file_exists($filePath) && unlink($filePath)) {
        $_SESSION['flash'] = "Bài viết đã được xóa thành công!";
    } else {
        $_SESSION['flash_error'] = "Không thể xóa bài viết!";
    }
    
    header('Location: index.php');
    exit;
}

$posts = getPosts();
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quản lý Blog</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
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
        
        .card-hover {
            transition: all 0.3s ease;
        }
        
        .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }
    </style>
</head>
<body class="bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-3xl font-bold text-white">Quản lý Blog</h1>
            <a href="edit.php" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300 flex items-center">
                <i class="fas fa-plus mr-2"></i> Tạo bài viết mới
            </a>
        </div>
        
        <?php if (isset($_SESSION['flash'])): ?>
            <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded" role="alert">
                <p><?php echo $_SESSION['flash']; ?></p>
            </div>
            <?php unset($_SESSION['flash']); ?>
        <?php endif; ?>
        
        <?php if (isset($_SESSION['flash_error'])): ?>
            <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
                <p><?php echo $_SESSION['flash_error']; ?></p>
            </div>
            <?php unset($_SESSION['flash_error']); ?>
        <?php endif; ?>
        
        <div class="glass rounded-xl p-6 shadow-xl">
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead class="bg-gray-800 text-white">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Tiêu đề</th>
                            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Ngày đăng</th>
                            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Slug</th>
                            <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <?php if (empty($posts)): ?>
                            <tr>
                                <td colspan="4" class="px-6 py-4 text-center text-gray-500">Chưa có bài viết nào</td>
                            </tr>
                        <?php else: ?>
                            <?php foreach ($posts as $post): ?>
                                <tr class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm font-medium text-gray-900"><?php echo htmlspecialchars($post['title']); ?></div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-500"><?php echo htmlspecialchars($post['date']); ?></div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-500"><?php echo htmlspecialchars($post['slug']); ?></div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <a href="edit.php?file=<?php echo urlencode($post['filename']); ?>" class="text-indigo-600 hover:text-indigo-900 mr-4">
                                            <i class="fas fa-edit"></i> Sửa
                                        </a>
                                        <a href="index.php?action=delete&file=<?php echo urlencode($post['filename']); ?>" 
                                           class="text-red-600 hover:text-red-900"
                                           onclick="return confirm('Bạn có chắc chắn muốn xóa bài viết này?');">
                                            <i class="fas fa-trash"></i> Xóa
                                        </a>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="mt-8 text-center text-white text-sm">
            <p>© <?php echo date('Y'); ?> Blog Admin Panel. Không hiển thị link cho người dùng.</p>
        </div>
    </div>
</body>
</html>
