<template>
  <div>
    <!-- Desktop -->
    <div class="pulse d-none d-md-block d-lg-block">
      <div class="rings">
        <div class="day" v-b-tooltip.hover title="Daily progress, 4 eras / day in Kusama" v-bind:style="{boxShadow:`0px 0px ${animatedShadow}px ${animatedShadow}px rgba(230,0,122,.4)`}">
          <input class="knob day" data-min="0" data-max="14400" data-readOnly="true" data-bgColor="#333" data-fgColor="#e6007a" data-displayInput=false data-width="500" data-height="500" data-thickness=".25">
        </div>
        <div class="era" v-b-tooltip.hover :title="`Era progress, current era index is #${chainState.currentEra}`">
          <input class="knob era" data-min="0" data-max="3600" data-readOnly="true" data-bgColor="#333" data-fgColor="#ec5aa7" data-displayInput=false data-width="350" data-height="350" data-thickness=".4">
        </div>
        <div class="session" v-b-tooltip.hover :title="`Session progress, current session index is #${chainState.currentIndex}`">
          <input class="knob session" data-min="0" data-max="600" data-readOnly="true" data-bgColor="#333" data-fgColor="#c1f85e" data-displayInput=false data-width="194" data-height="194" data-thickness=".2">
        </div>
        <div class="block" v-b-tooltip.hover title="Block time">
          <input class="knob block" data-min="0" data-max="6000" data-readOnly="true" data-bgColor="#333" data-fgColor="#67f156" data-displayInput=false data-width="144" data-height="194" data-thickness=".05">
        </div>
        <div class="lastBlock">
          <a :href="`https://kusama.polkastats.io/block?blockNumber=${chainState.blockNumber}`" v-b-tooltip.hover title="Current block" target="_blank">
            #{{ formatNumber(chainState.blockNumber) }}
          </a>
        </div>
        <div class="lastFinalizedBlock">
          <a :href="`https://kusama.polkastats.io/block?blockNumber=${chainState.blockNumberFinalized}`" v-b-tooltip.hover title="Finalized block" target="_blank">
            #{{ formatNumber(chainState.blockNumberFinalized) }}
          </a>
        </div>
      </div>
    </div>
    <!-- Mobile -->
    <div class="pulse-mobile d-block d-md-none d-lg-none">
      <div class="rings">
        <div class="day" v-b-tooltip.hover title="Daily progress, 4 eras / day in Kusama" v-bind:style="{boxShadow:`0px 0px ${animatedShadow}px ${animatedShadow}px rgba(230,0,122,.4)`}">
          <input class="knob day" data-min="0" data-max="14400" data-readOnly="true" data-bgColor="#333" data-fgColor="#e6007a" data-displayInput=false data-width="380" data-height="380" data-thickness=".15">
        </div>
        <div class="era" v-b-tooltip.hover :title="`Era progress, current era index is #${chainState.currentEra}`">
          <input class="knob era" data-min="0" data-max="3600" data-readOnly="true" data-bgColor="#333" data-fgColor="#ec5aa7" data-displayInput=false data-width="310" data-height="310" data-thickness=".32">
        </div>
        <div class="session" v-b-tooltip.hover :title="`Session progress, current session index is #${chainState.currentIndex}`">
          <input class="knob session" data-min="0" data-max="600" data-readOnly="true" data-bgColor="#333" data-fgColor="#c1f85e" data-displayInput=false data-width="200" data-height="200" data-thickness=".2">
        </div>
        <div class="block" v-b-tooltip.hover title="Block time">
          <input class="knob block" data-min="0" data-max="6000" data-readOnly="true" data-bgColor="#333" data-fgColor="#67f156" data-displayInput=false data-width="150" data-height="150" data-thickness=".05">
        </div>
        <div class="lastBlock">
          <a :href="`https://kusama.polkastats.io/block?blockNumber=${chainState.blockNumber}`" v-b-tooltip.hover title="Current block" target="_blank">
            #{{ chainState.blockNumber }}
          </a>
        </div>
        <div class="lastFinalizedBlock">
          <a :href="`https://kusama.polkastats.io/block?blockNumber=${chainState.blockNumberFinalized}`" v-b-tooltip.hover title="Finalized block" target="_blank">
            #{{ formatNumber(chainState.blockNumberFinalized) }}
          </a>
        </div>
      </div>
    </div>

    <b-row id="legend">
      <b-col id="session-legend">
        <div id="session-color"></div> SESSION PROGRESS {{ formatNumber(chainState.sessionProgress) }} / {{ formatNumber(chainState.sessionLength) }}
      </b-col>
      <b-col id="era-legend">
        <div id="era-color"></div> ERA PROGRESS {{ formatNumber(chainState.eraProgress) }} / {{ formatNumber(chainState.eraLength) }}
      </b-col>
      <b-col id="day-legend">
        <div id="day-color"></div> DAY PROGRESS {{ formatNumber(chainState.dayProgress) }} / {{ formatNumber(chainState.eraLength * 4) }}
      </b-col>
    </b-row>
  </div>
</template>

<script>
// import gql from 'graphql-tag'
import { TweenLite } from "gsap";
const { ApiPromise, WsProvider } = require('@polkadot/api');
import { BigNumber } from "bignumber.js";

