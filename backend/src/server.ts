import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gameData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../datas/perks.json'), 'utf8')
);
const bunkerData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../datas/scenarios.json'), 'utf8')
);

interface Player {
  id: string;
  name: string;
  isHost: boolean;
  character?: any;
  isExiled: boolean;
  votes: number;
}

interface Room {
  code: string;
  players: Player[];
  status: 'lobby' | 'playing';
  bunker?: any;
}

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { 
    origin: "http://localhost:5173",
    // origin: "https://jw98wkq2-5173.euw.devtunnels.ms",
    methods: ["GET", "POST"] }
});

const rooms: Record<string, Room> = {};
const getRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

io.on('connection', (socket: Socket) => {
  console.log(`[+] Connected: ${socket.id}`);

  socket.on('create-room', ({ name }) => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    rooms[code] = {
      code,
      status: 'lobby',
      players: [{ id: socket.id, name, isHost: true, isExiled: false, votes: 0 }]
    };
    socket.join(code);
    socket.emit('room-created', code);
    io.to(code).emit('update-players', rooms[code].players);
  });

  socket.on('join-room', ({ code, name }) => {
    const room = rooms[code];
    if (room && room.status === 'lobby') {
      room.players.push({ id: socket.id, name, isHost: false, isExiled: false, votes: 0 });
      socket.join(code);
      socket.emit('joined-room', code);
      io.to(code).emit('update-players', room.players);
    } else {
      socket.emit('room-error', 'Кімнату не знайдено або гра вже триває');
    }
  });

  socket.on('start-game', (code) => {
    const room = rooms[code];
    if (!room) return;

    room.status = 'playing';
    
    room.bunker = {
      scenario: getRandom(bunkerData.scenarios),
      location: getRandom(bunkerData.locations),
      duration: getRandom(bunkerData.duration),
      capacity: bunkerData.capacity,
    };

    room.players.forEach(p => {
      p.character = {};
      Object.keys(gameData).forEach(key => {
        p.character[key] = { 
          val: getRandom(gameData[key]), 
          open: false 
        };
      });
    });

    io.to(code).emit('game-started', { bunker: room.bunker, players: room.players });
  });

  socket.on('reveal-stat', ({ code, statKey }) => {
    const room = rooms[code];
    if (!room) return;
    const player = room.players.find(p => p.id === socket.id);
    if (player && player.character && player.character[statKey]) {
      player.character[statKey].open = true;
      io.to(code).emit('update-players', room.players);
    }
  });

  socket.on('cast-vote', ({ code, targetId }) => {
    const room = rooms[code];
    if (!room) return;
    const target = room.players.find(p => p.id === targetId);
    if (target) {
      target.votes++;
      io.to(code).emit('update-players', room.players);
    }
  });

  socket.on('finish-voting', (code) => {
    const room = rooms[code];
    if (!room) return;

    const sorted = [...room.players].sort((a, b) => b.votes - a.votes);
    const topTarget = sorted[0];

    if (topTarget && topTarget.votes > 0) {
      const victim = room.players.find(p => p.id === topTarget.id);
      
      if (victim) {
        victim.isExiled = true;
      }
    }

    room.players.forEach(p => {
      p.votes = 0;
    });

    io.to(code).emit('update-players', room.players);
  });
});

server.listen(3000, () => console.log('Server on http://localhost:3000'));