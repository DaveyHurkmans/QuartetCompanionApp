<template>
  <div class="card-container">
    <div class="card">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  // You can add props, methods, etc., as needed
};
</script>

<style scoped>
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.card {
  background-color: #fff;
  padding: 2em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 80%;
  max-width: 400px;
}
</style>
