<template>
  <div class="page" :style="{ backgroundImage: `url(${bgImg})` }">
    <div class="bg-overlay" />

    <div class="panel">
      <button class="back-btn" @click="router.push('/')">← Back</button>

      <h2 class="panel-title">Host Lobby</h2>

      <div class="code-section">
        <p class="label">Share this code with players</p>
        <div class="code-box">
          <span class="code-text">{{ lobbyCode }}</span>
          <button class="copy-btn" @click="copyCode" :class="{ copied }">
            {{ copied ? '✓' : 'Copy' }}
          </button>
        </div>
      </div>

      <div class="players-section">
        <p class="label">Players joined ({{ players.length }} / {{ maxPlayers }})</p>
        <div class="players-list">
          <div
            v-for="(p, i) in players"
            :key="i"
            class="player-item"
            :style="{ animationDelay: `${i * 0.08}s` }"
          >
            <span class="player-avatar">{{ p.name[0].toUpperCase() }}</span>
            <span class="player-name">{{ p.name }}</span>
            <span class="player-status">Ready</span>
          </div>
          <div v-for="i in emptySlots" :key="'e' + i" class="player-item empty">
            <span class="player-avatar ghost">?</span>
            <span class="player-name muted">Waiting...</span>
          </div>
        </div>
      </div>

      <button class="btn-main" :disabled="players.length < 2" @click="startGame">
        {{ players.length < 2 ? `Need ${2 - players.length} more player(s)` : 'Start Game' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import bgImg from '../assets/img/host.jpg'

const router = useRouter()
const copied = ref(false)
const maxPlayers = 6

const lobbyCode = ref('BNK-' + Math.random().toString(36).substring(2, 6).toUpperCase())

// TODO: replace with real WebSocket state
const players = ref([
  { name: 'Alice' },
  { name: 'Bohdan' },
])

const emptySlots = computed(() => Math.max(0, 2 - players.value.length))

function copyCode() {
  navigator.clipboard.writeText(lobbyCode.value)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}

function startGame() {
  router.push(`/lobby/${lobbyCode.value}`)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

.page {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Cinzel', serif;
  
  background-size: cover;
  background-position: center;
  padding: 20px;
  box-sizing: border-box;
}

.bg-overlay {
  position: absolute;
  inset: 0;
  background: rgba(8, 6, 3, 0.70);
  z-index: 1;
}

.panel {
  position: relative;
  z-index: 2;
  background: linear-gradient(160deg, rgba(36,26,14,0.97), rgba(22,16,8,0.99));
  border: 1px solid rgba(200,170,100,0.22);
  border-radius: 16px;
  padding: 40px 44px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.75), inset 0 1px 0 rgba(200,170,100,0.12);
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.back-btn {
  background: none;
  border: none;
  color: #907050;
  font-family: 'Crimson Text', serif;
  font-size: 1rem;
  cursor: pointer;
  padding: 0;
  width: fit-content;
  letter-spacing: 0.05em;
  transition: color 0.2s;
}
.back-btn:hover { color: #d4b882; }

.panel-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #f0ddb0;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin: 0;
  text-shadow: 0 0 24px rgba(200,160,80,0.3);
}

.label {
  font-family: 'Crimson Text', serif;
  font-size: 0.82rem;
  color: #807050;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 0 0 10px;
}

.code-section { display: flex; flex-direction: column; }

.code-box {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(0,0,0,0.45);
  border: 1px solid rgba(200,170,100,0.28);
  border-radius: 10px;
  padding: 14px 18px;
}

.code-text {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: #e8cc90;
  text-shadow: 0 0 16px rgba(220,180,80,0.4);
  flex: 1;
}

.copy-btn {
  font-family: 'Cinzel', serif;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #2a1f10;
  background: linear-gradient(135deg, #d4b882, #c9a96e);
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.copy-btn:hover { background: linear-gradient(135deg, #e0c890, #d4b882); }
.copy-btn.copied { background: linear-gradient(135deg, #6a9a5a, #5a8a4a); color: #fff; }

.players-section { display: flex; flex-direction: column; }

.players-list { display: flex; flex-direction: column; gap: 8px; }

.player-item {
  display: flex;
  align-items: center;
  gap: 14px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(200,170,100,0.1);
  border-radius: 8px;
  padding: 10px 14px;
  animation: fadeIn 0.3s ease both;
}
.player-item.empty { opacity: 0.3; border-style: dashed; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateX(-8px); }
  to { opacity: 1; transform: translateX(0); }
}

.player-avatar {
  width: 34px; height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7a5a20, #c9a96e);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.9rem; font-weight: 700; color: #fff;
  flex-shrink: 0;
}
.player-avatar.ghost { background: rgba(255,255,255,0.08); color: #555; }

.player-name { font-family: 'Crimson Text', serif; font-size: 1.05rem; color: #d4c0a0; flex: 1; }
.player-name.muted { color: #484030; font-style: italic; }

.player-status { font-family: 'Crimson Text', serif; font-size: 0.78rem; color: #6a9a5a; letter-spacing: 0.05em; }

.btn-main {
  font-family: 'Cinzel', serif;
  font-size: 0.92rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #2a1f10;
  background: linear-gradient(135deg, #e8d5b0, #d4b882, #c9a96e);
  border: none;
  border-radius: 50px;
  padding: 15px 40px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  width: 100%;
}
.btn-main:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.6); }
.btn-main:disabled { opacity: 0.35; cursor: not-allowed; background: linear-gradient(135deg, #555, #444); color: #888; }
</style>