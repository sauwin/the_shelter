<template>
  <div class="page" :style="{ backgroundImage: `url(${bgImg})` }">
    <div class="bg-overlay" />

    <!-- Header -->
    <header class="game-header">
      <h1 class="header-title">The Shelter</h1>
      <div class="timer-wrap" :class="{ urgent: timeLeft <= 10 }">
        <span>⏳</span>
        <span class="timer-val">{{ timeLeft }}s</span>
      </div>
    </header>

    <div class="game-layout">

      <!-- TOP: Shelter info block -->
      <section class="shelter-info-block">
        <div class="shelter-col">
          <p class="block-label">The Shelter N{{ shelterNumber }}</p>
          <button
            v-for="item in shelterLeft"
            :key="item.key"
            class="info-btn"
            @click="revealedInfo[item.key] = !revealedInfo[item.key]"
          >
            {{ revealedInfo[item.key] ? item.value : item.label }}
          </button>
        </div>
        <div class="shelter-col">
          <p class="block-label">Information</p>
          <button
            v-for="item in shelterRight"
            :key="item.key"
            class="info-btn"
            @click="revealedInfo[item.key] = !revealedInfo[item.key]"
          >
            {{ revealedInfo[item.key] ? item.value : item.label }}
          </button>
        </div>
      </section>

      <!-- MIDDLE: Personal card + Actions -->
      <section class="personal-section">
        <div class="personal-card">
          <p class="block-label">Personal Information</p>
          <div class="traits-grid">
            <div v-for="t in myTraits" :key="t.key" class="trait-cell">
              <span class="trait-key">{{ t.key }}</span>
              <div
                class="trait-val-wrap"
                :class="{ revealed: revealedTraits[t.key] }"
                @click="revealedTraits[t.key] = !revealedTraits[t.key]"
              >
                <span class="trait-val">{{ revealedTraits[t.key] ? t.value : '—' }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="actions-card">
          <p class="block-label">Actions</p>
          <div class="action-btns">
            <button
              v-for="a in actions"
              :key="a.id"
              class="action-toggle"
              :class="{ active: a.used }"
              @click="a.used = !a.used"
            >
              <span class="toggle-dot" :class="{ on: a.used }" />
              {{ a.label }}
            </button>
          </div>
        </div>
      </section>

      <!-- BOTTOM: All players table -->
      <section class="all-players-section">
        <div class="players-table-wrap">
          <table class="players-table">
            <thead>
              <tr>
                <th v-for="col in tableCols" :key="col">{{ col }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(p, i) in players"
                :key="i"
                :class="{ eliminated: p.eliminated, 'my-row': p.name === myName }"
              >
                <td>{{ p.name }}</td>
                <td>{{ p.age }}</td>
                <td>{{ p.sex }}</td>
                <td>{{ p.health }}</td>
                <td>{{ p.mental }}</td>
                <td>{{ p.profession }}</td>
                <td>{{ p.trait }}</td>
                <td>{{ p.job }}</td>
                <td>{{ p.hobbies }}</td>
                <td>{{ p.equip }}</td>
                <td>{{ p.more }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- VOTE BUTTON -->
      <div class="vote-section">
        <button class="btn-vote" @click="showVoteModal = true">
          Start Vote to Kick
        </button>
      </div>
    </div>

    <!-- Vote modal -->
    <Teleport to="body">
      <div v-if="showVoteModal" class="modal-backdrop" @click.self="showVoteModal = false">
        <div class="modal">
          <h3 class="modal-title">Vote to Kick</h3>
          <p class="modal-sub">Select a player to nominate for elimination</p>
          <div class="vote-list">
            <button
              v-for="p in activePlayers"
              :key="p.name"
              class="vote-player-btn"
              :class="{ selected: selectedVote === p.name }"
              @click="selectedVote = p.name"
            >
              <span class="vp-avatar">{{ p.name[0].toUpperCase() }}</span>
              {{ p.name }}
            </button>
          </div>
          <div class="modal-actions">
            <button class="btn-ghost" @click="showVoteModal = false">Cancel</button>
            <button class="btn-vote-confirm" :disabled="!selectedVote" @click="confirmVote">
              Confirm Vote
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import bgImg from '../assets/img/lobby.jpg'

const route = useRoute()
const router = useRouter()

const timeLeft = ref(120)
const myName = ref('Alice')
const shelterNumber = ref(4)
const showVoteModal = ref(false)
const selectedVote = ref<string | null>(null)

const revealedInfo = ref<Record<string, boolean>>({})
const revealedTraits = ref<Record<string, boolean>>({})

const shelterLeft = ref([
  { key: 'location', label: 'Location', value: 'Underground bunker, Carpathians' },
  { key: 'rooms',    label: 'Rooms',            value: '8 rooms and a first-aid station' },
  { key: 'problems', label: 'Problems',            value: 'Water leak' },
])

const shelterRight = ref([
  { key: 'time',  label: 'Time', value: '2 years' },
  { key: 'food',  label: 'Food',  value: 'For 18 months' },
  { key: 'space', label: 'Space', value: '3 members' },
])

const myTraits = ref([
  { key: 'Age',       value: '34' },
  { key: 'Profession',value: 'Surgeon' },
  { key: 'Equipment', value: 'Med-kit' },
  { key: 'Sex',       value: 'Female' },
  { key: 'Trait',     value: 'Calm' },
  { key: 'More',      value: 'Multilingual' },
  { key: 'Health',    value: 'Asthma' },
  { key: 'Mental',    value: 'Stable' },
  { key: 'Job',       value: 'Doctor' },
  { key: 'Hobbies',   value: 'Hiking' },
])

const actions = ref([
  { id: 1, label: 'Reveal card', used: false },
  { id: 2, label: 'Use special', used: false },
  { id: 3, label: 'Block vote',  used: false },
])

const tableCols = ['Name','Age','Sex','Health','Mental','Profession','Trait','Job','Hobbies','Equip','More']

const players = ref([
  { name:'Alice',  age:'34', sex:'F', health:'Asthma',  mental:'Stable',   profession:'Surgeon',  trait:'Calm',     job:'Doctor',  hobbies:'Hiking',   equip:'Med-kit', more:'3 langs',  eliminated:false },
  { name:'Bohdan', age:'28', sex:'M', health:'Healthy', mental:'Anxious',  profession:'Engineer', trait:'Smart',    job:'Builder', hobbies:'Chess',    equip:'Toolkit', more:'Mechanic', eliminated:false },
  { name:'Lena',   age:'41', sex:'F', health:'Blind',   mental:'Strong',   profession:'Farmer',   trait:'Patient',  job:'Cook',    hobbies:'Gardening',equip:'Seeds',   more:'Navigator',eliminated:true  },
  { name:'Maks',   age:'35', sex:'M', health:'Healthy', mental:'Paranoid', profession:'Soldier',  trait:'Brave',    job:'Guard',   hobbies:'Running',  equip:'Rifle',   more:'Scout',    eliminated:false },
])

const activePlayers = computed(() => players.value.filter(p => !p.eliminated && p.name !== myName.value))

function confirmVote() {
  // TODO: send vote to server via WebSocket
  showVoteModal.value = false
  selectedVote.value = null
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

.page {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  font-family: 'Cinzel', serif;
  
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
}

.bg-overlay {
  position: absolute;
  inset: 0;
  background: rgba(5, 4, 2, 0.82);
  z-index: 1;
}

/* ─── HEADER ─── */
.game-header {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 28px;
  background: rgba(0,0,0,0.55);
  border-bottom: 1px solid rgba(200,170,100,0.15);
}

.header-title {
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #f0ddb0;
  margin: 0;
  text-shadow: 0 0 16px rgba(200,160,60,0.3);
}

.timer-wrap {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 1rem;
  color: #d4b882;
  font-weight: 700;
  letter-spacing: 0.06em;
  transition: color 0.3s;
}
.timer-wrap.urgent { color: #e05050; animation: blink 1s infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.4} }

/* ─── LAYOUT ─── */
.game-layout {
  position: relative;
  z-index: 2;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.block-label {
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #806040;
  margin: 0 0 8px;
  font-family: 'Crimson Text', serif;
}

/* ─── SHELTER INFO ─── */
.shelter-info-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  background: rgba(15,10,5,0.88);
  border: 1px solid rgba(200,170,100,0.18);
  border-radius: 12px;
  padding: 18px 20px;
}

.shelter-col {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-btn {
  font-family: 'Cinzel', serif;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  color: #c8a870;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(200,170,100,0.2);
  border-radius: 6px;
  padding: 10px 14px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
  text-transform: none;
}
.info-btn:hover { background: rgba(200,170,100,0.1); border-color: rgba(200,170,100,0.4); color: #e0c080; }

/* ─── PERSONAL + ACTIONS ─── */
.personal-section {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
}

.personal-card, .actions-card {
  background: rgba(15,10,5,0.88);
  border: 1px solid rgba(200,170,100,0.18);
  border-radius: 12px;
  padding: 16px 18px;
}

.traits-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

.trait-cell {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.trait-key {
  font-family: 'Crimson Text', serif;
  font-size: 0.64rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #584530;
}

.trait-val-wrap {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(200,170,100,0.15);
  border-radius: 5px;
  padding: 6px 8px;
  cursor: pointer;
  transition: all 0.2s;
  min-height: 28px;
  display: flex;
  align-items: center;
}
.trait-val-wrap:hover { border-color: rgba(200,170,100,0.4); background: rgba(200,170,100,0.08); }
.trait-val-wrap.revealed { border-color: rgba(200,170,100,0.35); background: rgba(0,0,0,0.3); }

.trait-val {
  font-family: 'Crimson Text', serif;
  font-size: 0.85rem;
  color: #d4b882;
}

.actions-card {
  min-width: 160px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.action-btns {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.action-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Crimson Text', serif;
  font-size: 0.85rem;
  color: #907060;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(200,170,100,0.15);
  border-radius: 20px;
  padding: 8px 14px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}
.action-toggle.active { color: #d4c090; border-color: rgba(200,170,100,0.4); background: rgba(200,170,100,0.08); }

.toggle-dot {
  width: 12px; height: 12px;
  border-radius: 50%;
  background: #302010;
  border: 1px solid rgba(200,170,100,0.3);
  flex-shrink: 0;
  transition: all 0.2s;
}
.toggle-dot.on { background: #c9a96e; box-shadow: 0 0 6px rgba(200,160,60,0.5); }

/* ─── PLAYERS TABLE ─── */
.all-players-section {
  background: rgba(15,10,5,0.88);
  border: 1px solid rgba(200,170,100,0.18);
  border-radius: 12px;
  padding: 14px 16px;
  overflow: hidden;
}

.players-table-wrap {
  overflow-x: auto;
}

.players-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Crimson Text', serif;
  font-size: 0.82rem;
}

.players-table th {
  font-family: 'Cinzel', serif;
  font-size: 0.58rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #605040;
  padding: 6px 8px;
  border-bottom: 1px solid rgba(200,170,100,0.12);
  text-align: left;
  white-space: nowrap;
}

.players-table td {
  padding: 7px 8px;
  color: #b09070;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  white-space: nowrap;
}

.players-table tr:last-child td { border-bottom: none; }

.players-table tr.my-row td {
  color: #e0c890;
  background: rgba(200,170,100,0.05);
}

.players-table tr.eliminated td {
  color: #443020;
  text-decoration: line-through;
  opacity: 0.5;
}

/* ─── VOTE ─── */
.vote-section {
  display: flex;
  justify-content: center;
  padding-top: 4px;
}

.btn-vote {
  font-family: 'Cinzel', serif;
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #f5ede0;
  background: linear-gradient(135deg, #b03030, #8a1a1a);
  border: none;
  border-radius: 50px;
  padding: 14px 48px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 20px rgba(160,20,20,0.4);
}
.btn-vote:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(160,20,20,0.5); }
.btn-vote:active { transform: translateY(0); }

/* ─── MODAL ─── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(3px);
}

.modal {
  background: linear-gradient(160deg, rgba(38,26,14,0.98), rgba(22,15,7,0.99));
  border: 1px solid rgba(200,170,100,0.25);
  border-radius: 14px;
  padding: 32px 36px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.8);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.modal-title {
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #f0ddb0;
  margin: 0;
}

.modal-sub {
  font-family: 'Crimson Text', serif;
  font-size: 0.9rem;
  font-style: italic;
  color: #706050;
  margin: -10px 0 0;
}

.vote-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.vote-player-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Crimson Text', serif;
  font-size: 1rem;
  color: #b09070;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(200,170,100,0.12);
  border-radius: 8px;
  padding: 10px 14px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}
.vote-player-btn:hover { border-color: rgba(180,60,40,0.4); background: rgba(180,40,20,0.08); }
.vote-player-btn.selected { border-color: rgba(200,60,40,0.6); background: rgba(200,50,30,0.14); color: #e09070; }

.vp-avatar {
  width: 30px; height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6a4010, #b07830);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Cinzel', serif;
  font-size: 0.8rem;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 4px;
}

.btn-ghost {
  font-family: 'Cinzel', serif;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #806040;
  background: none;
  border: 1px solid rgba(200,170,100,0.22);
  border-radius: 50px;
  padding: 11px 22px;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-ghost:hover { border-color: rgba(200,170,100,0.5); color: #c0a060; }

.btn-vote-confirm {
  font-family: 'Cinzel', serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #f5ede0;
  background: linear-gradient(135deg, #b03030, #8a1a1a);
  border: none;
  border-radius: 50px;
  padding: 11px 28px;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1;
}
.btn-vote-confirm:hover:not(:disabled) { box-shadow: 0 4px 16px rgba(160,20,20,0.5); }
.btn-vote-confirm:disabled { opacity: 0.35; cursor: not-allowed; }

@media (max-width: 640px) {
  .personal-section { grid-template-columns: 1fr; }
  .shelter-info-block { grid-template-columns: 1fr; }
  .traits-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>