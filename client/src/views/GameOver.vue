<template>
  <div class="page" :style="{ backgroundImage: `url(${bgImg})` }">
    <div class="bg-overlay" />

    <div class="analysis-panel">
      <h1 class="panel-title">Survival Analysis</h1>

      <div class="questions-list">
        <div
          v-for="(q, i) in questions"
          :key="i"
          class="question-item"
          :style="{ animationDelay: `${i * 0.04}s` }"
        >
          <label class="q-label">Question:</label>
          <input
            v-model="q.answer"
            class="q-input"
            type="text"
            :placeholder="q.placeholder"
          />
        </div>
      </div>

      <button class="btn-check" @click="checkAnswers">Check</button>

      <!-- Result after check -->
      <div v-if="showResult" class="result-block" :class="survived ? 'win' : 'lose'">
        <span class="result-icon">{{ survived ? '🛡️' : '☠️' }}</span>
        <div class="result-text">
          <h2 class="result-title">{{ survived ? 'The Shelter Holds' : 'The Bunker Falls' }}</h2>
          <p class="result-sub">
            {{ survived
              ? `${survivors} of ${total} survivors. Humanity endures.`
              : `All ${total} players were eliminated.` }}
          </p>
        </div>
      </div>

      <div v-if="showResult" class="action-row">
        <button class="btn-play-again" @click="router.push('/host')">Play Again</button>
        <button class="btn-ghost" @click="router.push('/')">Main Menu</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import bgImg from '../assets/img/gameover.jpg'

const router = useRouter()
const showResult = ref(false)
const survived = ref(false)
const survivors = ref(0)
const total = ref(4)

// TODO: populate questions from server-side game state
const questions = ref(
  Array.from({ length: 16 }, (_, i) => ({
    placeholder: `Answer ${i + 1}...`,
    answer: '',
  }))
)

function checkAnswers() {
  // TODO: validate answers with server
  const filled = questions.value.filter(q => q.answer.trim()).length
  survivors.value = Math.round((filled / questions.value.length) * total.value)
  survived.value = survivors.value > 0
  showResult.value = true
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

.page {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-family: 'Cinzel', serif;
  
  background-size: cover;
  background-position: center top;
  padding: 32px 20px 48px;
  box-sizing: border-box;
}

.bg-overlay {
  position: absolute;
  inset: 0;
  /* Light warm overlay — matches the Figma beige/golden tone */
  background: linear-gradient(
    to bottom,
    rgba(200,160,80,0.45) 0%,
    rgba(160,110,40,0.55) 40%,
    rgba(80,50,20,0.65) 100%
  );
  z-index: 1;
}

.analysis-panel {
  position: relative;
  z-index: 2;
  background: rgba(240,225,190,0.92);
  border: 1px solid rgba(160,120,60,0.4);
  border-radius: 14px;
  padding: 36px 40px 40px;
  width: 100%;
  max-width: 520px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.panel-title {
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #2a1a08;
  text-align: center;
  margin: 0;
  text-shadow: 0 1px 4px rgba(0,0,0,0.15);
}

.questions-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 56vh;
  overflow-y: auto;
  padding-right: 4px;
}

/* custom scrollbar */
.questions-list::-webkit-scrollbar { width: 4px; }
.questions-list::-webkit-scrollbar-track { background: rgba(0,0,0,0.05); border-radius: 2px; }
.questions-list::-webkit-scrollbar-thumb { background: rgba(160,120,60,0.4); border-radius: 2px; }

.question-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  animation: fadeIn 0.3s ease both;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.q-label {
  font-family: 'Crimson Text', serif;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #6a4a20;
}

.q-input {
  font-family: 'Crimson Text', serif;
  font-size: 0.95rem;
  color: #1a1008;
  background: rgba(255,255,255,0.65);
  border: none;
  border-bottom: 2px solid rgba(160,120,60,0.4);
  border-radius: 0;
  padding: 7px 6px;
  outline: none;
  transition: border-color 0.2s;
}
.q-input::placeholder { color: #b09060; }
.q-input:focus { border-bottom-color: rgba(120,80,20,0.8); background: rgba(255,255,255,0.8); }

.btn-check {
  font-family: 'Cinzel', serif;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #f5ede0;
  background: linear-gradient(135deg, #b03030, #8a1a1a);
  border: none;
  border-radius: 50px;
  padding: 15px 40px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 20px rgba(140,20,20,0.4);
  width: 100%;
  margin-top: 4px;
}
.btn-check:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(140,20,20,0.5); }
.btn-check:active { transform: translateY(0); }

/* ─── RESULT ─── */
.result-block {
  display: flex;
  align-items: center;
  gap: 18px;
  border-radius: 10px;
  padding: 18px 20px;
  animation: fadeIn 0.5s ease both;
}
.result-block.win { background: rgba(80,160,60,0.15); border: 1px solid rgba(80,160,60,0.35); }
.result-block.lose { background: rgba(180,30,30,0.12); border: 1px solid rgba(180,30,30,0.3); }

.result-icon { font-size: 2.2rem; flex-shrink: 0; }

.result-text { display: flex; flex-direction: column; gap: 4px; }

.result-title {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #1a1008;
  margin: 0;
}

.result-sub {
  font-family: 'Crimson Text', serif;
  font-size: 0.9rem;
  font-style: italic;
  color: #5a3a18;
  margin: 0;
}

.action-row {
  display: flex;
  gap: 12px;
}

.btn-play-again {
  font-family: 'Cinzel', serif;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #2a1f10;
  background: linear-gradient(135deg, #e8d5b0, #d4b882, #c9a96e);
  border: none;
  border-radius: 50px;
  padding: 12px 28px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 3px 12px rgba(0,0,0,0.25);
  flex: 1;
}
.btn-play-again:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.3); }

.btn-ghost {
  font-family: 'Cinzel', serif;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #7a5a30;
  background: none;
  border: 1px solid rgba(160,120,60,0.4);
  border-radius: 50px;
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-ghost:hover { border-color: rgba(160,120,60,0.7); color: #5a3a10; }
</style>