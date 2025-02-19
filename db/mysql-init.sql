CREATE DATABASE IF NOT EXISTS grants_db;
USE grants_db;

CREATE TABLE IF NOT EXISTS grants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    professor_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    requested_funding DECIMAL(10,2) NOT NULL,
    status ENUM('Pending Review', 'Approved', 'Rejected') NOT NULL DEFAULT 'Pending Review'
);
