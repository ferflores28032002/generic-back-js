export const assignPermissionDto = (data) => {
    const role_id = Number(data.role_id);
    const permission_id = Number(data.permission_id);
    const errors = [];
  
    if (!role_id || isNaN(role_id)) errors.push("role_id is required and must be a number");
    if (!permission_id || isNaN(permission_id)) errors.push("permission_id is required and must be a number");
  
    return {
      isValid: errors.length === 0,
      errors,
      value: { role_id, permission_id },
    };
  };
  