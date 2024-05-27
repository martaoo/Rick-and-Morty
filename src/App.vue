<template>
  <div id="app">
    <!-- Sidebar -->
    <Sidebar />
    
    <!-- Main content area -->
    <div class="main-content">
      <router-view />
    </div>
    
    <!-- Footer -->
    <footer class="text-center p-4 bg-gray-800 text-white">
      <p>© 2024 Rick and Morty Fan Site. All rights reserved.</p>
      <p>
        <a href="https://github.com/martaoo" target="_blank" class="text-blue-400"><strong>GitHub</strong></a><br>
        <a href="https://www.figma.com/design/jCSsFcSlBhW8oylp0ls4UB/Untitled?m=auto&t=SigQnydV2R42Tnvf-6" target="_blank" class="text-blue-400"><strong>Figma</strong></a>
      </p>
    </footer>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'; // Import Sidebar component

export default {
  name: 'App',
  components: {
    Sidebar, // Register Sidebar component
  },
};
</script>

<style>
#app {
  position: relative;
}

.main-content {
  margin-left: 250px; /* Adjust sidebar width */
  padding: 20px; /* Add padding to main content area */
}

footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  color: black;
}
</style>
