<template>
  <b-container>
    <div class="mx-auto text-center" style="width:25%; margin-top:8%">

      <img 
        class="my-3"
        style="width:150px; height:100px"
        alt="ShareBook logo" 
        src="@/assets/logoConLetras.png"
      />

      <b-form @submit.prevent="onSubmit">
        <b-form-input
          class="my-3"
          v-model="username"
          placeholder="Usuario"
          required
        ></b-form-input>
        
        <b-form-input
          class="my-3"
          v-model="password"
          type="password" 
          placeholder="Contraseña"
          required
        ></b-form-input>
       
        <b-button 
          class="my-3" 
          type="submit" 
          variant="success"
        >
          Iniciar sesión
        </b-button>
      </b-form>

      <p class="my-4">¿No tienes una cuenta? <router-link to='/registration'>Registrarse</router-link></p>

    </div>
  </b-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    onSubmit() {
      alert(`Usuario: ${this.username}, Contraseña: ${this.password}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
