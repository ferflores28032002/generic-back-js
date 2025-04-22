
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);


CREATE TABLE user_roles (
  user_id INT,
  role_id INT,
  PRIMARY KEY(user_id, role_id),
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY(role_id) REFERENCES roles(id) ON DELETE CASCADE
);


CREATE TABLE permissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT
);


CREATE TABLE role_permissions (
  role_id INT,
  permission_id INT,
  PRIMARY KEY(role_id, permission_id),
  FOREIGN KEY(role_id) REFERENCES roles(id) ON DELETE CASCADE,
  FOREIGN KEY(permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);


CREATE TABLE modules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  path VARCHAR(255),
  icon VARCHAR(100)
);


CREATE TABLE submodules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  module_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  path VARCHAR(255),
  icon VARCHAR(100),
  FOREIGN KEY(module_id) REFERENCES modules(id) ON DELETE CASCADE
);


CREATE TABLE components (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type ENUM('tab', 'button') NOT NULL,
  module_id INT,
  submodule_id INT,
  FOREIGN KEY(module_id) REFERENCES modules(id) ON DELETE CASCADE,
  FOREIGN KEY(submodule_id) REFERENCES submodules(id) ON DELETE CASCADE,
  CHECK (
    (module_id IS NOT NULL AND submodule_id IS NULL) OR
    (module_id IS NULL AND submodule_id IS NOT NULL)
  )
);


CREATE TABLE permission_components (
  permission_id INT,
  component_id INT,
  PRIMARY KEY(permission_id, component_id),
  FOREIGN KEY(permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
  FOREIGN KEY(component_id) REFERENCES components(id) ON DELETE CASCADE
);


INSERT INTO roles (name) VALUES ('Admin');

INSERT INTO modules (name, path, icon) VALUES 
('Dashboard', '/dashboard', 'dashboard'),
('Productos', '/productos', 'box');

INSERT INTO submodules (module_id, name, path, icon) VALUES 
(2, 'De Proveedores', '/productos/proveedores', 'truck'),
(2, 'De Managua', '/productos/managua', 'map');

INSERT INTO components (name, type, module_id) VALUES 
('Resumen general', 'tab', 1),
('Actualizar métricas', 'button', 1);

INSERT INTO components (name, type, submodule_id) VALUES 
('Ver lista', 'tab', 2),
('Crear', 'button', 2);

INSERT INTO permissions (name, description) VALUES 
('dashboard.view_summary', 'Puede ver resumen del dashboard'),
('productos.managua.create', 'Puede crear productos en Managua');

INSERT INTO role_permissions (role_id, permission_id) VALUES 
(1, 1),
(1, 2);

INSERT INTO permission_components (permission_id, component_id) VALUES 
(1, 1),
(2, 4);



CREATE PROCEDURE sp_create_user(IN p_username VARCHAR(50), IN p_email VARCHAR(100), IN p_password_hash VARCHAR(255))
BEGIN
  INSERT INTO users (username, email, password_hash)
  VALUES (p_username, p_email, p_password_hash);
END;

CREATE PROCEDURE sp_update_user(IN p_id INT, IN p_username VARCHAR(50), IN p_email VARCHAR(100))
BEGIN
  UPDATE users SET username = p_username, email = p_email WHERE id = p_id;
END;




CREATE PROCEDURE sp_delete_user(IN p_id INT)
BEGIN
  DELETE FROM users WHERE id = p_id;
END;




CREATE PROCEDURE sp_create_role(IN p_name VARCHAR(50))
BEGIN
  INSERT INTO roles (name) VALUES (p_name);
END;





CREATE PROCEDURE sp_create_permission(IN p_name VARCHAR(100), IN p_description TEXT)
BEGIN
  INSERT INTO permissions (name, description)
  VALUES (p_name, p_description);
END;





CREATE PROCEDURE sp_assign_role(IN p_user_id INT, IN p_role_id INT)
BEGIN
  INSERT IGNORE INTO user_roles (user_id, role_id)
  VALUES (p_user_id, p_role_id);
END;





CREATE PROCEDURE sp_assign_permission(IN p_role_id INT, IN p_permission_id INT)
BEGIN
  INSERT IGNORE INTO role_permissions (role_id, permission_id)
  VALUES (p_role_id, p_permission_id);
END;




CREATE PROCEDURE sp_create_module(
  IN p_name VARCHAR(100),
  IN p_path VARCHAR(255),
  IN p_icon VARCHAR(100)
)
BEGIN
  INSERT INTO modules (name, path, icon)
  VALUES (p_name, p_path, p_icon);
END;





CREATE PROCEDURE sp_create_submodule(
  IN p_module_id INT,
  IN p_name VARCHAR(100),
  IN p_path VARCHAR(255),
  IN p_icon VARCHAR(100)
)
BEGIN
  INSERT INTO submodules (module_id, name, path, icon)
  VALUES (p_module_id, p_name, p_path, p_icon);
END;






CREATE PROCEDURE sp_create_component(
  IN p_name VARCHAR(100),
  IN p_type ENUM('tab', 'button'),
  IN p_module_id INT,
  IN p_submodule_id INT
)
BEGIN
  INSERT INTO components (name, type, module_id, submodule_id)
  VALUES (p_name, p_type, p_module_id, p_submodule_id);
END;





DROP PROCEDURE IF EXISTS sp_get_user_access_structure;

CREATE PROCEDURE sp_get_user_access_structure(IN p_user_id INT)
BEGIN
  SELECT JSON_OBJECT(
    'modules', JSON_ARRAYAGG(
      JSON_OBJECT(
        'name', m.name,
        'path', m.path,
        'icon', m.icon,
        'components', COALESCE((
          SELECT JSON_ARRAYAGG(
            JSON_OBJECT('name', c1.name, 'type', c1.type)
          )
          FROM components c1
          JOIN permission_components pc1 ON pc1.component_id = c1.id
          JOIN permissions p1 ON p1.id = pc1.permission_id
          JOIN role_permissions rp1 ON rp1.permission_id = p1.id
          JOIN user_roles ur1 ON ur1.role_id = rp1.role_id
          WHERE c1.module_id = m.id AND c1.submodule_id IS NULL AND ur1.user_id = p_user_id
        ), JSON_ARRAY()),
        'submodules', COALESCE((
          SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
              'name', sm.name,
              'path', sm.path,
              'icon', sm.icon,
              'components', COALESCE((
                SELECT JSON_ARRAYAGG(
                  JSON_OBJECT('name', c2.name, 'type', c2.type)
                )
                FROM components c2
                JOIN permission_components pc2 ON pc2.component_id = c2.id
                JOIN permissions p2 ON p2.id = pc2.permission_id
                JOIN role_permissions rp2 ON rp2.permission_id = p2.id
                JOIN user_roles ur2 ON ur2.role_id = rp2.role_id
                WHERE c2.submodule_id = sm.id AND ur2.user_id = p_user_id
              ), JSON_ARRAY())
            )
          )
          FROM submodules sm
          WHERE sm.module_id = m.id
        ), JSON_ARRAY())
      )
    )
  ) AS user_access_json
  FROM modules m;
END;

CALL sp_assign_role(1, 1);


