<template>
  <div class="join">
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
.join {
  background-image: url('../assets/img/join.jpg');
  position: relative;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
}
</style>