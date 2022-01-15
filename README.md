# Polka Pulse

## Kusama network activity visualizer

This project participate in [Polkadot Launch Bounty](https://gitcoin.co/issue/Web3Foundation/build-polkadot/1/4391).

Live demo: https://polkapulse.polkastats.io

![Polka Pulse](public/polkapulse.png?raw=true "Polka Pulse")

It shows (from inside to outside) block time, session progress, era progress and day progress. Also show current block height and last finalized block.

We are using Kusama instead Polkadot cause Polkadot is currently in PoA mode so there's no era change by now.

The circle outside shadow/blur is dinamic and depends on the number of events included in the last block. That way you can visualize the network
activity with a nice heartbeat.

### Try it out

Clone the repo:

```
git clone https://github.com/Colm3na/polkapulse.git
cd polkapulse
yarn
```

Then run development server:

```
yarn serve
```

Or build for production:

```
yarn build
```