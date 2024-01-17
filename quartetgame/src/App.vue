<template>
  <div id="app">
    <!-- <router-link to="/">Home</router-link>
    <router-link to="/ebook">Ebook</router-link>
    <router-link to="/game">Game</router-link> -->

    <router-view></router-view>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rowdies:wght@300;400;700&display=swap');
html {
  background: #2b38b2;
}

#app {
  font-family: 'Rowdies', sans-serif;
  font-weight: thin;
  text-align: center;
  color: #fff;
}

router-link {
  margin-right: 10px;
  text-decoration: none;
  color: #72b6e3;
}

router-link:hover {
  text-decoration: underline;
  color: #fff;
}
</style>
