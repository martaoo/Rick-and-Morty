import { createApp, provide, h } from 'vue';
import App from './App.vue';
import router from './router';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';
import '@splidejs/vue-splide/css';

import './style.css'; // Tailwind CSS

const apolloClient = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
  
});

createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
}).use(router).mount('#app');
