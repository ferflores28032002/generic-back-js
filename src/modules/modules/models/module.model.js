export const ModuleModel = {
  table: "modules",
  fields: ["id", "name", "path", "icon"],
  procedures: {
    create: "sp_create_module",
  },
};
