<template>
  <div class="player-card" :class="{ 'is-exiled': isExiled, 'is-me': isMe }">
    <div class="player-header">
        <div class="identity">
        <span class="name">
            {{ name }}
        </span>
        </div>
      <div v-if="isExiled" class="exiled-label">OUT</div>
    </div>

    <div class="stats-container">
      <div v-for="(stat, key) in character" :key="key" 
           class="stat-box"
           :class="getStatClass(stat, key as string)"
           @click="handleReveal(String(key))">
        <div class="stat-header">
          <span class="stat-key">{{ formatLabel(String(key)) }}</span>
        </div>
        <div class="stat-content">
          {{ (stat.open || isMe || isExiled) ? stat.val : '••••••••' }}
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    id: string,
    name: string,
    character: Record<string, { val: string, open: boolean }>,
    isMe: boolean,
    isExiled: boolean,
    isHost: boolean,
    showVoteBtn: boolean
}>();

const emit = defineEmits(['reveal', 'vote']);

const getStatClass = (stat: any, key: string) => {
    if (props.isMe) {
        return stat.open ? 'revealed' : 'hidden-stat';
    } else {
        return stat.open || props.isExiled ? 'revealed' : 'hidden-stat';
    }
};

const formatLabel = (key: string) => {
    const labels: Record<string, string> = {
        ages: 'Вік', genders: 'Стать', health: 'Здоров\'я', psyche: 'Психіка',
        phobias: 'Фобія', traits: 'Риса', jobs: 'Професія', hobbies: 'Хобі',
        inventory: 'Рюкзак', extra: 'Додатково'
    };
    return labels[key] || key;
};

const handleReveal = (key: string) => {
    if (props.isMe && !props.character[key].open && !props.isExiled) {
        emit('reveal', key);
    }
};
</script>

<style scoped>
.player-card {
  background: rgba(20, 20, 20, 0.9);
  border-radius: 12px;
  border: 1px solid #333;
  overflow: hidden;
  position: relative;
}

.is-exiled { 
    filter: grayscale(1); 
    opacity: 0.7; 
    border-color: #ff4444 !important; 
}
.is-me { 
    border-color: #00ff88; 
}

.stats-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 15px;
}

.stat-box {
  background: #111;
  padding: 8px;
  border-radius: 6px;
  border-left: 3px solid #333;
  transition: 0.3s;
  cursor: pointer;
}

.stat-box.revealed {
  border-left-color: #00ff88;
  background: rgba(0, 255, 136, 0.05);
}

.stat-box.hidden-stat {
  border-left-color: #ff4444;
  background: rgba(255, 68, 68, 0.05);
}

.stat-key { 
    font-size: 10px; 
    color: #888; 
    text-transform: uppercase; 
}
.stat-content { 
    font-size: 13px; 
    color: #fff; 
    margin-top: 4px; 
}

.badge-me { 
    background: #00ff88; 
    color: #000; 
    padding: 2px 6px; 
    border-radius: 4px; 
    font-size: 10px; 
    font-weight: bold; 
}
.badge-host { 
    border: 1px solid #ffaa00; 
    color: #ffaa00;
     padding: 2px 6px; 
     border-radius: 4px; 
     font-size: 10px; 
}
.exiled-label { 
    color: #ff4444; 
    font-weight: bold; 
    border: 2px solid #ff4444; 
    padding: 2px 8px; 
    transform: rotate(-15deg); 
}

.identity {
    margin: 10px;
}
</style>