export default {
  name: 'Pulse',
  data: function () {
    return {
      chainState: {
        dayProgress: 0,
        blockNumber: 0,
        blockNumberFinalized: 0,
      },
      blockTime: 0,
      blockTimeTimeout: undefined,
      numEvents: 0,
      tweenedEvents: 0
    }
  },
  computed: {
    animatedShadow: function() {
      return this.tweenedEvents.toFixed(0);
    }
  },
  watch: {
    numEvents: function(newValue) {
      TweenLite.to(this.$data, 0.5, { tweenedEvents: newValue });
    }
  },
  async created() {
    const provider = new WsProvider('wss://kusama-rpc.polkadot.io');
    const api = await ApiPromise.create({ provider });
    await api.rpc.chain.subscribeNewHeads(async (header) => {
      const progress = await api.derive.session.progress();
      console.log(`Chain is at block: #${header.number}`);
      console.log(`Progress: ${JSON.stringify(progress, null, 2)}`);

      const blockNumber = header.number;

      const finalizedBlockHash = await api.rpc.chain.getFinalizedHead();
      const finalizedBlockHeader = await api.rpc.chain.getHeader(finalizedBlockHash);
      const blockNumberFinalized = finalizedBlockHeader.number.toNumber();

      const blockHash = await api.rpc.chain.getBlockHash(blockNumber);

      const blockEvents = await api.query.system.events.at(blockHash);

      this.numEvents = blockEvents.length  * 20;
      
      const currentEra = new BigNumber(progress.currentEra).toNumber(10);
      const eraProgress = new BigNumber(progress.eraProgress).toNumber(10);
      const dayProgress = (((parseInt(currentEra) % 4) * 3600) + parseInt(eraProgress));

      this.$gtag.event('pulse', { method: 'newBlock' })
      const $session = window.$(".session");
      const $era = window.$(".era");
      const $day = window.$(".day");
      const $block = window.$(".block");

      this.chainState = {
        blockNumber,
        blockNumberFinalized,
        ...progress,
        dayProgress
      }
      
      console.log(`chainState: ${JSON.stringify(this.chainState, null, 2)}`);

      $session.val(this.chainState.sessionProgress).trigger("change");
      $era.val(this.chainState.eraProgress).trigger("change");
      $day.val(this.chainState.dayProgress).trigger("change");

      this.blockTime = 0;
      clearInterval(this.blockTimeTimeout);
      this.blockTimeTimeout = setInterval(() => {
        this.blockTime += 50
        $block.val(this.blockTime).trigger("change");
      }, 50)



    });
  },
  mounted() {
    window.$(".knob").knob();
  },
  methods: {
    formatNumber: function(number) {
      return number ? number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") : 0;
    }
  }
}
</script>

<style scoped>
/* Global */
input {
  display: none;
}
a {
  text-decoration: none !important;
  font-weight: 100;
}

/* Desktop */
.pulse {
  height: 550px;
  width: 100%;
}
.pulse .rings {
  position: relative;
  width: 500px;
  margin: 60px auto;
}
.pulse .rings .day {
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 50%;
}
.pulse .rings .era {
  position: absolute;
  left: 85px;
  top: 85px;
}
.pulse .rings .session {
  position: absolute;
  left: 163px;
  top: 163px;
}
.pulse .rings .block {
  position: absolute;
  left: 188px;
  top: 188px;
}
.pulse .lastBlock a {
  font-size: 22px;
  text-align: center;
  color: #f9f9f9;
  position: absolute;
  top: 242px;
  left: 180px;
  width: 162px;
}
.pulse .lastFinalizedBlock a {
  font-size: 14px;
  text-align: center;
  color: #ec76b5;
  position: absolute;
  top: 280px;
  left: 180px;
  width: 162px;
  font-weight: 400;
}

/* Mobile  */
.pulse-mobile {
  height: 420px;
  width: 100%;
}
.pulse-mobile .rings {
  position: relative;
  width: 400px;
  margin: 50px auto;
}
.pulse-mobile .rings .day {
  position: absolute;
  left: 0;
  top: 10px;
  border-radius: 50%;
}
.pulse-mobile .rings .era {
  position: absolute;
  left: 35px;
  top: 45px;
}
.pulse-mobile .rings .session {
  position: absolute;
  left: 90px;
  top: 100px;
}
.pulse-mobile .rings .block {
  position: absolute;
  left: 115px;
  top: 125px;
}
.pulse-mobile .lastBlock a {
  font-size: 22px;
  text-align: center;
  color: #f9f9f9;
  position: absolute;
  top: 180px;
  left: 110px;
  width: 162px;
}
.pulse-mobile .lastFinalizedBlock a {
  font-size: 14px;
  text-align: center;
  color: #ec76b5;
  position: absolute;
  top: 215px;
  left: 110px;
  width: 162px;
  font-weight: 400;
}

/* Legend */
#legend {
  color: white;
}
#day-legend,
#era-legend,
#session-legend {
  display: inline-block;
  margin: 0 1rem;
}
#day-color,
#era-color,
#session-color {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 1rem;
}
#day-color {
  background: #e6007a;
}
#era-color {
  background: #ec5aa7;
}
#session-color {
  background: #c1f85e;
}
</style>