import Vue from 'vue'
import App from './App.vue'
// import { ApolloClient } from 'apollo-client'
// import { HttpLink } from 'apollo-link-http'
// import { InMemoryCache } from 'apollo-cache-inmemory'
// import { split } from 'apollo-link'
// import { WebSocketLink } from 'apollo-link-ws'
// import { getMainDefinition } from 'apollo-utilities'
// import VueApollo from 'vue-apollo'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueGtag from "vue-gtag";

Vue.use(VueGtag, {
  config: { id: "UA-169023180-1" }
});
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// const httpLink = new HttpLink({
//   // You should use an absolute URL here
//   uri: 'https://kusama.polkastats.io/api/v3',
// })

// // Create the subscription websocket link
// const wsLink = new WebSocketLink({
//   uri: 'wss://kusama.polkastats.io/api/v3',
//   options: {
//     reconnect: true,
//   },
// })

// // using the ability to split links, you can send data to each link
// // depending on what kind of operation is being sent
// const link = split(
//   // split based on operation type
//   ({ query }) => {
//     const definition = getMainDefinition(query)
//     return definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//   },
//   wsLink,
//   httpLink
// )

// // Create the apollo client
// const apolloClient = new ApolloClient({
//   link,
//   cache: new InMemoryCache(),
//   connectToDevTools: true,
// })

// const apolloProvider = new VueApollo({
//   defaultClient: apolloClient,
// })

// // Install the vue plugin like before
// Vue.use(VueApollo)

new Vue({
  // apolloProvider: apolloProvider,
  render: h => h(App)
}).$mount('#app')
