<template>
<div class="home">
  <div class="menu">
    <div class="title">
      <h1>The Shelter</h1>
    </div>
    <div class="btn">
      <button @click="goHost">
        Host game
      </button>
    </div>
    <div class="btn">
      <button @click="goJoin">
        Join to game
      </button>
    </div>
  </div>
  <div class="footer">
    <a href="mailto:druziukmaksym@gmail.com"><img src="@/assets/icons/google.svg" /></a>
    <a href="https://github.com/sauwin"><img src="@/assets/icons/github.svg" /></a>
    <a href="https://www.facebook.com/druzuk.maxim/"><img src="@/assets/icons/facebook.svg" /></a>
    <a href="https://www.instagram.com/druziuk.maksym/"><img src="@/assets/icons/instagram.svg" /></a>
  </div>
</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goHost = () => {
  router.push('/host')
}

const goJoin = () => {
  router.push('/join')
}
</script>

<style scoped>
.home {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.home::before {
  content: "";
  position: absolute;
  inset: 0;
  background: url('../assets/img/home.jpg');
  background-position: center;
  background-size: cover;
  filter: blur(4px) brightness(0.7);
  z-index: 0;
  transform: scale(1.05);
}

.menu {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
}

.title h1 {
  font-size: clamp(40px, 8vh, 100px);
  letter-spacing: 14px;
  color: #ffffff;
  text-transform: uppercase;
  margin-bottom: 100px;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  font-family: 'Orbitron', sans-serif;
}

.btn {
  width: 260px;
}

.btn button {
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
}

.btn button:hover {
  background: white;
  color: black;
  transform: scale(1.08);

}

.footer {
  position: absolute;
  bottom: 25px;
  left: 40px;
  display: flex;
  gap: 40px;
  z-index: 1;
}

.footer img {
  width: 24px;
  filter: brightness(0) invert(1);
  opacity: 0.7;
  transition: 0.2s;
}

.footer a:hover {
  opacity: 1;
  transform: scale(1.2);
}
</style>