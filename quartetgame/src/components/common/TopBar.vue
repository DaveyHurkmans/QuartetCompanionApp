<template>
  <div>
    <div class="top-bar">
      <div class="left-section">
        <router-link v-if="showBack" class="back-button" to="/"> ◄ HOME</router-link>
      </div>
      <div class="center-section">
        <!-- Your logo or other content here -->
      </div>
      <div class="right-section">
        <button class="menu-button" @click="toggleSidebar">☰</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showBack: Boolean,
  },
  methods: {
    toggleSidebar() {
      this.$emit('toggle-sidebar');
    },
  },
};
</script>

<style scoped>
.top-bar {
  background-color: #2b38b2;
  color: #fff;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  top: 0;
}

.left-section {
  grid-column: 1;
}

.center-section {
  grid-column: 2;
  display: flex;
  justify-content: center;
}

.right-section {
  grid-column: 3;
  display: flex;
  justify-content: flex-end;
}

.back-button,
.menu-button {
  background: none;
  color: #3e71fc;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.menu-button:hover {
  background-color: #fff;
  border-radius: 5px;
  color: 3e71fc;
}

.logo {
  max-width: 50px; /* Adjust the max-width as needed */
  height: auto;
  border-radius: 50%;
}

/* Sidebar styles */
.minigame-sidebar {
  background-color: #222;
  color: #fff;
  padding: 10px;
  position: fixed;
  top: 50px;
  left: 0;
  width: 200px;
  height: 100%;
  overflow-y: auto;
  transition: transform 0.3s ease-out;
  transform: translateX(-100%);
}

.minigame-toggle {
  margin-bottom: 10px;
}

.sidebar-fade-enter-active, .sidebar-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.sidebar-fade-enter, .sidebar-fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

</style>
