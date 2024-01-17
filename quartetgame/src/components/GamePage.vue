<template>
      <div>
        <TopBar :showBack="true" @toggle-sidebar="toggleSidebar" />
        
        <transition name="sidebar-fade">
          <div v-if="sidebarOpen" class="minigame-sidebar">
            <div v-for="(minigame, index) in minigames" :key="index" class="minigame-toggle">
              <div class="minigame-info">
                {{ minigame.name }}
              </div>
              <div class="minigame-toggle-button">
                <span>{{ minigame.enabled ? '✓' : 'X' }}</span>
                <button @click="toggleMinigame(minigame)">
                  {{ minigame.enabled ? 'Disable' : 'Enable' }}
                </button>
              </div>
            </div>
          </div>
        </transition>

        
        <div id="points-display" class="container mt-3">
        <div class="points-row">
        <div class="points-button">
          <button id="minus" @click="adjustPoints('-')">-</button>
        </div>

        <div class="points-middle">
          <h2><span id="user-points">{{ userPoints }}</span></h2>
          <p>Points</p>
        </div>

        <div class="points-button">
          <button id="plus" @click="adjustPoints('+')">+</button>
        </div>
      </div>

      <div class="manual-input">
        <div class="points-input">
            <input type="number" v-model="pointInput" class="form-control" />
          </div>

        <div class="points-apply">
          <button class="btn btn-success" @click="applyPoints">Apply</button>
        </div>
    </div>
    </div>

    <!-- Active minigames cards -->
    <div v-for="(minigame, index) in activeMinigames" :key="index" class="card">
          <!-- Inside the modal-content div -->
    <button class="close-modal-btn" @click="openMinigameModal(minigame)"> X </button>
    <h3>{{ minigame.name }}</h3>

      
      <div @click="openMinigameModal(minigame)">
        <div v-if="minigame.name === 'EmotionAndComposure'" class="wheel-container" ref="wheelContainer">
          <div class="wheel"></div>
        </div>

        <div v-else-if="minigame.name === 'TimeAndPlanning'" class="timer-challenge-container">
          <div class="timer-curtain" :class="{ closed: timerVisible }">
            <div class="timer"></div>
            <button @click="stopTimer">Stop Timer</button>
          </div>
        </div>

        <div v-else-if="minigame.name === 'AttentionAndFocus'" class="ik-zie-ik-zie-container">
          <div v-for="(button, buttonIndex) in ikZieIkZieButtons" :key="buttonIndex" @click="toggleIkZieButton(buttonIndex)" :class="{ toggled: button }" class="ik-zie-ik-zie-button"></div>
        </div>

        <div v-else-if="minigame.name === 'MemoryAndOrganisation'" class="shuffle-container">
          <button class="minigameBTN" @click="playShuffleTime"> It's Shuffle Time! </button>
        </div>

      </div>
    </div>

    <div class="container mt-5 minigame-cards">
      <div v-for="(minigame, index) in enabledMinigames" :key="index" class="minigame-card">
        <div class="card-body text-center" @click="playMinigame(minigame)">
          <h5 class="card-title">{{ minigame.name }}</h5>
          <p>{{ minigame.description }}</p>
        </div>
      </div>
    </div>

    <!-- Modal Container -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>{{ activeMinigame.name }}</h2>

        <div v-if="activeMinigame.name === 'EmotionAndComposure'" @click="playWheelOfFortune">
          <div class="wheel-container">
            <div class="wheel" @click="playWheelOfFortune"></div>
            <div v-if="showOutcome" class="outcome">
              {{ outcomeMessage }}
            </div>
          </div>
        </div>

        <!-- TimeAndPlanning Minigame -->
        <div v-else-if="activeMinigame.name === 'TimeAndPlanning'" @click="playTimerChallenge">
          <div class="timer-challenge-container">
            <div class="timer-curtain" :class="{ closed: timerVisible }">
              <div class="timer"></div>
              <button @click="stopTimer">Stop Timer</button>
            </div>
          </div>
        </div>

        <!-- MemoryAndOrganisation Minigame -->
        <div v-else-if="activeMinigame.name === 'MemoryAndOrganisation'" @click="playShuffleTime">
          <div class="shuffle-container">
            <button @click="playShuffleTime">Play MemoryAndOrganisation</button>
          </div>
        </div>
        <div v-else-if="activeMinigame.name === 'AttentionAndFocus'" @click="playIkZieIkZie">
          <div class="ik-zie-ik-zie-container">
            <div v-for="(button, buttonIndex) in ikZieIkZieButtons" :key="buttonIndex" @click="toggleIkZieButton(buttonIndex)" :class="{ toggled: button }" class="ik-zie-ik-zie-button"></div>
          </div>
        </div>
        
        <!-- Add modal content for other minigames -->
      </div>
    </div>
    <div class="container mt-5 minigame-cards">
      <div v-for="(minigame, index) in enabledMinigames" :key="index" class="minigame-card">
        <div class="card-body text-center" @click="playMinigame(minigame)">
          <h5 class="card-title">{{ minigame.name }}</h5>
          <p>{{ minigame.description }}</p>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>{{ activeMinigame.name }}</h2>

        <div v-if="activeMinigame.name === 'EmotionAndComposure'" @click="playWheelOfFortune">
          <div class="wheel-container">
            <div class="wheel" @click="playWheelOfFortune"></div>
            <div v-if="showOutcome" class="outcome">
              {{ outcomeMessage }}
            </div>
          </div>
        </div>
        <!-- Add modal content for each minigame -->
      </div>
    </div>
  </div>
