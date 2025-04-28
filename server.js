// server.js

const WebSocket = require("ws");

// Membuat server WebSocket pada port 8080
const wss = new WebSocket.Server({ port: 8080 });

// Array untuk menyimpan semua client yang terhubung
let clients = [];

wss.on("connection", (ws) => {
  console.log("Client connected.");

  // Tambahkan client ke array clients
  clients.push(ws);

  // Kirim pesan selamat datang ke client setelah koneksi berhasil
  ws.send("Welcome to the WebSocket Chat! You are now connected.");

  // Menerima pesan dari client
  ws.on("message", (message) => {
    console.log("Pesan diterima dari client: " + message);

    // Kirim pesan yang diterima ke semua client yang terhubung
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message); // Mengirim pesan ke semua client kecuali pengirim pesan
      }
    });
  });

  // Menangani koneksi yang ditutup
  ws.on("close", () => {
    console.log("Client disconnected.");
    // Hapus client yang terputus dari array
    clients = clients.filter((client) => client !== ws);
  });
});

console.log("WebSocket server is running at ws://localhost:8080");
