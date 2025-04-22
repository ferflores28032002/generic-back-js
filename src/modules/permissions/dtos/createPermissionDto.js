export const createPermissionDto = (data) => {
  const name = (data.name || "").trim();
  const description = (data.description || "").trim();
  const errors = [];

  if (!name) errors.push("Name is required");

  return {
    isValid: errors.length === 0,
    errors,
    value: { name, description },
  };
};
