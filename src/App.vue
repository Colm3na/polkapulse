<template>
  <div id="app">
    <h1>KUSAMA PULSE</h1>
    <Pulse />
    <p class="footer">Coded with love by <a href="https://github.com/mariopino" target="_blank">Mario Pino</a> / Built using <a href="https://github.com/Colm3na/polkastats-backend-v3" target="_blank">PolkaStats Backend V3</a></p>
  </div>
</template>

<script>
import Pulse from './components/Pulse.vue'

export default {
  name: 'App',
  components: {
    Pulse
  }
}
</script>

<style>
body {
  background: #222;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 100;
}
h1 {
  color: white;
  font-size: 70px;
  font-weight: 200;
  letter-spacing: 20px;
}
a {
  color: white;
  font-weight: 400;
  text-decoration: none;
}
.footer {
  font-size: 10px;
  letter-spacing: 5px;
  color: white;
}
</style>
