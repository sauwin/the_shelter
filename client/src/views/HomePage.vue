<template>
  <div class="home-page" :style="{ backgroundImage: `url(${bgImg})` }">
    <div class="bg-overlay" />

    <div class="content">
      <h1 class="title">The Shelter</h1>
      <div class="buttons">
        <button class="btn-main" @click="router.push('/host')">Host Game</button>
        <button class="btn-main" @click="router.push('/join')">Join to Game</button>
      </div>
    </div>

    <footer class="footer-links">
      <a href="https://github.com/sauwin" target="_blank" aria-label="GitHub">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
      </a>
      <a href="mailto:druziukmaksym@gmail.com" aria-label="Email">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
      </a>
      <a href="https://www.facebook.com/druzuk.maxim/" target="_blank" aria-label="Facebook">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
      </a>
      <a href="https://www.instagram.com/druziuk.maksym/" target="_blank" aria-label="Instagram">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
      </a>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import bgImg from '../assets/img/home.jpg'

const router = useRouter()
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');

.home-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-family: 'Cinzel', serif;
  
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(20, 15, 10, 0.25) 0%,
    rgba(10, 8, 5, 0.4) 50%,
    rgba(20, 15, 10, 0.55) 100%
  );
  z-index: 1;
}

.content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 150px;
}

.title {
  font-family: 'Cinzel', serif;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 700;
  color: #f5ede0;
  letter-spacing: 0.12em;
  text-shadow: 0 2px 16px rgba(0,0,0,0.9), 0 0 40px rgba(180,140,80,0.3);
  text-transform: uppercase;
  margin: 0;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 54px;
  width: 280px;
}

.btn-main {
  font-family: 'Cinzel', serif;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #2a1f10;
  background: linear-gradient(135deg, #e8d5b0, #d4b882, #c9a96e);
  border: none;
  border-radius: 50px;
  padding: 16px 40px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.25);
}
.btn-main:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.6); }
.btn-main:active { transform: translateY(0); }

.footer-links {
  position: absolute;
  bottom: 24px;
  left: 28px;
  z-index: 2;
  display: flex;
  gap: 18px;
  align-items: center;
}
.footer-links a {
  color: #c8b89a;
  transition: color 0.2s, transform 0.2s;
  display: flex;
}
.footer-links a:hover { color: #f0ddb0; transform: translateY(-2px); }
</style>