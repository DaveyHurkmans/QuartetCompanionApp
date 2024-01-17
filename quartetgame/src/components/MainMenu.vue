<template>
  <div class="container mt-5 box">
    <h1 class="text-center text-primary">we're all <br> ADHD Here </h1>
    <h2> the Game </h2>


    <div class="row button-row">
      <router-link to="/game" class="col-md-4">
        <button class="learn-more" id="gamebutton">Play Game</button>
      </router-link>
    </div>

    <div class="row button-row">
      <router-link to="/ebook" class="col-md-4">
        <button class="learn-more" id="readbutton">Read Alice</button>
      </router-link>
    </div>

    <div class="row button-row">
      <router-link to="" class="col-md-4">
        <button class="learn-more" id="readbutton" @click="openSettings">ADHD Info</button>
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
      alert('Not implemented yet!');
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

#settingsbutton {
  display: none;
}

h1 {
  font-size: 12vw;
}

#gamebutton {
  padding: 10px 20px;
  font-size: 50px;
  background-color: #1088eb; 
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;  
  font-family: 'Rowdies', sans-serif;
}

#readbutton {
  padding: 10px 20px;
  font-size: 50px;
  background-color: #1088eb; 
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;  
  font-family: 'Rowdies', sans-serif;
}

#settingsbutton {
  width: 10vw;
  height: 10vw;
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
