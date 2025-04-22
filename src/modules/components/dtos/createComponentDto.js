export const createComponentDto = (data) => {
    const name = (data.name || "").trim();
    const type = (data.type || "").trim();
    const module_id = data.module_id !== undefined ? Number(data.module_id) : null;
    const submodule_id = data.submodule_id !== undefined ? Number(data.submodule_id) : null;
  
    const errors = [];
  
    if (!name) errors.push("name is required");
    if (!type || !["tab", "button"].includes(type)) errors.push("type must be 'tab' or 'button'");
    if (!module_id && !submodule_id) errors.push("Either module_id or submodule_id is required");
    if (module_id && submodule_id) errors.push("Only one of module_id or submodule_id must be provided");
  
    return {
      isValid: errors.length === 0,
      errors,
      value: { name, type, module_id, submodule_id },
    };
  };
  