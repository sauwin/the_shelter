<template>
<div class="host">
  <div class="panel">
    <button class="back" @click="goHome()">
      <img src="@/assets/icons/arrow-left.svg" />
    </button>
    <div>
      <h1>The shelter lobby</h1>
    </div>
    <div>
      <div class="code" @click="copyCode()">{{ code }}</div>
    </div>
    <br><br>
    <div class="players">
      <hostPlayer 
        v-for="member in members" 
        :key="member"
        :name="member"
      />
    </div>
    <br>
    <div>
      <button @click="goGame()">Enter the lobby</button>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import hostPlayer from '../components/hostPlayer.vue';

const router = useRouter();


const goHome = () => {
  router.push('/')
}

const goGame = () => {
  router.push('/game')
}

const copyCode = () => {
  navigator.clipboard.writeText(code)
}

const code = 'BNK4242'

const members = ['Sauwin','John Pork', 'Tim cheese', 'Simon Claw']
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

.panel h2 {
  font-size: 15px;
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
  transition: 0.25s;
  padding-left: 30px;
  padding-right: 30px;
}

.panel button:not(.back):hover {
  background: white;
  color: black;
  transform: scale(1.08);
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
  color: white;
  font-size: 18px;
  backdrop-filter: blur(5px);
  transition: 0.2s;
}

.back:hover {
  background: rgba(255,255,255,0.3);
  transform: scale(1.1);
}

.back-btn img {
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
  transition: 0.2s;
  cursor: pointer;
}

.code:hover {
  transform: scale(1.05);
}

.players {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>