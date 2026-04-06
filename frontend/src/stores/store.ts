import { defineStore } from "pinia";
import { ref } from "vue";
import { io, type Socket } from "socket.io-client";
import type { Router } from "vue-router";

const socket: Socket = io('http://localhost:3000');
// const socket: Socket = io('https://jw98wkq2-3000.euw.devtunnels.ms');

export const useGameStore = defineStore('game', () => {
  const players = ref<any[]>([]);
  const bunker = ref<any>(null);
  const isVoting = ref(false);
  const isHost = ref(false);
  const roomCode = ref('');
  const playerName = ref('');
  const error = ref('');
  let _router: Router | null = null;

  const setRouter = (router: Router) => { _router = router; };

  const createRoom = (name: string) => {
    playerName.value = name;
    isHost.value = true;
    socket.emit('create-room', { name });
  };

  const joinRoom = (name: string, code: string) => {
    roomCode.value = code.toUpperCase().trim();
    playerName.value = name;
    isHost.value = false;
    socket.emit('join-room', { code: roomCode.value, name });
  };

  const startGame = () => {
    socket.emit('start-game', roomCode.value);
  };

  const revealStat = (statKey: string) => {
    socket.emit('reveal-stat', { code: roomCode.value, statKey });
  };

  const voteFor = (targetId: string) => {
    socket.emit('cast-vote', { code: roomCode.value, targetId });
    isVoting.value = false;
  };

  const finishVoting = () => {
    socket.emit('finish-voting', roomCode.value);
  };

  socket.on('room-created', (code: string) => { roomCode.value = code; });
  socket.on('joined-room', () => { _router?.push(`/host`); });
  socket.on('update-players', (list: any[]) => { players.value = list; });
  socket.on('room-error', (msg: string) => { error.value = msg; });
  
  socket.on('game-started', (data) => {
    if (data) {
      bunker.value = data.bunker;
      players.value = data.players;
      _router?.push(`/game/${roomCode.value}`);
    }
  });

  return {
    socket, players, bunker, isVoting, isHost, roomCode, playerName, error,
    setRouter, createRoom, joinRoom, startGame, revealStat, voteFor, finishVoting
  };
});