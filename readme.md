# 🧪 Prueba de Socket.IO – Envío de mensajes privados por Socket ID

Este proyecto permite enviar mensajes privados entre clientes conectados mediante `Socket.IO` usando eventos personalizados.

---

## 🚀 Eventos soportados

### `user:join` ✅
- Identifica a un usuario cuando se conecta.
- Retorna un mensaje de bienvenida.

### `user:sendMessage` ✅
- Permite enviar un mensaje a otro usuario usando su `socket.id`.

### `user:receiveMessage` ✅
- El evento que recibe el cliente objetivo con el mensaje y el `socket.id` del emisor.

---

## 🧪 Cómo probarlo con [🎯 Socket.IO Playground Online](https://electron-socket-io-playground.vercel.app/online-playground)

> Este playground permite simular múltiples clientes desde el navegador sin necesidad de crear frontend.

---

### 🧍‍♀️ Cliente A (simulador)

1. Abre una pestaña en [este playground](https://electron-socket-io-playground.vercel.app/online-playground)
2. Conéctate a: `http://localhost:3000`
3. Envía el evento:

**Event name:** `user:join`  
**Format:** OBJECT  
**Payload:**
```json
{
  "username": "UFU-107"
}

```

### 🧍‍♂️ Cliente B – Enviar mensaje privado (`user:sendMessage`)

1. Abre otra pestaña en [este playground](https://electron-socket-io-playground.vercel.app/online-playground)
2. Conéctate a: `http://localhost:3000`
3. Envía el siguiente evento:

**Event name:** `user:sendMessage`  
**Format:** OBJECT  
**Payload:**

```json
{
  "toSocketId": "<pega_el_socket_id_de_cliente_A>",
  "message": "¡Hola UFU-107, soy Cliente B!"
}
