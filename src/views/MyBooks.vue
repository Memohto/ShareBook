<template>
  <div>
    <b-row>
      <b-col md="6" class="p-2" v-for="(b, i) in userBooks" :key="i">
        <Book 
          :image="b.photo" 
          :title="b.title" 
          :author="b.author" 
          :credits="b.credits"
          :condition="b.condition"
          :genre="b.genre"
          :uploaded="b.uploadedAt"
          :isMine="true"
        />  
      </b-col>
    </b-row>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import Book from '@/components/Book.vue';

export default {
  name: 'MyBooks',
  components: {
    Book
  },
  data() {
    return {
      userBooks: []
    }
  },
  computed: {
    userEmail() {
      return firebase.auth().currentUser.email;
    }
  },
  async mounted() {
    try {
      const bookInfo = await firebase.firestore().collection('books').where('owner', '==', this.userEmail).get()
      this.userBooks = bookInfo.docs.map(d => d.data());
    } catch(err) {
      console.error(err);
    }
  }
} 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
