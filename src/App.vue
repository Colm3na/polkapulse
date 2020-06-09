<template>
  <div id="app">
    <b-container class="mt-4">
      <b-row>
        <b-col>
          <h1 class="text-center">KUSAMA PULSE</h1>
          <Pulse />
          <p class="footer">
            Coded with love by <a href="https://github.com/mariopino" target="_blank">Mario Pino</a> for <a href="https://gitcoin.co/issue/Web3Foundation/build-polkadot/1/4391" target="_blank">Polkadot Launch Bounty</a> / Built using <a href="https://github.com/Colm3na/polkastats-backend-v3" target="_blank">PolkaStats Backend V3</a> / Check source on <a href="https://github.com/Colm3na/polkapulse" target="_blank">GitHub</a>
          </p>
        </b-col>
      </b-row>  
    </b-container>
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

<style lang="scss">
// Your variable overrides
$body-bg: #222;

// Bootstrap and its default variables
@import '../node_modules/bootstrap/scss/bootstrap';
// BootstrapVue and its default variables
@import '../node_modules/bootstrap-vue/src/index.scss';



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
  margin-top: 4rem;
}
</style>
