export const PermissionModel = {
    table: "permissions",
    fields: ["id", "name", "description"],
    procedures: {
      create: "sp_create_permission",
    },
  };
  