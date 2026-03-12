import './App.css';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:4000');


function App() {
  const [telemetry, setTelemetry] = useState({ id: '-', val: 0, status: 'Offline' });

  useEffect(() => {
    socket.on('telemetry_update', (data) => {
      setTelemetry(data); // This triggers the UI to re-render
    });
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>STM32 Dashboard</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Device ID</th>
            <th>Temp</th>
            <th>Humidity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{telemetry.id}</td>
            <td>{telemetry.val}</td>
            <td>{telemetry.val1}</td>
            <td>{telemetry.status}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;