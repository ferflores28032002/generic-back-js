import { USER_EVENTS } from "../../../constants/index.js";

export default function userSocket(socket, io) {
  socket.on(USER_EVENTS.JOIN, (user) => {
    socket.emit(USER_EVENTS.WELCOME, `Hola ${user.username}!`);
  });

  socket.on(USER_EVENTS.RECEIVE_MESSAGE, ({ toSocketId, message }) => {
    io.to(toSocketId).emit(USER_EVENTS.RECEIVE_MESSAGE, {
      from: socket.id,
      message,
    });
  });
}