</template>


<script>
import TopBar from './common/TopBar.vue';

export default {
  components: {
    TopBar,
  },

  data() {
    return {
      userPoints: 0,
      pointInput: 0,
      minigames: [
        { name: 'EmotionAndComposure', enabled: true, cooldown: 0, description: 'Emotion & Composure' },
        { name: 'TimeAndPlanning', enabled: true, cooldown: 0, description: 'Time & Planning' },
        { name: 'AttentionAndFocus', enabled: true, cooldown: 0, description: 'Attention & Focus' },
        { name: 'MemoryAndOrganisation', enabled: true, cooldown: 0, description: 'Memory & Organisation' },
        { name: 'EmotionAndComposure', enabled: false, cooldown: 0, description: 'Emotion & Composure' },
        { name: 'TimeAndPlanning', enabled: false, cooldown: 0, description: 'Time & Planning' },
        { name: 'AttentionAndFocus', enabled: false, cooldown: 0, description: 'Attention & Focus' },
        { name: 'MemoryAndOrganisation', enabled: false, cooldown: 0, description: 'Memory & Organisation' },
      ],
      activeMinigames: [], 
      selectedMinigame: null,
      timerVisible: false,
      timerValue: 0,
      shuffling: false,
      showModal: false,
      wheelResult: null,
      showOutcome: false,
      outcomeMessage: '',
      sidebarOpen: false,
      ikZieIkZieButtons: [false, false, false],
    };
  },

  computed: {
    enabledMinigames() {
      return this.minigames.filter(minigame => minigame.enabled);
    },
  },

  methods: {
    
    backToMainMenu() {
      this.$router.push('/');
    },

    toggleSidebar() {
      console.log('Toggling sidebar');
      this.sidebarOpen = !this.sidebarOpen;
    },

    toggleMinigame(minigame) {
      minigame.enabled = !minigame.enabled;
    },

    adjustPoints(operator) {
      this.userPoints += operator === '-' ? -1 : 1;
    },

    applyPoints() {
      const pointsToAdd = parseInt(this.pointInput);
      if (!isNaN(pointsToAdd)) {
        this.userPoints += pointsToAdd;
        this.pointInput = 0;
      }
    },

    playMinigame(minigame) {
      if (minigame.enabled && minigame.cooldown === 0) {
        this.activeMinigames = [minigame];
        // Add logic to play the minigame
      } else if (!minigame.enabled) {
        alert('Minigame is disabled');
      } else {
        alert('Minigame is on cooldown');
      }
    },

    openMinigameModal(minigame) {
      this.closeModal();

      console.log('Opening modal for:', minigame.name);
      this.activeMinigame = minigame;
      this.showModal = true;

      if (minigame.name === 'EmotionAndComposure') {
        this.wheelResult = null;
        this.showOutcome = false;
        this.outcomeMessage = '';
      }
    },

    closeModal() {
      console.log("Closing modal");
      this.showModal = false;
      this.activeMinigame = null; // Reset activeMinigame
    },
        // EmotionAndComposure Minigame
        playWheelOfFortune() {
      this.showOutcome = false;
      this.outcomeMessage = '';

      const wheelContainer = this.$refs.wheelContainer;
      const wheelElement = wheelContainer.querySelector('.wheel');

      // Add a class to trigger the animation
      wheelElement.classList.add('spin');

      setTimeout(() => {
        const spinResult = Math.random();
        this.wheelResult = spinResult <= 0.6 ? 'red' : 'blue';

        this.showOutcome = true;
        this.outcomeMessage = this.wheelResult === 'blue'
          ? 'Congratulations! You won!'
          : 'Sorry, better luck next time!';

        // Remove the 'spin' class after the animation is complete
        wheelElement.classList.remove('spin');
      }, 2000);
    },

    // TimeAndPlanning Minigame
    playTimerChallenge() {
      this.timerVisible = true;

      setTimeout(() => {
        const timerValue = Math.floor(Math.random() * 20) + 110;

        this.timerRevealAnimation();

        setTimeout(() => {
          this.timerVisible = false;

          if (timerValue >= 110 && timerValue <= 130) {
            alert('Congratulations! You won!');
          } else {
            alert('Sorry, you lost.');
          }
        }, 2000);
      }, 1000);
    },

    // MemoryAndOrganisation Minigame
    playShuffleTime() {
      this.shuffling = true;

      this.shuffleAnimation();

      setTimeout(() => {
        this.shuffling = false;
        this.showOutcomeMessage('It\'s Shuffle Time!');
      }, 2000);
    },

    // Common method to display outcome messages
    showOutcomeMessage(message) {
      setTimeout(() => {
        this.showOutcome = false;
        this.outcomeMessage = '';
        alert(message);
      }, 2000);
    },

    spinWheelAnimation() {
  console.log("Spinning wheel animation...");
  const wheelElement = document.querySelector('.wheel');
  if (wheelElement) {
    wheelElement.style.animation = 'none';
    void wheelElement.offsetWidth;
    wheelElement.style.animation = 'spin 2s ease-out forwards';
  }
},

    timerRevealAnimation() {
      const timerElement = document.querySelector('.timer-animation');
      if (timerElement) {
        timerElement.style.animation = 'revealTimer 2s ease-out forwards';
      }
    },

    shuffleAnimation() {
      const shuffleElement = document.querySelector('.shuffle-animation');
      if (shuffleElement) {
        shuffleElement.style.animation = 'shuffle 2s ease-out forwards';
      }
    },
  },
};
</script>



