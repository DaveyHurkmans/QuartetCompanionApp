// main.js or wherever you initialize your app
import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import MainMenu from '@/components/MainMenu.vue';
import EbookPage from '@/components/EbookPage.vue';
import GamePage from '@/components/GamePage.vue';

library.add(fas);

const routes = [
  { path: '/', component: MainMenu },
  { path: '/ebook', component: EbookPage },
  { path: '/game', component: GamePage },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
