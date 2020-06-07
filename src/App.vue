<template>
  <div id="app">
    <h1>KUSAMA PULSE</h1>
    <Pulse />
    <p class="footer">Coded with love by Mario Pino / Built using PolkaStats Backend V3</p>
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
.footer {
  font-size: 10px;
  letter-spacing: 5px;
  color: white;
}
</style>
