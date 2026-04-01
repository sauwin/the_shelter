<template>
<div class="join">
  <div class="panel">
    <button class="back" @click="goHome()">
      <img src="@/assets/icons/arrow-left.svg" />
    </button>
    <div>
      <h1>Join to game</h1>
    </div>
    <div>
      <label for="">Enter your name</label>
    </div>
    <div>
      <input type="text" placeholder="John Pork">
    </div>
    
    <div>
      <label for="">Enter code from shelter</label>
    </div>
    <div>
      <input type="text" placeholder="BNK4252">
    </div>
    <br>
    <br>
    <div>
      <button @click="goHost()">Enter the lobby</button>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goHost = () => {
  router.push('/host');
}

const goHome = () => {
  router.push('/')
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
}

.panel h1 {
  font-size: 34px;
  letter-spacing: 14px;
  color: #ffffff;
  text-transform: uppercase;
  padding-bottom: 70px;
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
  cursor: pointer;
  backdrop-filter: blur(5px);
  transition: 0.25s;
  padding: 10px;
}

.panel input:hover {
  background: white;
  color: black;
  transform: scale(1.08);
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
</style>