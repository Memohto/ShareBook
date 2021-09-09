<template>
  <div>
    <Navbar/>
    <!-- <Login msg="Welcome to Your Vue.js App"/>   -->
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
// import Login  from '@/components/MiPerfil.vue;'



export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
  
</style>
