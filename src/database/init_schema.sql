DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;
USE testdb;

-- =============================================
-- 👤 Tabla de Usuarios
-- =============================================
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL
);

-- =============================================
-- 🔐 Tabla de Roles
-- =============================================
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

-- =============================================
-- 🔓 Tabla de Permisos
-- =============================================
CREATE TABLE permissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- =============================================
-- 🔗 Relación: Usuarios - Roles
-- =============================================
CREATE TABLE user_roles (
  user_id INT,
  role_id INT,
  PRIMARY KEY(user_id, role_id),
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY(role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- =============================================
-- 🔗 Relación: Roles - Permisos
-- =============================================
CREATE TABLE role_permissions (
  role_id INT,
  permission_id INT,
  PRIMARY KEY(role_id, permission_id),
  FOREIGN KEY(role_id) REFERENCES roles(id) ON DELETE CASCADE,
  FOREIGN KEY(permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

-- =============================================
-- 📌 PROCEDIMIENTOS ALMACENADOS
-- =============================================

-- Crear usuario
DELIMITER //
CREATE PROCEDURE sp_create_user(IN p_name VARCHAR(100), IN p_email VARCHAR(100))
BEGIN
  INSERT INTO users (name, email) VALUES (p_name, p_email);
END;
//

-- Actualizar usuario
CREATE PROCEDURE sp_update_user(IN p_id INT, IN p_name VARCHAR(100), IN p_email VARCHAR(100))
BEGIN
  UPDATE users SET name = p_name, email = p_email WHERE id = p_id;
END;
//

-- Eliminar usuario
CREATE PROCEDURE sp_delete_user(IN p_id INT)
BEGIN
  DELETE FROM users WHERE id = p_id;
END;
//

-- Crear rol
CREATE PROCEDURE sp_create_role(IN p_name VARCHAR(50))
BEGIN
  INSERT INTO roles (name) VALUES (p_name);
END;
//

-- Crear permiso
CREATE PROCEDURE sp_create_permission(IN p_name VARCHAR(100))
BEGIN
  INSERT INTO permissions (name) VALUES (p_name);
END;
//

-- Asignar rol a usuario
CREATE PROCEDURE sp_assign_role(IN p_user_id INT, IN p_role_id INT)
BEGIN
  INSERT IGNORE INTO user_roles (user_id, role_id)
  VALUES (p_user_id, p_role_id);
END;
//

-- Asignar permiso a rol
CREATE PROCEDURE sp_assign_permission(IN p_role_id INT, IN p_permission_id INT)
BEGIN
  INSERT IGNORE INTO role_permissions (role_id, permission_id)
  VALUES (p_role_id, p_permission_id);
END;
//
DELIMITER ;
