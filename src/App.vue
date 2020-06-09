<template>
  <div id="app">
    <b-container class="mt-4">
      <b-row>
        <b-col>
          <h1 class="text-center">KUSAMA PULSE</h1>
          <h5 class="text-center"><small>Alternative visualization for different Kusama time periods. The outside circle shadow size depends on the number of events included in the last block.</small></h5>
          <Pulse />
          <p class="footer text-center">
            Coded with ❤ by <a href="https://github.com/mariopino" target="_blank">Mario Pino</a> for <a href="https://gitcoin.co/issue/Web3Foundation/build-polkadot/1/4391" target="_blank">Polkadot Launch Bounty</a> / Built using <a href="https://github.com/Colm3na/polkastats-backend-v3" target="_blank">PolkaStats Backend</a> / Source on <a href="https://github.com/Colm3na/polkapulse" target="_blank">GitHub</a>
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
$body-bg: #222;
@import '../node_modules/bootstrap/scss/bootstrap';
@import '../node_modules/bootstrap-vue/src/index.scss';

body {
  background: #222;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 100;
  width: 100%;
}
h1 {
  color: white;
  font-size: 70px;
  font-weight: 200;
  letter-spacing: 20px;
  text-align: center;
}
h5 {
  color: white;
  font-size: 16px;
  letter-spacing: 8px;
  font-weight: 200;
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
@media (max-width: 576px) {
  h1 {
    font-size: 50px;
  }
  .footer {
    margin-top: 2rem;
  }
}
</style>