<style scoped>
#app {
  margin: 0;
  padding: 0;
}

.top-bar-image {
  max-width: 100px;
  height: auto;
  margin-left: 20px;
}

.minigame-toggle {
  text-align: left;
}

.minigame-toggle-button button {
  color: #fff;
  margin-left: 4vw;
  width: 20vw;
  height: 10vw;
  color: #bdc8d7;
  border: 0px;
  border-radius: 5px;
  background: #2e40c1;
  font-family: 'Rowdies', sans-serif;
}

.minigame-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: auto;
  height: 100%;
  background-color: #1088eb; /* Adjust the background color as needed */
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  color: white;
  z-index: 2;
  overflow-y: auto;
}

.minigame-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px; /* Adjust the margin as needed */
}

.minigame-info {
  flex-grow: 1; /* Takes remaining space */
  margin-right: 10px; /* Adjust the margin as needed */
}


.sidebar-fade-enter-active,
.sidebar-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s; /* Update transition properties */
}

.sidebar-fade-enter-active, .sidebar-fade-leave-active {
  transition: opacity 0.5s;
}
.sidebar-fade-enter, .sidebar-fade-leave-to {
  opacity: 0;
}



#points-display {
  text-align: center;
  margin-top: 15vh; /* Adjust as needed */
  transform: translateY(-50%);
}

.points-middle {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.points-middle h2 {
  margin: 5px 0;
}

.points-row {
  display: inline-flex;
  align-items: center;
}

.points-button, .points-input, .points-apply {
  margin: 0 10px;
}

.minigameBTN {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #1088eb;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  height: auto;
  font-family: 'Rowdies', sans-serif;
}

.points-button button {
  width: 10vw;
  height: 10vw;
  background: #bdc8d7;
  border: 0px;
  border-radius: 8px;
  color: #2e40c1;
  font-family: 'Rowdies', sans-serif;
  }

#minus  {
  transform: rotate(-3deg);
  font-family: 'Rowdies', sans-serif;
  margin: auto;
  font-size: 8vw;
}

