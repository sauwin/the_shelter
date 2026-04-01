import { defineStore } from "pinia";
import { ref } from "vue";
import { io, type Socket } from "socket.io-client";
import type { Router } from "vue-router";
 
interface Player {
  id: string;
  name: string;
  isHost: boolean;
}
 
export const useGameStore = defineStore('game', () => {
  const socket: Socket = io('https://jw98wkq2-3000.euw.devtunnels.ms');
 
  const players = ref<Player[]>([]);
  const isHost = ref(false);
  const roomCode = ref('');
  const playerName = ref('');
  const error = ref('');
 
  // Router передається з компонента бо useRouter() не працює поза setup()
  let _router: Router | null = null;
  const setRouter = (router: Router) => { _router = router; };
 
  // Створити кімнату — код генерується на СЕРВЕРІ, не на клієнті
  const createRoom = (name: string) => {
    playerName.value = name;
    isHost.value = true;
    error.value = '';
    socket.emit('create-room', { name });
  };
 
  // Приєднатись до кімнати
  const joinRoom = (name: string, code: string) => {
    roomCode.value = code.toUpperCase().trim();
    playerName.value = name;
    isHost.value = false;
    error.value = '';
    socket.emit('join-room', { code: roomCode.value, name });
  };
 
  // Почати гру (тільки хост)
  const startGame = () => {
    socket.emit('start-game', roomCode.value);
  };
 
  // ── Socket listeners ──────────────────────────────────────
 
  // Сервер повертає згенерований код кімнати
  socket.on('room-created', (code: string) => {
    roomCode.value = code;
  });
 
  // Оновлення списку гравців у лобі
  socket.on('update-players', (list: Player[]) => {
    players.value = list;
  });
 
  // Кімната не знайдена або інша помилка
  socket.on('room-error', (msg: string) => {
    error.value = msg;
  });
 
  // Успішне приєднання — переходимо в лобі
  socket.on('joined-room', () => {
    _router?.push(`/host`);
  });
 
  // Хост стартував гру — всі йдуть на /lobby/:code
  socket.on('game-started', () => {
    _router?.push(`/lobby/${roomCode.value}`);
  });
 
  return {
    socket,
    players,
    isHost,
    roomCode,
    playerName,
    error,
    setRouter,
    createRoom,
    joinRoom,
    startGame,
  };
});