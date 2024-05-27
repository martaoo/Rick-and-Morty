import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Contact from './views/Contact.vue';
import EpisodePage from './views/EpisodePage.vue';
import CharacterPage from './views/CharacterPage.vue';
import LocationPage from './views/LocationPage.vue';


const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/episode/:id', name: 'Episode', component: EpisodePage,props:true },
  { path: '/character/:id', name: 'Character', component: CharacterPage,props:true },
  { path: '/location/:id', name: 'Location', component: LocationPage,props:true },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