#plus  {
  transform: rotate(5deg);
  font-family: 'Rowdies', sans-serif;
  margin: auto;
  font-size: 8vw;
}

.manual-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.points-input {
  margin-bottom: 15px;
}

.points-input input {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 200px;
  text-align: center;
}

.points-apply {
  width: 45%;
}

.points-apply button {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #1088eb; 
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;  
  font-family: 'Rowdies', sans-serif;
}

.points-apply button:hover {
  background-color: #0619a8; 
}

.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-success {
  color: #fff;
  background-color: #28a745; /* Bootstrap success color */
}

.btn-success:hover {
  background-color: #218838; /* Darker shade on hover */
}

.manual-input {
  margin-top: 6vw;
  margin-bottom: 10vw;
}

.points-middle {
  white-space: nowrap;
}



.points-middle p {
  font-size: 30px;
  margin: 0;
}

.points-middle h2 {
  font-size: 80px;
  margin: 0;
  margin-left: 2vw;
  margin-right: 2vw;
}

.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 400px;
  position: relative;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: #000;
}

.wheel-container {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 20px auto;
  cursor: pointer;
}

.wheel {
  width: 100%;
  height: 100%;
  background: conic-gradient(
    #b40945 0deg 60deg,
    #1088eb 60deg 120deg,
    #b40945 120deg 180deg,
    #1088eb 180deg 240deg,
    #b40945 240deg 300deg,
    #1088eb 300deg 360deg
  );
  border-radius: 50%;
  transition: transform 2s ease-out;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.spin {
  animation: spin 2s ease-out forwards;
}

.red {
  background: conic-gradient(red 0% 100%, blue 100% 100%);
}

.blue {
  background: conic-gradient(red 0% 0%, blue 0% 100%);
}

.arrow {
  position: absolute;
  top: 0;
  left: 50%;
  width: 0;
  height: 0;
  border: 20px solid transparent;
  border-bottom-color: #333;
  margin-left: -20px;
}

.outcome {
  margin-top: 20px;
  font-weight: bold;
  color: #333;
}

.shuffle-container {
  position: relative;
  width: auto;
  height: 100px;
  margin: 20px auto;
  cursor: pointer;
  padding: 5vw;
}

.shuffle-container button {
  position: relative;
  width: auto;
  height: auto;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
}

.shuffle-animation {
  width: 100%;
  height: 100%;
  background-color: #ff0000;
  animation: none;
}

@keyframes shuffle {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(50px);
  }
  100% {
    transform: translateX(0);
  }
}

.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 50px;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  padding-top: 60px;
  transition: 0.5s;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover,
.offcanvas a:focus {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

#main {
  transition: margin-left 0.5s;
  padding: 20px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}

.card-title {
    display: none;
  }

  .card-name {
    display: none;
  }

  .close-modal-btn {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  background-color: #d9534f; /* Bootstrap danger color */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: auto;
}

.close-modal-btn:hover {
  background-color: #c9302c; /* Darker shade on hover */
}

.outcome {
  margin-top: 20px;
  font-weight: bold;
  color: #333;
}

.minigame-cards {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 150px;
  width: 100%;
  z-index: 1;
  font-family: 'Roboto', sans-serif;
  font-size: medium;
  color: #2e40c1;
}

.minigame-card {
  width: 100px;
  height: 150px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  margin: 0 5px;
  color: #2e40c1;
}

.minigame-card:hover {
  box-shadow: 0 0 10px rgba(210, 134, 21, 0.702);
}

@media screen and (max-width: 767px) {
  .minigame-card {
    width: 90vw;
    height: auto;
    background-color: white;
    border: 0px solid #ccc;
    border-radius: 5px 5px 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    cursor: pointer;
    margin: 0 5px;
    color: #000;
    box-shadow: 0 0 2px rgba(36, 35, 35, 0.75);
  }

  .card-title {
    display: none;
  }

  .card-name {
    display: block;
  }


  .card {
    margin-top: -30vw;
  }

  .minigame-cards {
    flex-direction: column;
    align-items: center;
    height: auto;
  }
}
</style>


