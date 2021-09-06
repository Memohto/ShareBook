<template>
  <div>
    <div>
      <b-navbar type="light" variant="warning">
        <a href="/"><img class="mx-4" src="./assets/logo.png" width="200" alt="an image of borregos" /></a>
      </b-navbar>
    </div>
    <!-- <Login msg="Welcome to Your Vue.js App"/>  -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Barra',
  data() {
    return {
      
    }
  },
  methods: {
    
  },
  mounted() {
    this.username = "Memo";
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
