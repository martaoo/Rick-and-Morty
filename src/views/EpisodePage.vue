<template>
  <div class="container mx-auto p-4">
    <div v-if="loading">Loading...</div>
    <div v-if="error" class="text-red-500">Error: {{ error.message }}</div>
    <div v-else-if="episode">
      <h1 class="text-2xl font-bold mb-4">{{ episode.name }}</h1>
      <p><strong>Air Date:</strong> {{ episode.air_date }}</p>
      <p><strong>Episode:</strong> {{ episode.episode }}</p>
      <p><strong>Created:</strong> {{ episode.created }}</p>
  
      <h2 class="text-xl font-semibold mb-2 mt-4">Characters in this Episode</h2>
      <ul>
        <li v-for="character in episode.characters" :key="character.id" class="mb-4 flex items-center">
          <img :src="character.image" alt="Character Image" class="w-16 h-16 rounded-full mr-4">
          <div>
            <p><strong>Name:</strong> {{ character.name }}</p>
            <p><strong>Status:</strong> {{ character.status }}</p>
            <p><strong>Species:</strong> {{ character.species }}</p>
            <p><strong>Gender:</strong> {{ character.gender }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const GET_EPISODE_DETAILS = gql`
  query getEpisode($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      created
      characters {
        id
        name
        status
        species
        gender
        image
      }
    }
  }
`;

export default {
  setup() {
    const route = useRoute();
    const episode = ref(null);

    // Correctly set the id variable from the route params
    const { result, loading, error } = useQuery(GET_EPISODE_DETAILS, () => ({
      id: route.params.id
    }));

    watchEffect(() => {
      if (result.value) {
        episode.value = result.value.episode;
      }
    });

    return {
      episode,
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
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}
img {
  margin-right: 1rem;
}
</style>
