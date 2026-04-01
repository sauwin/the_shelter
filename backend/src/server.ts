import express from 'express'
import http from 'http'
import { Server, Socket } from 'socket.io'
import cors from 'cors'

interface Player {
  id: string
  name: string
  isHost: boolean
}

interface Room {
  code: string
  players: Player[]
}

const rooms: Record<string, Room> = {}

// Генерація унікального коду на СЕРВЕРІ
const generateCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  do {
    code = Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  } while (rooms[code]) // гарантуємо унікальність
  return code
}

const app = express()
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, { 
  cors: { 
    origin: "https://jw98wkq2-5173.euw.devtunnels.ms",
    methods: ["GET", "POST"],
    credentials: true
  } 
})

io.on('connection', (socket: Socket) => {
  console.log(`[+] Connected: ${socket.id}`)

  // Хост створює кімнату
  socket.on('create-room', (data: { name: string }) => {
    const code = generateCode()

    rooms[code] = {
      code,
      players: [{ id: socket.id, name: data.name, isHost: true }]
    }

    socket.join(code)

    // Повертаємо код хосту
    socket.emit('room-created', code)
    // Оновлюємо список гравців у кімнаті
    io.to(code).emit('update-players', rooms[code].players)

    console.log(`[Room] Created: ${code} by ${data.name}`)
  })

  // Гравець приєднується до кімнати
  socket.on('join-room', (data: { code: string; name: string }) => {
    const room = rooms[data.code]

    if (!room) {
      socket.emit('room-error', `Room "${data.code}" not found`)
      return
    }

    room.players.push({ id: socket.id, name: data.name, isHost: false })
    socket.join(data.code)

    // Говоримо гравцю що він успішно приєднався (для навігації)
    socket.emit('joined-room', data.code)
    // Оновлюємо список у всій кімнаті
    io.to(data.code).emit('update-players', room.players)

    console.log(`[Room] ${data.name} joined ${data.code}`)
  })

  // Хост стартує гру
  socket.on('start-game', (code: string) => {
    const room = rooms[code]
    if (!room) return

    io.to(code).emit('game-started')
    console.log(`[Room] Game started: ${code}`)
  })

  // Гравець відключився
  socket.on('disconnecting', () => {
    for (const roomCode of socket.rooms) {
      const room = rooms[roomCode]
      if (!room) continue

      room.players = room.players.filter(p => p.id !== socket.id)

      // Якщо хост пішов — передаємо хост наступному гравцю
      if (room.players.length > 0 && !room.players.some(p => p.isHost)) {
        room.players[0]!.isHost = true
      }

      // Якщо кімната порожня — видаляємо
      if (room.players.length === 0) {
        delete rooms[roomCode]
        console.log(`[Room] Deleted empty room: ${roomCode}`)
      } else {
        io.to(roomCode).emit('update-players', room.players)
      }
    }

    console.log(`[-] Disconnected: ${socket.id}`)
  })
})

server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000')
})