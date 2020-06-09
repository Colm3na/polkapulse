<template>
  <div>
    <div class="pulse">
      <div class="rings">
        <div class="day" title="Daily progress, 4 eras / day in Kusama" v-bind:style="{boxShadow:`0px 0px ${chainState.total_events * 20}px ${chainState.total_events * 5}px rgba(230,0,122,.4)`}">
          <input class="knob day" data-min="0" data-max="14400" data-readOnly="true" data-bgColor="#333" data-fgColor="#e6007a" data-displayInput=false data-width="500" data-height="500" data-thickness=".25">
        </div>
        <div class="era" title="Era progress">
          <input class="knob era" data-min="0" data-max="3600" data-readOnly="true" data-bgColor="#333" data-fgColor="#ec5aa7" data-displayInput=false data-width="350" data-height="350" data-thickness=".4">
        </div>
        <div class="session" title="Session progress">
          <input class="knob session" data-min="0" data-max="600" data-readOnly="true" data-bgColor="#333" data-fgColor="#c1f85e" data-displayInput=false data-width="194" data-height="194" data-thickness=".2">
        </div>
        <div class="block" title="Block time">
          <input class="knob block" data-min="0" data-max="6000" data-readOnly="true" data-bgColor="#333" data-fgColor="#c1f85e" data-displayInput=false data-width="144" data-height="194" data-thickness=".05">
        </div>
        <div class="lastBlock" title="Current block height">
          #{{ formatNumber(chainState.block_number) }}
        </div>
        <div class="lastFinalizedBlock" title="Last finalized block">
          #{{ formatNumber(chainState.block_number_finalized) }}
        </div>
      </div>
    </div>
    <div id="legend">
      <div id="session-legend">
        <div id="session-color"></div> SESSION PROGRESS {{ formatNumber(chainState.session_progress) }} / {{ formatNumber(chainState.session_length) }}
      </div>
      <div id="era-legend">
        <div id="era-color"></div> ERA PROGRESS {{ formatNumber(chainState.era_progress) }} / {{ formatNumber(chainState.era_length) }}
      </div>
      <div id="day-legend">
        <div id="day-color"></div> DAY PROGRESS {{ formatNumber(chainState.day_progress) }} / {{ formatNumber(chainState.era_length * 4) }}
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'Pulse',
  data: function () {
    return {
      chainState: {
        day_progress: 0
      },
      blockTime: 0,
      blockTimeTimeout: undefined,
    }
  },
  apollo: {
    $subscribe: {
      block: {
        query: gql`subscription block {
          block(limit: 1, order_by: {block_number: desc}) {
            block_number
            block_author
            block_author_name
            block_hash
            block_number_finalized
            current_era
            current_index
            era_length
            era_progress
            extrinsics_root
            is_epoch
            new_accounts
            num_transfers
            parent_hash
            session_length
            session_per_era
            session_progress
            spec_name
            spec_version
            state_root
            timestamp
            total_events
            validator_count
          }
        }`,
        result ({ data }) {
          const $session = window.$(".session");
          const $era = window.$(".era");
          const $day = window.$(".day");
          const $block = window.$(".block");

          const day_progress = (((parseInt(data.block[0].current_era) % 4) * 3600) + parseInt(data.block[0].era_progress));
          this.chainState = {
            ...data.block[0],
            day_progress
          }
          $session.val(this.chainState.session_progress).trigger("change");
          $era.val(this.chainState.era_progress).trigger("change");
          $day.val(this.chainState.day_progress).trigger("change");

          this.blockTime = 0;
          clearInterval(this.blockTimeTimeout);
          this.blockTimeTimeout = setInterval(() => {
            this.blockTime += 50
            $block.val(this.blockTime).trigger("change");
          }, 50)

        },
      }
    }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lastBlock {
  font-size: 22px;
  text-align: center;
  color: #f9f9f9;
  position: absolute;
  top: 242px;
  left: 180px;
  width: 162px;
}
.lastFinalizedBlock {
  font-size: 14px;
  text-align: center;
  color: #ec76b5;
  position: absolute;
  top: 280px;
  left: 180px;
  width: 162px;
  font-weight: 400;
}
.rings {
  position: relative;
  width: 500px;
  margin: 100px auto;
}
.rings .day {
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 50%;
}
.rings .era {
  position: absolute;
  left: 85px;
  top: 85px;
}
.rings .session {
  position: absolute;
  left: 163px;
  top: 163px;
}
.rings .block {
  position: absolute;
  left: 188px;
  top: 188px;
}
.pulse {
  height: 600px;
  width: 100%;
}
input {
  display: none;
}

#legend {
  color: white;
}

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