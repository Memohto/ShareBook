<template>
  <div>
    <div>
      <b-navbar type="light" variant="warning">
        <a href="/"><img class="mx-4" src="./assets/logo.png" width="200" alt="an image of borregos" /></a>
      </b-navbar>
    </div>
    <Login msg="Welcome to Your Vue.js App"/>  
    <router-view/>
  </div>
</template>

<script>

  //import Login  from '@/components/MiPerfil.vue'
export default {
  name: 'App',
  /*components: {
    Login
  }*/
}
</script>

<style>
  
</style>
