export const createSubmoduleDto = (data) => {
  const module_id = Number(data.module_id);
  const name = (data.name || "").trim();
  const path = (data.path || "").trim();
  const icon = (data.icon || "").trim();
  const errors = [];

  if (!module_id || isNaN(module_id))
    errors.push("module_id is required and must be a number");
  if (!name) errors.push("name is required");
  if (!path) errors.push("path is required");
  if (!icon) errors.push("icon is required");

  return {
    isValid: errors.length === 0,
    errors,
    value: { module_id, name, path, icon },
  };
};
