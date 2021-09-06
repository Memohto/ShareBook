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
          v-model="email"
          id="email-input"
          placeholder="Ej. juan25@provider.com"
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

      <p class="my-4">¿No tienes una cuenta? <router-link to='/register'>Registrarse</router-link></p>

    </div>
  </b-container>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async onSubmit() {
      alert(`Usuario: ${this.username}, Contraseña: ${this.password}`)
      try{
        const val = await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
        console.log(val);
        this.$router.replace({name: "home"});
      }catch(err){
        console.log(err);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

