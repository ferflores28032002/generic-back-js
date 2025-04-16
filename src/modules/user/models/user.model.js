export const UserModel = {
  table: "users",
  fields: ["id", "name", "email"],
  procedures: {
    create: "sp_create_user",
    delete: "sp_delete_user",
    update: "sp_update_user",
  },
};
