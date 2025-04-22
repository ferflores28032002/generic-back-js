export const createModuleDto = (data) => {
  const safeData = data || {};
  const name = (safeData.name || "").trim();
  const path = (safeData.path || "").trim();
  const icon = (safeData.icon || "").trim();

  const errors = [];

  if (!name) errors.push("name is required");
  if (!path) errors.push("path is required");
  if (!icon) errors.push("icon is required");

  return {
    isValid: errors.length === 0,
    errors,
    value: { name, path, icon },
  };
};
