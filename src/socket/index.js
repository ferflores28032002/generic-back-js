import userSocket from "../modules/user/socket/user.socket.js";

import { SOCKET_CORE_EVENTS } from "../constants/index.js";

export const registerSocketEvents = (io) => {
  io.on(SOCKET_CORE_EVENTS.CONNECTION, (socket) => {
    
    // colocar todas los sockets de los modulos aqui
    userSocket(socket, io);

    socket.on(SOCKET_CORE_EVENTS.DISCONNECT, () => {});
  });
};
