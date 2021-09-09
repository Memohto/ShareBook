<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="warning">

      <b-navbar-brand>
        <router-link class="link" to="/"> 
          <img class="mx-4" src="@/assets/logo.png" width="200" alt="an image of borregos" /> 
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>

        <b-navbar-nav style="margin-left:auto" v-if="showNavbar">
          <b-nav-item right> 
            <router-link class="link" to="/"> Catálogo </router-link> 
          </b-nav-item>
          <b-nav-item href="#" right> Solicitudes </b-nav-item>
          <b-nav-item-dropdown :text="email" right>
            <b-dropdown-item @click="$router.push('/perfil')"> Mi Perfil </b-dropdown-item>
            <b-dropdown-item @click="signOut"> Cerrar sesión </b-dropdown-item>
          </b-nav-item-dropdown>

        </b-navbar-nav>
      </b-collapse>

    </b-navbar>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'Navbar',
  data() {
    return {
      isAuthenticated: false
    }
  },
  computed: {
    showNavbar() {
      return this.isAuthenticated && this.$route.name !== 'Login' && this.$route.name !== 'UserRegistration';
    },
    email() {
      return this.$_.get(firebase.auth().currentUser, 'email');
    }
  },
  methods: {
    signOut(){
      firebase.auth().signOut()
        .then(() => {
          this.$router.push('/login');
        })
        .catch((err) => {
          alert(err.message);
        })
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.isAuthenticated = user ? true : false;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .link {
    color: inherit;
    text-decoration: none;
  }
</style>
