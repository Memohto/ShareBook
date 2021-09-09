<template>
  <b-container>
    <b-alert
      :show="dismissCountDown"
      variant="danger"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <ul>
        <li v-for="(e, i) in Object.keys(errors)" :key="i">
          {{e + ": " + errors[e]}}
        </li>
      </ul>
    </b-alert>

    <b-col md="4" lg="3" class="mx-auto text-center" style="margin-top:8%">

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

      <p class="my-4">¿No tienes una cuenta? <router-link to='/registro'>Registrarse</router-link></p>

    </b-col>
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
      errors: {},
      dismissSecs: 10,
      dismissCountDown: 0
    }
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    onSubmit() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push('/');
        })
        .catch(err => {
          console.error(err);
          this.errors['Error'] = err.message;
          this.dismissCountDown = this.dismissSecs;
        })
    }
  }
}
</script>

