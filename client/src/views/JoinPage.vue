<template>
  <div class="page" :style="{ backgroundImage: `url(${bgImg})` }">
    <div class="bg-overlay" />

    <div class="panel">
      <button class="back-btn" @click="router.push('/')">← Back</button>

      <h2 class="panel-title">Join Shelter</h2>
      <p class="subtitle">Enter the lobby code and your name to join the survivors.</p>

      <div class="form-group">
        <label class="field-label">Lobby Code</label>
        <input
          v-model="code"
          class="field-input code-input"
          type="text"
          placeholder="BNK-XXXX"
          maxlength="8"
          @input="code = (code as string).toUpperCase()"
          spellcheck="false"
          autocomplete="off"
        />
      </div>

      <div class="form-group">
        <label class="field-label">Your Name</label>
        <input
          v-model="name"
          class="field-input"
          type="text"
          placeholder="Survivor..."
          maxlength="20"
          @keyup.enter="joinGame"
        />
      </div>

      <p v-if="error" class="error-msg">{{ error }}</p>

      <button class="btn-main" @click="joinGame" :disabled="!canJoin">
        Enter the Bunker
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import bgImg from '../assets/img/join.jpg'

const router = useRouter()
const code = ref('')
const name = ref('')
const error = ref('')

const canJoin = computed(() => code.value.length >= 4 && name.value.trim().length >= 2)

function joinGame() {
  if (!canJoin.value) return
  error.value = ''
  // TODO: validate code via WebSocket
  router.push(`/lobby/${code.value.trim()}`)
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
  max-width: 440px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.75), inset 0 1px 0 rgba(200,170,100,0.12);
  display: flex;
  flex-direction: column;
  gap: 22px;
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

.subtitle {
  font-family: 'Crimson Text', serif;
  font-size: 1rem;
  font-style: italic;
  color: #705a3a;
  margin: -10px 0 0;
  line-height: 1.5;
}

.form-group { display: flex; flex-direction: column; gap: 8px; }

.field-label {
  font-family: 'Crimson Text', serif;
  font-size: 0.8rem;
  color: #807050;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.field-input {
  font-family: 'Crimson Text', serif;
  font-size: 1.1rem;
  color: #e0cba8;
  background: rgba(0,0,0,0.42);
  border: 1px solid rgba(200,170,100,0.22);
  border-radius: 8px;
  padding: 13px 16px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  letter-spacing: 0.04em;
}
.field-input::placeholder { color: #40301a; }
.field-input:focus {
  border-color: rgba(200,170,100,0.55);
  box-shadow: 0 0 0 3px rgba(200,160,80,0.1);
}

.code-input {
  font-family: 'Cinzel', serif;
  font-size: 1.5rem;
  letter-spacing: 0.3em;
  text-align: center;
  color: #e8cc90;
}

.error-msg {
  font-family: 'Crimson Text', serif;
  font-size: 0.88rem;
  color: #c04040;
  background: rgba(200,0,0,0.09);
  border: 1px solid rgba(200,0,0,0.2);
  border-radius: 6px;
  padding: 8px 12px;
  margin: 0;
}

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
  margin-top: 4px;
}
.btn-main:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.6); }
.btn-main:disabled { opacity: 0.32; cursor: not-allowed; background: linear-gradient(135deg, #555, #444); color: #888; }
</style>