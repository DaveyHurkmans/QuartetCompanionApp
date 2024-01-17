<template>
  <div>
    <span v-if="type === 'text'" v-html="text"></span>
    <a v-else-if="type === 'quote'" class="blue-link" @click="openModalFunction" role="button">
      <span v-html="highlightedText"></span>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    text: String,
    modalNumber: String,
    openModal: Function,
  },
  computed: {
    highlightedText() {
      const regex = new RegExp(`<quote modal="${this.modalNumber}">(.*?)<\\/quote>`, 's');
      const match = this.text.match(regex);
      return match ? match[1].trim() : this.text;
    },
  },
  methods: {
    openModalFunction() {
      console.log('openModalFunction called with modalNumber:', this.modalNumber);
      this.openModal(this.modalNumber);
    },
  },
};
</script>

<style scoped>
.blue-link {
  color: #2196f3;
  cursor: pointer;
  text-decoration: underline;
}

.blue-link:hover {
  text-decoration: underline;
}
</style>
