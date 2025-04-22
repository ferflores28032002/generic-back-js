export const RoleModel = {
  table: "roles",
  fields: ["id", "name"],
  procedures: {
    create: "sp_create_role",
  },
};
