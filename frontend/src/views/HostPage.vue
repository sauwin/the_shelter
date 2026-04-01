<template>
  <div class="host">
    <div class="panel">
      <button class="back" @click="router.push('/')">
        <img src="@/assets/icons/arrow-left.svg" />
      </button>

      <div>
        <h1>The shelter lobby</h1>
      </div>

      <div>
        <div class="code" @click="copyCode()" title="Click to copy">
          {{ store.roomCode || '······' }}
        </div>
        <div v-if="copied" class="copy-status">✓ Copied</div>
      </div>

      <br><br>

      <div class="players">
        <hostPlayer 
          v-for="player in store.players" 
          :key="player.id"
          :name="player.name"
        />
        <div v-if="store.players.length === 0" class="empty-hint">
          Waiting for players...
        </div>
      </div>

      <br>

      <div v-if="store.isHost">
        <button 
          :disabled="store.players.length < 2" 
          @click="store.startGame()"
        >
          {{ store.players.length < 2 ? `Need ${2 - store.players.length} more` : 'Enter the lobby' }}
        </button>
      </div>
      
      <div v-else class="waiting-msg">
        Waiting for host to start the game...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import hostPlayer from '../components/hostPlayer.vue';
import { useGameStore } from '../stores/store';

const router = useRouter();
const store = useGameStore();
const copied = ref(false);

store.setRouter(router);

onMounted(() => {
  if (store.isHost && !store.roomCode) {
    store.createRoom(store.playerName || 'Host');
  }
});

const copyCode = () => {
  if (!store.roomCode) return;
  navigator.clipboard.writeText(store.roomCode);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
};
</script>

<style scoped>
.host {
  overflow: hidden;
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.host::before {
  content: "";
  position: absolute;
  inset: 0;
  filter: blur(4px) brightness(0.4);
  background-image: url('../assets/img/host.jpg');
  background-position: center;
  background-size: cover;
  z-index: 0;
  transform: scale(1.05);
}

.panel {
  z-index: 1;
  position: relative;
  width: 520px;
  height: 650px;
  border-radius: 16px;
  display: flex;
  background: rgba(255, 255, 255, 0.266);
  backdrop-filter: blur(15px);
  box-shadow: 0 0 30px rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.2);
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  font-family: 'Orbitron', sans-serif;
}

.panel h1 {
  font-size: 25px;
  width: 100%;
  letter-spacing: 14px;
  color: #ffffff;
  text-transform: uppercase;
  padding-bottom: 70px;
}

.panel button:not(.back) {
  width: 100%;
  height: 50px;
  border-radius: 12px;
  border: 2px solid rgba(255,255,255,0.6);
  background: rgba(255,255,255,0.1);
  color: white;
  font-size: 18px;
  letter-spacing: 3px;
  cursor: pointer;
  backdrop-filter: blur(5px);
  padding-left: 15px;
  padding-right: 15px;
  transition: 0.25s;
}

.panel button:not(.back):hover:not(:disabled) {
  background: white;
  color: black;
  transform: scale(1.05); /* Твій скейл */
}

.panel button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.back {
  position: absolute;
  top: 15px;
  left: 15px;
  width: 40px;
  height: 40px;
  border: 2px solid rgba(255,255,255,0.6);
  border-radius: 8px;
  cursor: pointer;
  background: rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.25s ease;
}

.back:hover {
  transform: scale(1.1); /* Тільки скейл */
}

.back img {
  width: 18px;
  filter: invert(1);
}

.code {
  display: inline-block;
  padding: 12px 30px;
  border-radius: 14px;
  border: 2px solid rgba(255,255,255,0.6);
  background: rgba(0,0,0,0.3);
  backdrop-filter: blur(8px);
  font-size: 30px;
  letter-spacing: 8px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  transition: 0.25s ease;
}

.code:hover {
  transform: scale(1.03); /* Легкий скейл для коду */
}

.players {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.copy-status {
  font-size: 14px;
  color: #ffffff;
  margin-top: 8px;
  opacity: 0.7;
}

.empty-hint, .waiting-msg {
  font-size: 14px;
  opacity: 0.6;
}
</style>