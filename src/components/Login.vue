<template>
  <div>
    <b-form @submit.prevent="printName">
      <label class="sr-only" for="username-input">Username</label>
      <b-form-input
        v-model="username"
        id="username-input"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Enter username"
      ></b-form-input>

      <label class="sr-only" for="password-input">Password</label>
      <b-form-input id="password-input" :type="inputType" placeholder="Enter password"></b-form-input>

      <b-button variant="success" type="submit">Login</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: "",
      arr: [1, 2, 3],
      show: false,
      inputType: "password"
    }
  },
  methods: {
    printName() {
      alert(this.username);
    }
  },
  mounted() {
    this.username = "Test";
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
