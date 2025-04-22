export const assignRoleDto = (data) => {
    const user_id = Number(data.user_id);
    const role_id = Number(data.role_id);
    const errors = [];
  
    if (!user_id || isNaN(user_id)) errors.push("user_id is required and must be a number");
    if (!role_id || isNaN(role_id)) errors.push("role_id is required and must be a number");
  
    return {
      isValid: errors.length === 0,
      errors,
      value: { user_id, role_id },
    };
  };
  