<template>
  <div>
    <b-row>
      <b-col md="3" class="p-2" v-for="(b, i) in [1, 2, 3, 4, 5, 6, 7]" :key="i">
        <Book 
          image="https://t2.up.ltmcdn.com/es/images/5/4/8/cien_anos_de_soledad_resumen_corto_3845_600_square.jpg" 
          title="Cien años de soledad" 
          author="Gabriel García Márquez" 
          credits="200"
          condition="Usado"
          uploaded="08/09/2021"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Book from '@/components/Book.vue';
export default {
  name: 'MyBooks',
  components: {
    Book
  },
  data() {
    return {
    }
  }
} 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
