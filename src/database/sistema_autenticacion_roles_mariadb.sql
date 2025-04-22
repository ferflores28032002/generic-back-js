
-- ============================================
-- 📦 SCRIPT PROFESIONAL: Sistema de Autenticación con Roles, Permisos, Módulos y Componentes
-- Base de datos: MariaDB
-- ============================================

-- 🔁 DROP TABLES SI EXISTEN (para desarrollo/testing)
DROP TABLE IF EXISTS permission_components;
DROP TABLE IF EXISTS components;
DROP TABLE IF EXISTS submodules;
DROP TABLE IF EXISTS modules;
DROP TABLE IF EXISTS role_permissions;
DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS permissions;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS users;

-- =====================
-- 🧑 Tabla de Usuarios
-- =====================
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================
-- 🔐 Tabla de Roles
-- =====================
CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

-- ==================================
-- 🔗 Relación Usuarios - Roles
-- ==================================
CREATE TABLE user_roles (
  user_id INT,
  role_id INT,
  PRIMARY KEY(user_id, role_id),
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY(role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- ===============================
-- 🎯 Tabla de Permisos
-- ===============================
CREATE TABLE permissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT
);

-- ==================================
-- 🔗 Relación Roles - Permisos
-- ==================================
CREATE TABLE role_permissions (
  role_id INT,
  permission_id INT,
  PRIMARY KEY(role_id, permission_id),
  FOREIGN KEY(role_id) REFERENCES roles(id) ON DELETE CASCADE,
  FOREIGN KEY(permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);

-- =============================
-- 📂 Tabla de Módulos
-- =============================
CREATE TABLE modules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  path VARCHAR(255),
  icon VARCHAR(100)
);

-- =============================
-- 📁 Tabla de Submódulos
-- =============================
CREATE TABLE submodules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  module_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  path VARCHAR(255),
  icon VARCHAR(100),
  FOREIGN KEY(module_id) REFERENCES modules(id) ON DELETE CASCADE
);

-- ===================================
-- 🧩 Componentes (Tabs, Botones, etc.)
-- ===================================
CREATE TABLE components (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type ENUM('tab', 'button', 'modal', 'form') NOT NULL,
  module_id INT,
  submodule_id INT,
  FOREIGN KEY(module_id) REFERENCES modules(id) ON DELETE CASCADE,
  FOREIGN KEY(submodule_id) REFERENCES submodules(id) ON DELETE CASCADE,
  CHECK (
    (module_id IS NOT NULL AND submodule_id IS NULL) OR
    (module_id IS NULL AND submodule_id IS NOT NULL)
  )
);

-- ===============================================
-- 🔗 Asociación Permisos - Componentes Visuales
-- ===============================================
CREATE TABLE permission_components (
  permission_id INT,
  component_id INT,
  PRIMARY KEY(permission_id, component_id),
  FOREIGN KEY(permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
  FOREIGN KEY(component_id) REFERENCES components(id) ON DELETE CASCADE
);

-- =======================
-- ✅ Datos de Ejemplo
-- =======================

-- Insertar Roles
INSERT INTO roles (name) VALUES ('Admin');

-- Insertar Módulos
INSERT INTO modules (name, path, icon) VALUES 
('Dashboard', '/dashboard', 'dashboard'),
('Productos', '/productos', 'box');

-- Submódulos del módulo Productos
INSERT INTO submodules (module_id, name, path, icon) VALUES 
(2, 'De Proveedores', '/productos/proveedores', 'truck'),
(2, 'De Managua', '/productos/managua', 'map');

-- Componentes del módulo Dashboard (sin submódulos)
INSERT INTO components (name, type, module_id) VALUES 
('Resumen general', 'tab', 1),
('Actualizar métricas', 'button', 1);

-- Componentes del submódulo 'De Managua'
INSERT INTO components (name, type, submodule_id) VALUES 
('Ver lista', 'tab', 2),
('Crear', 'button', 2);

-- Insertar permisos
INSERT INTO permissions (name, description) VALUES 
('dashboard.view_summary', 'Puede ver resumen del dashboard'),
('productos.managua.create', 'Puede crear productos en Managua');

-- Asociar permisos al rol Admin
INSERT INTO role_permissions (role_id, permission_id) VALUES 
(1, 1),
(1, 2);

-- Asociar permisos a componentes
INSERT INTO permission_components (permission_id, component_id) VALUES 
(1, 1),  -- Resumen general
(2, 4);  -- Crear producto Managua


-- Asi quedaría la estructura de permisos y componentes en JSON:
{
  "modules": [
    {
      "name": "Dashboard",
      "path": "/dashboard",
      "icon": "dashboard",
      "components": [
        { "name": "Resumen general", "type": "tab" },
        { "name": "Actualizar métricas", "type": "button" }
      ]
    },
    {
      "name": "Productos",
      "path": "/productos",
      "icon": "box",
      "submodules": [
        {
          "name": "De Managua",
          "path": "/productos/managua",
          "icon": "map",
          "components": [
            { "name": "Ver lista", "type": "tab" },
            { "name": "Crear", "type": "button" }
          ]
        }
      ]
    }
  ]
}
