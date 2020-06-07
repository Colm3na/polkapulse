# Polka Pulse

## Kusama network activity visualizer

This project participate in [Polkadot Launch Bounty](https://gitcoin.co/issue/Web3Foundation/build-polkadot/1/4391).

Live demo: https://polkapulse.polkastats.io

![Polka Pulse](public/polkapulse.png?raw=true "Polka Pulse")

It shows (from inside to outside) session, era and day progress. Also show current block height and last finalized block.

We are using Kusama instead Polkadot cause Polkadot is currently in PoA mode so there's no era change by now.

The circle outside shadow/blur is dinamic and depends on the number of events included in the last block. That way you can visualize the network
activity with a nice heartbeat.

Polka Pulse was built using [PolkaStats Backend V3](https://github.com/Colm3na/polkastats-backend-v3) graphql API to easily fetch the live chain data.

### Try it out

You'll need a PolkaStats Backend V3 API instance already running.

Clone the repo:

```
git clone https://github.com/Colm3na/polkapulse.git
cd polkapulse
yarn
```

Edit `app/main.js`, in line 4 and 19 enter the full PolkaStats Backend V3 API http and websocket URLS:

```
const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'POLKASTATS_BACKEND_HTTP_GRAPHQL_ENDPOINT',
})

// Create the subscription websocket link
const wsLink = new WebSocketLink({
  uri: 'POLKASTATS_BACKEND_WS_GRAPHQL_ENDPOINT',
  options: {
    reconnect: true,
  },
})
```

Then run development server:

```
yarn serve
```

Or build for production:

```
yarn build
```