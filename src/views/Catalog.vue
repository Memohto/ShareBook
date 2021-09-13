<template>
  <b-container>
    <div v-for="g in genres" :key="g">
      <h3 class="mt-4">{{g}}</h3>
      <hr/>
      <BookCarousel :genre="g"/>
    </div>
  </b-container>
</template>

<script>
import globals from '@/globals.js';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import BookCarousel from "@/components/BookCarousel.vue";

export default {
  name: 'Catalog',
  components: {
    BookCarousel
  },
  computed: {
    userEmail() {
      return firebase.auth().currentUser.email;
    },
    conditions() {
      return this.$_.cloneDeep(globals.book.conditions);
    },
    genres() {
      return this.$_.cloneDeep(globals.book.genres);
    }
  }
}
</script>

<style scoped>
</style>