let socketServerInstance;

// Este es un patrón singleton para asegurar que solo se cree una instancia del servidor de Socket.IO

export const setSocketServerInstance = (instance) => {
  socketServerInstance = instance;
};

export const getSocketServerInstance = () => {
  if (!socketServerInstance) {
    throw new Error("Socket.IO not initialized");
  }
  return socketServerInstance;
};
