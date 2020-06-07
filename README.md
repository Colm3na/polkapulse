# Polka Pulse

## Kusama network activity visualizer

[Polka Pulse](polkapulse.png)

It shows (from inside to outside) session, era and day progress. Also show current block height and last finalized block.

Built using PolkaStats Backend V3 graphql API to fetch chain data.


### Try it out

You'll need a PolkaStats Backend V3 API instance already running.

Clone the repo:

```
git clone https://github.com/Colm3na/polkapulse.git
cd polkapulse
yarn
```

Edit `app/main.js`, in line 19 enter the full PolkaStats Backend V3 API websocket URL:

```
// Create the subscription websocket link
const wsLink = new WebSocketLink({
  uri: 'wss://POLKASTATS_BACKEND_GRAPHQL_ENDPOINT',
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