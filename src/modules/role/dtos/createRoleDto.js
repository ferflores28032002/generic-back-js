export const createRoleDto = (data) => {
    const name = (data.name || "").trim();
    const errors = [];
  
    if (!name) errors.push("Name is required");
  
    return {
      isValid: errors.length === 0,
      errors,
      value: { name },
    };
  };
  