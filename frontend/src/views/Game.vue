<template>
  <div class="game">
    <button class="back" @click="router.push('/')">←</button>

    <div v-if="store.bunker" class="game-content">
      <h1>{{ store.bunker.scenario }}</h1>

    <div class="bunker-stats">
      <div class="stat"><span>Локація:</span> {{ store.bunker.location }}</div>
      <div class="stat"><span>Час перебування:</span> {{ store.bunker.duration }}</div>
      <div class="stat"><span>Місць:</span> {{ store.bunker.capacity }}</div>
    </div>

      <div class="players-grid">
        <gamePlayer 
          v-for="p in store.players" 
          :key="p.id"
          v-bind="p"
          :isMe="p.id === store.socket.id"
          :showVoteBtn="store.isVoting && p.id !== store.socket.id && !p.isExiled"
          @reveal="store.revealStat"
          @vote="store.voteFor"
        />
      </div>

      <div class="actions-bar">
        <template v-if="store.isHost">
          <button v-if="!store.isVoting" @click="store.isVoting = true" class="btn primary">
            Оголосити голосування
          </button>
          <div v-else class="host-controls">
            <button @click="store.isVoting = false" class="btn secondary">Скасувати</button>
            <button @click="store.finishVoting" class="btn danger">Вигнати гравця</button>
          </div>
        </template>

        <template v-else>
          <div v-if="store.isVoting" class="status-msg">
            Йде голосування... Оберіть ціль
          </div>
        </template>
      </div>
    </div>

    <div v-if="showWaitModal" class="modal-overlay">
      <div class="modal-card">
        <h2>Голос прийнято</h2>
        <p>Очікуємо, поки хост завершить раунд...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useGameStore } from '@/stores/store';
import gamePlayer from '@/components/gamePlayer.vue';

const router = useRouter();
const store = useGameStore();
const showWaitModal = ref(false);

watch(() => store.isVoting, (val) => {
  if (!val) showWaitModal.value = false;
});

const originalVote = store.voteFor;
store.voteFor = (id: string) => {
  originalVote(id);
  if (!store.isHost) showWaitModal.value = true;
};
</script>

<style scoped>
.game {
  position: relative;
  min-height: 100vh;
  width: 100%;
  font-family: 'Orbitron', sans-serif;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.game::before {
  content: '';
  position: fixed;
  inset: 0;
  background: url('@/assets/img/lobby.jpg') center/cover no-repeat;
  filter: blur(4px) brightness(0.4);
  z-index: -1;
}

.back {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 2;
  background: rgba(255,255,255,0.1);
  border: 2px solid rgba(255,255,255,0.6);
  border-radius: 8px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.25s;
}
.back:hover { transform: scale(1.1); }

.game-content {
  width: 100%;
  max-width: 1200px;
  text-align: center;
}

.game-content h1 {
  font-size: 32px;
  margin-bottom: 20px;
  letter-spacing: 2px;
}

.bunker-stats {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;
  opacity: 0.9;
  flex-wrap: wrap;
}

.players-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.actions-bar {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
}

.btn {
  border: none;
  border-radius: 12px;
  padding: 12px 28px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.25s;
}

.btn.primary {
  background: rgba(0,255,136,0.9);
  color: #000;
}
.btn.primary:hover { background: rgba(0,255,136,1); }

.btn.secondary {
  background: rgba(50,50,50,0.85);
  color: #fff;
}
.btn.secondary:hover { background: rgba(80,80,80,0.95); }

.btn.danger {
  background: rgba(255,68,68,0.9);
  color: #fff;
}
.btn.danger:hover { background: rgba(255,68,68,1); }

.status-msg {
  font-style: italic;
  color: #ffaa00;
  font-size: 0.9rem;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-card {
  background: rgba(255,255,255,0.05);
  border: 2px solid #00ff88;
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  backdrop-filter: blur(15px);
  color: #fff;
}

.stat {
  background: rgba(255, 255, 255, 0.05);
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
}

.stat span {
  color: #888;
  margin-right: 5px;
  font-size: 0.8rem;
  text-transform: uppercase;
}

.food-stat {
  border-color: #ffaa0077;
  color: #ffaa00;
}
</style>