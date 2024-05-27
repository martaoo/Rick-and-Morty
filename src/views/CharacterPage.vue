<template>
  <div class="container mx-auto p-4">
    <div v-if="loading">Loading...</div>
    <div v-if="error" class="text-red-500">Error: {{ error.message }}</div>
    <div v-else-if="character">
      <h1 class="text-2xl font-bold mb-4">{{ character.name }}</h1>
      <img :src="character.image" alt="Character Image" class="w-32 h-32 rounded-full mb-4">
      <p><strong>Status:</strong> {{ character.status }}</p>
      <p><strong>Species:</strong> {{ character.species }}</p>
      <p><strong>Gender:</strong> {{ character.gender }}</p>
  
      <h2 class="text-xl font-semibold mb-2 mt-4">Episodes</h2>
      <ul>
        <li v-for="episode in character.episode" :key="episode.id">
          <router-link :to="{ name: 'Episode', params: { id: episode.id }}">{{ episode.name }}</router-link> - {{ episode.air_date }}
        </li>
      </ul>
  
      <h2 class="text-xl font-semibold mb-2 mt-4">Last Known Location</h2>
      <p v-if="character.location">
        <router-link :to="{ name: 'Location', params: { id: character.location.id }}">{{ character.location.name }}</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const GET_CHARACTER_DETAILS = gql`
  query getCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      image
      episode {
        id
        name
        air_date
        episode
        created
      }
      location {
        id
        name
      }
    }
  }
`;

export default {
  setup() {
    const route = useRoute();
    const character = ref(null);
    const { result, loading, error } = useQuery(GET_CHARACTER_DETAILS, { id: route.params.id });

    watchEffect(() => {
      if (result.value) {
        character.value = result.value.character;
      }
    });

    return {
      character,
      loading,
      error,
    };
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 0.5rem;
}
img {
  display: block;
  margin-bottom: 1rem;
}
</style>
