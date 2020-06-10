<template>
  <div id="app" class="scanlines">
    <b-container class="mt-4">
      <b-row>
        <b-col>
          <h1>KUSAMA PULSE</h1>
          <h5 class="text-center">
            <small>
              Alternative visualization for different Kusama time periods. Shadow size depends on the number of events included in the last block.
            </small>
          </h5>
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
h5 {
  color: white;
  font-size: 16px;
  letter-spacing: 4px;
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

// Glitch effect
h1 {
  color: white;
  font-size: 70px;
  font-weight: 200;
  letter-spacing: 25px;
  text-align: center;
  text-shadow: 0.06rem 0 0.06rem #ea36af, -0.125rem 0 0.06rem #75fa69;
  letter-spacing: 20px;
  text-align: center;
  animation-duration: 0.1s;
  animation-name: glitch;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  margin-bottom: 2rem;
}
@keyframes glitch {
  from {
    text-shadow: 1px 0 0 #ea36af, -2px 0 0 #75fa69;
  }
  to {
    text-shadow: 2px 0.5px 2px #ea36af, -1px -0.5px 2px #75fa69;
  }
}

// Scan lines
.scanlines {
  overflow: hidden;
  mix-blend-mode: difference;
}
.scanlines::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0%,
    rgba(255, 255, 255, 0.05) .5%,
    transparent 0.9%
  );
}
</style>
