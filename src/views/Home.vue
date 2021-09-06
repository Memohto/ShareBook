<template lang="">
  <div>
        <div>
      <b-navbar type="light" variant="warning">
        <button @click="signOut">Sign Out</button>
      </b-navbar>
    </div>
    Contenido Principal
  </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default {
  data(){
    return{
    }
  },
  methods: {
    async signOut(){
      try{
        const data = await firebase.auth().signOut();
        console.log(data);
        this.$router.replace({name: "login"});
      }catch(err){
        console.log(err);
      } 
    }
  }
}
</script>
<style lang="">
  
</style>