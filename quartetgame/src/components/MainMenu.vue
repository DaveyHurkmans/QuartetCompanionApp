<template>
  <div class="container mt-5 box">
    <h1 class="text-center text-primary">Quartet in <br> Wonderland</h1>

    <div class="row button-row">
      <router-link to="/game" class="col-md-4">
        <button class="learn-more" id="gamebutton">Play Game</button>
      </router-link>
    </div>

    <div class="row button-row">
      <router-link to="/ebook" class="col-md-4">
        <button class="learn-more" id="readbutton">Read</button>
      </router-link>
    </div>

    <div class="row button-row">
      <button class="learn-more" id="settingsbutton" @click="openSettings">
        <font-awesome-icon icon="cog" />
      </button>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  components: {
    FontAwesomeIcon,
  },
  methods: {
    openSettings() {
      // Implement opening settings (you can add this feature)
      alert('Settings not implemented yet!');
    },
  },
};
</script>



<style scoped>
@import url('https://fonts.googleapis.com/css?family=Rubik:700&display=swap');

.box {
  margin-top: 40vw;
  margin-bottom: 40vw;
}

* {
  box-sizing: border-box;
}

body {
  font-family: 'Rubik', sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #fff;  

}

.button-row {
  display: flex;
  justify-content: center;
  margin-top: 2em;
}

.learn-more {
  font-weight: 600;
  color: #382b22;
  text-transform: uppercase;
  padding: 1em 2em;
  background: #fff0f0;
  border: 2px solid #b18597;
  border-radius: 8px;
  transform-style: preserve-3d;
  transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 150ms cubic-bezier(0, 0, 0.58, 1);
  position: relative;
}

.learn-more::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #f9c4d2;
  border-radius: inherit;
  box-shadow: 0 0 0 2px #b18597, 0 0.625em 0 0 #ffe3e2;
  transform: translate3d(0, 0.75em, -1em);
  transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), box-shadow 150ms cubic-bezier(0, 0, 0.58, 1);
}

.learn-more:hover {
  background: #ffe9e9;
  transform: translate(0, 0.25em);
}

.learn-more:hover::before {
  box-shadow: 0 0 0 2px #b18597, 0 0.5em 0 0 #ffe3e2;
  transform: translate3d(0, 0.5em, -1em);
}

.learn-more:active {
  background: #ffe9e9;
  transform: translate(0em, 0.75em);
}

.learn-more:active::before {
  box-shadow: 0 0 0 2px #b18597, 0 0 #ffe3e2;
  transform: translate3d(0, 0, -1em);
}

#settingsbutton {
  width: 10vw;
  height: 10vw;
}

button:hover {
  background-color: #1565C0;
}

.button-row button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em 2em; /* Adjust padding as needed */
}

.button-row button .learn-more {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #382b22;
  text-transform: uppercase;
  background: #fff0f0;
  border: 2px solid #b18597;
  border-radius: 8px;
  transition: transform 150ms cubic-bezier(0, 0, 0.58, 1),
    background 150ms cubic-bezier(0, 0, 0.58, 1);
}

.button-row button:hover .learn-more {
  background: #ffe9e9;
  transform: translate(0, 0.25em);
}

.button-row button:hover .learn-more::before {
  box-shadow: 0 0 0 2px #b18597, 0 0.5em 0 0 #ffe3e2;
  transform: translate3d(0, 0.5em, -1em);
}

.button-row button:active .learn-more {
  background: #ffe9e9;
  transform: translate(0em, 0.75em);
}

.button-row button:active .learn-more::before {
  box-shadow: 0 0 0 2px #b18597, 0 0 #ffe3e2;
  transform: translate3d(0, 0, -1em);
}

#settingsbutton {
  width: 10vw;
  height: 10vw;
}

#settingsbutton .fa-icon {
  font-size: 100%; /* Adjust the font size as needed */
}
.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 3em;
  overflow: visible;
  vertical-align: -0.125em;
}

</style>
