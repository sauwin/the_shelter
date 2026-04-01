<template>
  <div class="player">
    <div class="avatar"></div>
    <span class="name">{{ name }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<style scoped>
.player {
  width: 260px;
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 10px 15px;

  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.3);

  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(6px);

  transition: 0.2s;
}

.player:hover {
  transform: scale(1.05);
  border-color: rgba(255,255,255,0.7);
  box-shadow: 0 0 10px rgba(255,255,255,0.3);
}

.avatar {
  width: 12px;
  height: 12px;
  border-radius: 50%;

  background: #000000;
  box-shadow: 0 0 8px #ffffff;
}

.name {
  font-size: 14px;
  letter-spacing: 2px;
  color: white;
}
</style>