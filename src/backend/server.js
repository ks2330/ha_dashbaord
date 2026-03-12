const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } // Allows your React app to connect
});

const DATA_FILE = path.join(__dirname, 'telemetry.json');

// Helper function to read and send telemetry data
function sendTelemetry(target = io) {
  try {
    const rawData = fs.readFileSync(DATA_FILE);
    const data = JSON.parse(rawData);
    target.emit('telemetry_update', data);
  } catch (err) {
    console.error('JSON Error:', err.message);
  }
}

// Handle new client connections - send initial data
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  sendTelemetry(socket); // Send current data to the new client
});

// 1. Watch the file for changes
fs.watchFile(DATA_FILE, (curr, prev) => {
  console.log('File changed! Sending update to UI...');
  sendTelemetry(); // Broadcast to all connected clients
});

server.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});