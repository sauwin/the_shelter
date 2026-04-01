<template>
  <div class="join">
    <div class="panel">
      <button class="back" @click="router.push('/')">
        <img src="@/assets/icons/arrow-left.svg" />
      </button>

      <h1>Join to game</h1>

      <label>Enter your name</label>
      <input 
        type="text" 
        placeholder="John Pork" 
        v-model="nameInput" 
        maxlength="20"
        @keyup.enter="join"
      />

      <label>Enter code from shelter</label>
      <input 
        type="text" 
        placeholder="BNK4252" 
        v-model="codeInput" 
        maxlength="6"
        @input="codeInput = codeInput.toUpperCase()"
        @keyup.enter="join"
      />

      <p v-if="store.error" class="error-msg">{{ store.error }}</p>

      <button @click="join" :disabled="!canJoin">Enter the lobby</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGameStore } from '../stores/store';

const router = useRouter();
const store = useGameStore();

// Ініціалізація роутера в сторі для автоматичного переходу
store.setRouter(router);

const nameInput = ref('');
const codeInput = ref('');

// Валідація від Клауда
const canJoin = computed(() =>
  nameInput.value.trim().length >= 2 && codeInput.value.trim().length === 6
);

const join = () => {
  if (!canJoin.value) return;
  store.error = ''; // скидаємо попередню помилку
  store.joinRoom(nameInput.value.trim(), codeInput.value.trim());
  // Навігація відбудеться автоматично через стор після успішного входу
}
</script>

<style scoped>
.join {
  overflow: hidden;
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.join::before {
  content: "";
  position: absolute;
  inset: 0;
  filter: blur(4px) brightness(0.4);
  background-image: url('../assets/img/join.jpg');
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
  gap: 15px;
  justify-content: center;
  align-items: center;
  color: white;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  font-family: 'Orbitron', sans-serif;
  padding: 0 40px; /* Додав падінги, щоб інпути не липли до країв */
}

.panel h1 {
  font-size: 34px;
  letter-spacing: 14px;
  color: #ffffff;
  text-transform: uppercase;
  padding-bottom: 40px; /* Трохи зменшив, щоб влізла помилка, якщо буде */
  text-align: center;
}

.panel label {
  width: 100%;
  text-align: left;
  font-size: 12px;
  letter-spacing: 2px;
  opacity: 0.8;
  margin-bottom: -10px;
}

.panel input {
  width: 100%;
  height: 50px;
  border-radius: 12px;
  border: 2px solid rgba(255,255,255,0.6);
  background: rgba(255,255,255,0.1);
  color: white;
  font-size: 18px;
  letter-spacing: 3px;
  backdrop-filter: blur(5px);
  transition: 0.25s ease;
  padding: 0 15px;
  outline: none;
}

.panel input:focus, .panel input:hover {
  background: white;
  color: black;
  transform: scale(1.03); /* Зробив 1.03 замість 1.08, щоб було акуратніше */
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
  transition: 0.25s ease;
  margin-top: 10px;
}

.panel button:not(.back):hover:not(:disabled) {
  background: white;
  color: black;
  transform: scale(1.05);
}

.panel button:disabled {
  opacity: 0.4;
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
  transform: scale(1.1);
}

.back img {
  width: 18px;
  filter: invert(1);
}

.error-msg {
  color: #ff6b6b;
  font-size: 13px;
  background: rgba(255, 0, 0, 0.15);
  padding: 8px 15px;
  border-radius: 8px;
  width: 100%;
  text-align: center;
  letter-spacing: 1px;
}
</style>