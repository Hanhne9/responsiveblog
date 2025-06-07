<?php
// Configuration
$uploadsDir = '../public/images/';

// Ensure uploads directory exists
if (!file_exists($uploadsDir)) {
    mkdir($uploadsDir, 0755, true);
}

// Handle file upload
if (isset($_FILES['file'])) {
    $response = array();
    
    $file = $_FILES['file'];
    $name = $file['name'];
    $tmp_name = $file['tmp_name'];
    
    // Generate a unique filename
    $extension = pathinfo($name, PATHINFO_EXTENSION);
    $newFilename = uniqid() . '.' . $extension;
    $destination = $uploadsDir . $newFilename;
    
    if (move_uploaded_file($tmp_name, $destination)) {
        $response['location'] = '/images/' . $newFilename;
        echo json_encode($response);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to upload file']);
    }
    exit;
}

http_response_code(400);
echo json_encode(['error' => 'No file uploaded']);
