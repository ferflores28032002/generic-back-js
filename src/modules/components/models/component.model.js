export const ComponentModel = {
  table: "components",
  fields: ["id", "name", "type", "module_id", "submodule_id"],
  procedures: {
    create: "sp_create_component",
  },
};
