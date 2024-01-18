<template>
  <div>

    <TopBar :showBack="true" />

    <div id="ebook-content">
      <div v-for="(chapter, index) in chapters" :key="index">
        <h2>{{ chapter.title }}</h2>
        <content-paragraph
          v-for="(paragraph, pIndex) in chapter.content"
          :key="pIndex"
          :type="paragraph.type"
          :text="paragraph.text"
          :modal-number="paragraph.modalNumber"
          @open-modal="openModal"
        ></content-paragraph>
      </div>
    </div>

    <!-- Dynamic Modal Components -->
    <component
      v-for="modal in modals"
      :key="modal.number"
      :is="`ModalPage${modal.number}`"
      :visible="modal.visible"
      @close="closeModal(modal.number)"
    ></component>
  </div>
</template>

<script>
import ContentParagraph from './ContentParagraph.vue';
import ModalPage1 from './adhd-pages/TimeAndPlanning.vue';
import ModalPage2 from './adhd-pages/MemoryAndOrganization.vue';
import ModalPage3 from './adhd-pages/EmotionAndComposure.vue';
import ModalPage4 from './adhd-pages/AttentionAndFocus.vue';
import TopBar from './common/TopBar.vue';

export default {
  components: {
    TopBar,
    ContentParagraph,
    ModalPage1,
    ModalPage2,
    ModalPage3,
    ModalPage4,
  },
  data() {
    return {
      chapters: [],
      modals: [],
    };
  },
  methods: {
    backToMainMenu() {
      this.$router.push('/');
    },
    loadEbookContent() {
      fetch('/alice.txt')
        .then((response) => response.text())
        .then((text) => {
          console.log('Text loaded:', text);
          this.parseChapters(text);
        })
        .catch((error) => {
          console.error('Error loading ebook content:', error);
        });
    },
    parseChapters(text) {
      const chapters = [];
      let currentChapter = null;

      text.split(/\n+/).forEach((line) => {
        const chapterTitleMatch = line.match(/^CHAPTER (\d+): (.+)/);
        const quoteStartMatch = line.match(/<quote modal="(\d+)">(.*)<\/quote>/);

        if (chapterTitleMatch) {
          if (currentChapter) {
            chapters.push(currentChapter);
          }

          currentChapter = {
            title: `CHAPTER ${chapterTitleMatch[1]}: ${chapterTitleMatch[2]}`,
            content: [],
          };
        } else if (quoteStartMatch) {
          currentChapter.content.push({
            type: 'quote',
            modalNumber: quoteStartMatch[1],
            text: quoteStartMatch[2],
            highlightedText: '', // We can populate this if needed
          });
        } else if (currentChapter) {
          currentChapter.content.push({
            type: 'text',
            text: line + '<br>',
          });
        }
      });

      if (currentChapter) {
        chapters.push(currentChapter);
      }

      this.chapters = chapters;
    },
    openModal(modalNumber) {
      console.log('openModal called with modalNumber:', modalNumber);
      const existingModal = this.modals.find((modal) => modal.number === modalNumber);

      if (!existingModal) {
        const modalContent = this.chapters
          .flatMap((chapter) => chapter.content)
          .find((item) => item.type === 'quote' && item.modalNumber === modalNumber);

        if (modalContent && modalContent.type === 'quote') {
          this.modals.push({
            number: modalNumber,
            content: modalContent.text,
            visible: true,
          });
        }
      }
    },

    closeModal(modalNumber) {
      const modalIndex = this.modals.findIndex((modal) => modal.number === modalNumber);
      if (modalIndex !== -1) {
        this.$set(this.modals, modalIndex, { ...this.modals[modalIndex], visible: false });
      }
    },
  },
  mounted() {
    this.loadEbookContent();
  },
};
</script>

<style scoped>
button {
  margin-bottom: 3vw;
}

#ebook-content {
  padding: auto;
  margin: 5vw;
  text-align: left;
}

h2 {
  color: #2196F3;
  padding: auto;
  padding-top: 5vh;
  padding-bottom: 3vh;
  margin: auto;
  text-align: center;
}

p {
  line-height: 1.6;
  color: #fff;
  padding: auto;
  margin: auto;
  text-align: left;
}

.blue-link {
  color: #2196f3;
  cursor: pointer;
  text-decoration: underline;
  font-size: x-large;
}

.blue-link:hover {
  text-decoration: underline;
}

/* Modal Styles */
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

span {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
