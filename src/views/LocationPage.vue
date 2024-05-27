<template>
  <div class="container mx-auto p-4">
    <div v-if="loading">Loading...</div>
    <div v-if="error" class="text-red-500">Error: {{ error.message }}</div>
    <div v-else-if="location">
      <h1 class="text-2xl font-bold mb-4">{{ location.name }}</h1>
      <p><strong>Type:</strong> {{ location.type }}</p>
      <p><strong>Dimension:</strong> {{ location.dimension }}</p>
      <p><strong>Created:</strong> {{ location.created }}</p>
  
      <h2 class="text-xl font-semibold mb-2 mt-4">Residents</h2>
      <ul>
        <li v-for="resident in location.residents" :key="resident.id" class="mb-4 flex items-center">
          <img :src="resident.image" alt="Resident Image" class="w-16 h-16 rounded-full mr-4">
          <div>
            <router-link :to="{ name: 'Character', params: { id: resident.id }}" class="block font-semibold">{{ resident.name }}</router-link>
            <p><strong>Status:</strong> {{ resident.status }}</p>
            <p><strong>Species:</strong> {{ resident.species }}</p>
            <p><strong>Gender:</strong> {{ resident.gender }}</p>
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

const GET_LOCATION_DETAILS = gql`
  query getLocation($id: ID!) {
    location(id: $id) {
      id
      name
      type
      dimension
      created
      residents {
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
    const location = ref(null);
    const { result, loading, error } = useQuery(GET_LOCATION_DETAILS, { id: route.params.id });

    watchEffect(() => {
      if (result.value) {
        location.value = result.value.location;
      }
    });

    return {
      location,
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
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}
img {
  margin-right: 1rem;
}
</style>
