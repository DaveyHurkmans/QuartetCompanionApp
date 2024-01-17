<template>
  <div>
    <div class="top-bar">
      <div class="left-section">
        <router-link v-if="showBack" class="back-button" to="/"> ◄ HOME</router-link>
      </div>
      <div class="center-section">
        <!-- <img src=".././hat.svg" alt="Logo" class="logo" /> -->
      </div>
      <div class="right-section">
        <button class="menu-button" @click="toggleSidebar">☰</button>
      </div>
    </div>

    <!-- Sidebar with Minigame Toggles -->
    <transition name="sidebar-fade">
      <div v-if="sidebarOpen" class="minigame-sidebar">
        <div v-for="(minigame, index) in minigames" :key="index" class="minigame-toggle">
          {{ minigame.name }}:
          <span>{{ minigame.enabled ? '✓' : 'X' }}</span>
          <button @click="toggleMinigame(minigame)">
            {{ minigame.enabled ? 'Disable' : 'Enable' }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    showBack: Boolean,
  },
  data() {
    return {
      sidebarOpen: false,
      minigames: [
        // Your minigames data here
      ],
    };
  },
  methods: {
    toggleSidebar() {
      console.log('Toggling sidebar');
      this.sidebarOpen = !this.sidebarOpen;
    },
    toggleMinigame(minigame) {
      minigame.enabled = !minigame.enabled;
    },
  },
};
</script>

<style scoped>
.minigame-sidebar {
  height: 100vh;
  width: 250px; /* Adjust the width as needed */
  position: fixed;
  top: 0;
  left: -250px; /* Hide the sidebar initially */
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s; /* Add a transition effect */
  z-index: 1000;
}

.sidebar-open {
  left: 0;
}

.minigame-toggle {
  padding: 10px;
  color: #fff;
  cursor: pointer;
  border-bottom: 1px solid #555;
}

.minigame-toggle:hover {
  background-color: #555;
}
</style>
