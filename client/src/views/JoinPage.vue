<template>
<div class="join">

</div>
</template>

<script setup lang="ts">

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
  filter: blur(4px) brightness(0.7);
  background-image: url('../assets/img/join.jpg');
  background-position: center;
  background-size: cover;
  z-index: 0;
  transform: scale(1.05);
}
</style>