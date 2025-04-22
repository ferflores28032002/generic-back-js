export const SubmoduleModel = {
  table: "submodules",
  fields: ["id", "module_id", "name", "path", "icon"],
  procedures: {
    create: "sp_create_submodule",
  },
};
