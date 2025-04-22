export const UserModel = {
  table: "users",
  fields: ["id", "username", "email", "password_hash", "is_active", "created_at"],
  procedures: {
    create: "sp_create_user",
    update: "sp_update_user",
    delete: "sp_delete_user",
    getAccess: "sp_get_user_access_structure"
  },
};
