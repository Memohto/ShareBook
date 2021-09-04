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
      <div class="my-3" style="width:50%">
        <b-form @submit.prevent="onSubmit">

          <b-form-group label-cols="4" label="Nombre y apellido" label-for="name-input">
            <b-form-input
              v-model="fullName"
              id="name-input"
              placeholder="Eg. Daniel Pérez"
              required
            ></b-form-input>
          </b-form-group>
          
          <b-form-group label-cols="4" label="Correo electrónico" label-for="email-input">
            <b-form-input
              v-model="email"
              id="email-input"
              placeholder="Ej. juan25@provider.com"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group label-cols="4" label="Teléfono" label-for="phone-input">
            <b-form-input
              v-model="phone"
              id="phone-input"
              type="tel"
              placeholder="Ej. 9933334444"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group label-cols="4" label="Usuario" label-for="username-input">
            <b-form-input
              v-model="username"
              id="username-input"
              placeholder="Ingresa tu usuario"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group label-cols="4" label="Contraseña" label-for="password-input">
            <b-form-input 
              v-model="password"
              id="password-input" 
              type="password"
              placeholder="Ingresa tu contraseña"
            ></b-form-input>
          </b-form-group>

          <b-form-group label-cols="4" label="Confirmar contraseña" label-for="confirm-password-input">
            <b-form-input 
              v-model="confirmPassword"
              id="confirm-password-input" 
              type="password"
              placeholder="Confirma tu contraseña"
            ></b-form-input>
          </b-form-group>

          <b-form-group label-cols="4" label="Imagen (Opcional)" label-for="image-input">
            <b-form-file 
              v-model="photo"
              id="image-input"
              plain
            ></b-form-file>
          </b-form-group>

          <b-button style="margin-right:5px" @click="$router.push('./login')">Cancelar</b-button>
          <b-button class="my-5" variant="success" type="submit">Registrarse</b-button>
          
        </b-form>
      </div>
    </b-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      fullName: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      confirmPassword: '',
      photo: null,
      errors: {},
      dismissSecs: 10,
      dismissCountDown: 0
    }
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    validate() {
      this.errors = {};
      let valid = true;

      // E-mail validation
      const mailRegex = new RegExp(/^\S+@\S+\.\S+$/);
      if(!mailRegex.test(this.email)) {
        this.errors['E-mail'] = 'El formato del correo ingresado es incorrecto.';
        valid = false;
      }

      // Phone validation
      const phoneRegex = new RegExp(/^[0-9]{10}$/);
      if(!phoneRegex.test(this.phone)) {
        this.errors['Teléfono'] = 'El formato del teléfono ingresado es incorrecto.';
        valid = false;
      }

      // Password validation
      if(this.password !== this.confirmPassword) {
        this.errors['Contraseña'] = 'Las contraseñas no coinciden.';
        valid = false;
      }

      return valid;
    },
    onSubmit() {
      const valid = this.validate();
      if(valid) {
        alert(`Usuario: ${this.username} creado`);
        this.$router.push('/login');
      } else {
        this.dismissCountDown = this.dismissSecs;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>