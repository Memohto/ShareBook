<template>
  <div>
    <b-row>
      <b-col md="6" class="p-2" v-for="(b, i) in books" :key="i">
        <Book 
          :id="b.id"
          :image="b.photo" 
          :title="b.title" 
          :author="b.author" 
          :owner="b.owner"
          :credits="b.credits"
          :condition="b.condition"
          :genre="b.genre"
          :uploaded="b.uploadedAt"
          :isMine="false"
        />  
      </b-col>
    </b-row>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import Book from "@/components/Book.vue";

export default {
  name: 'BookCarousel',
  components: {
    Book
  },
  data() {
    return {
      books: []
    }
  },
  props: {
    genre: String,
  },
  async mounted() {
    const userEmail = firebase.auth().currentUser.email;
    const bookInfo = await firebase.firestore().collection('books')
      .where('genre', '==', this.genre)
      .where('owner', '!=', userEmail)
      .limit(2).get();
    this.books = bookInfo.docs.map(d => {
      return {
        id: d.id,
        ...d.data()
      } 
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
