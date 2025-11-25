import { Server } from 'socket.io';
import { Hocuspocus } from '@hocuspocus/server';
import { TiptapTransformer } from '@hocuspocus/transformer';

// Initialize Hocuspocus server for collaborative editing
const hocuspocus = new Hocuspocus({
  port: 1234,
  async onAuthenticate(data) {
    // Add authentication logic here if needed
    return { user: data.token };
  },
  async onConnect() {
    console.log('New client connected to Hocuspocus');
  },
  onDisconnect() {
    console.log('Client disconnected from Hocuspocus');
  },
  // Enable debugging
  debounce: 0,
  quiet: false,
});

// Initialize Socket.IO server
const initSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    // Handle document editing
    socket.on('document:edit', (data) => {
      // Broadcast changes to all connected clients except the sender
      socket.broadcast.emit('document:update', data);
    });

    // Handle cursor position updates
    socket.on('cursor:move', (data) => {
      socket.broadcast.emit('cursor:update', {
        ...data,
        userId: socket.id
      });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
      // Notify other clients that this user has left
      socket.broadcast.emit('user:left', { userId: socket.id });
    });
  });

  return io;
};

export { initSocketServer, hocuspocus };
