<template>
  <div class="father" >  
      <Navbar />
      <router-view/>
  </div>
</template>

<script>

import Navbar from "@/components/Navbar";

export default {
  components: {
    Navbar
  }
}
</script>

<style scoped>
  .father{
    display: grid; 
    grid-template-columns: 1fr 11fr;
  }
</style>