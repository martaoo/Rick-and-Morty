<template>
  <div class="container mx-auto p-4">
    <header class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold"><strong>Welcome to Rick and Morty TV Show</strong></h1>
      
    </header>

    <!-- Carousel and Other Components -->
    <Carousel />
    <About />
    <Description />
    <Genre />
    <Creators />
    <Stars />
    <Rating />

    <div v-if="loading" class="mt-4">Loading...</div>
    <div v-if="error" class="mt-4 text-red-500">Error: {{ error.message }}</div>
    <div v-else>
      <!-- Episodes Section -->
      <h2 class="text-xl font-semibold mb-2 mt-4">Episodes</h2>
      <ul>
        <li v-for="episode in episodes" :key="episode.id">
          <router-link :to="{ name: 'Episode', params: { id: episode.id }}">{{ episode.name }}</router-link>
        </li>
      </ul>

      <!-- Characters Section -->
      <h2 class="text-xl font-semibold mb-2 mt-4">Characters</h2>
      <ul>
        <li v-for="character in characters" :key="character.id">
          <router-link :to="{ name: 'Character', params: { id: character.id }}">{{ character.name }}</router-link>
        </li>
      </ul>

      <!-- Locations Section -->
      <h2 class="text-xl font-semibold mb-2 mt-4">Locations</h2>
      <ul>
        <li v-for="location in locations" :key="location.id">
          <router-link :to="{ name: 'Location', params: { id: location.id }}">{{ location.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

// Importing existing components
import Carousel from '../components/Carousel.vue';
import About from '../views/About.vue';
import Description from '../components/Description.vue';
import Genre from '../components/Genre.vue';
import Creators from '../components/Creators.vue';
import Stars from '../components/stars.vue';
import Rating from '../components/Rating.vue';

// GraphQL Query
const GET_HOME_DATA = gql`
  query {
    episodes {
      results {
        id
        name
      }
    }
    characters {
      results {
        id
        name
        image
      }
    }
    locations {
      results {
        id
        name
      }
    }
  }
`;

export default {
  components: {
    Carousel,
    About,
    Description,
    Genre,
    Creators,
    Stars,
    Rating,
  },
  setup() {
    const { result, loading, error } = useQuery(GET_HOME_DATA);
    const episodes = ref([]);
    const characters = ref([]);
    const locations = ref([]);

    watchEffect(() => {
      if (result.value) {
        const data = result.value;
        episodes.value = data.episodes.results;
        characters.value = data.characters.results;
        locations.value = data.locations.results;
      }
    });

    return {
      episodes,
      characters,
      locations,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
/* Scoped styles for Home.vue component */

/* Style for navigation links */
.nav-link {
  margin-left: 20px; /* Adjust margin as needed */
  font-size: 18px; /* Adjust font size as needed */
  text-decoration: none; /* Remove default underline */
  color: blue; /* Change link color */
}

/* Hover effect for navigation links */
.nav-link:hover {
  color: brown; /* Change color on hover */
}
.text-2xl {
  font-size: 40px;
  color: black;
}
.text-xl {
  font-size:30px;
  color:red
}
.text-xl:hover{
  color:black
}
.container {
  margin: 0 auto;
  padding: 20px;
}
</style>
