<template>
<div class="home">
  <div class="menu">
    <div class="title">
      <h1>The Shelter</h1>
    </div>
    <div class="btn">
      <button>
        Host game
      </button>
    </div>
    <div class="btn">
      <button>
        Join to game
      </button>
    </div>
  </div>
  <!-- ця хуйня -->
  <div class="footer">
    <a href="mailto:druziukmaksym@gmail.com"><img src="../icons/google.svg" /></a>
    <a href="https://github.com/sauwin"><img src="../icons/github.svg" /></a>
    <a href="https://www.facebook.com/druzuk.maxim/"><img src="../icons/facebook.svg" /></a>
    <a href="https://www.instagram.com/druziuk.maksym/"><img src="../icons/instagram.svg" /></a>
  </div>
</div>
</template>

<script setup lang="ts">

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
  background: url('../assets/img/home.jpg') center/cover no-repeat;
  filter: blur(6px) brightness(0.6);
  z-index: 0;
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

.footer img {
  width: 24px;
  opacity: 0.7;
  transition: 0.2s;
}

.footer img:hover {
  opacity: 1;
  transform: scale(1.2);
}
</style>