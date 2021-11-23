<template>
  <b-container>
    <b-row v-if="bookResults.length">
      <b-col md="6" class="p-2" v-for="(b, i) in bookResults" :key="i">
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
    <div v-else class="text-center mt-5">
      <h5>No se encontraron resultados. <b style="cursor:pointer;" @click="stopSearch">Regresar al catálogo</b></h5> 
    </div>
  </b-container>
</template>

<script>
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

import Book from "@/components/Book.vue";

export default {
  name: 'BookSearch',
  components: {
    Book
  },
  data() {
    return {
      byName: [],
      byOthers: []
    }
  },
  props: {
    value: String,
    costFilter: Boolean,
    selectedCondition: String,
    selectedGenre: String
  },
  computed: {
    bookResults() {
      let res = [];
      res = res.concat(this.byName);
      res = res.concat(this.byOthers);
      if(this.costFilter) res.sort((a, b) => a.credits - b.credits);
        
      return res;
    }
  },
  methods: {
    stopSearch() {
      this.$emit('searchStoped');
    },
    filterByOthers(docs) {
      let res = docs;
      if(this.selectedCondition == 'Ninguno' && this.selectedGenre == 'Ninguno') return res;

      if(this.selectedCondition != 'Ninguno') {
        res = res.filter(d => d.condition == this.selectedCondition);
      }

      if(this.selectedGenre != 'Ninguno') {
        res = res.filter(d => d.genre == this.selectedGenre);
      }

      return res;
    }
  },
  async mounted() {
    try {
      const userEmail = firebase.auth().currentUser.email;
      let bookRef = firebase.firestore().collection('books');
      if(this.value) {
        let allBooks = await bookRef.get();
        this.byName = allBooks.docs.map(b => {
          let data = b.data();
          if(data.title.toLowerCase().includes(this.value.toLowerCase()) ||
          data.author.toLowerCase().includes(this.value.toLowerCase())) {
            return {
              id: b.id,
              ...data
            }
          }
        }).filter(Boolean);
      } else {
        if(this.selectedCondition == 'Ninguno' && this.selectedGenre == 'Ninguno') {
          this.stopSearch();
          return;
        }

        let query = bookRef;
        if(this.selectedCondition != 'Ninguno') {
          query = query.where('condition', '==', this.selectedCondition);
        }
        if(this.selectedGenre != 'Ninguno') {
          query = query.where('genre', '==', this.selectedGenre);
        }

        await query.where('owner', '!=', userEmail).get()
          .then((querySnapshot) => {
            this.byOthers = querySnapshot.docs.map(d => {
              return {
                id: d.id,
                ...d.data()
              }
            });
          })
      }
    } catch(err) {
      console.error(err);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
