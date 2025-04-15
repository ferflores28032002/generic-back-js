export const UserModel = {
  table: "users",
  fields: ["id", "name", "email"],
  procedures: {
    getAll: "sp_get_all_users",
    create: "sp_create_user",
  },
};
