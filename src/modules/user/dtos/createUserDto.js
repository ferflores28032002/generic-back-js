export const createUserDto = (data) => {
  const name = (data.name || "").trim();
  const email = (data.email || "").trim().toLowerCase();

  const errors = [];

  if (!name) errors.push("Name is required");

  return {
    isValid: errors.length === 0,
    errors,
    value: { name, email },
  };
};
