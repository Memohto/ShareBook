<template>
  <div>
    <b-navbar toggleable="md" type="light" variant="light">
      <div class="container-fluid">
        <b-navbar-brand>
          Buscar libro
        </b-navbar-brand>

        <b-navbar-toggle target="search-nav-collapse"></b-navbar-toggle>
        <b-collapse id="search-nav-collapse" is-nav>

          <b-navbar-nav style="margin-left:auto">
            <b-nav-item>
              <button class="btn btn-outline-dark" v-b-toggle.filters-sidebar>
                <i class="fas fa-filter"></i>
              </button>
            </b-nav-item>
            <b-nav-item class="me-4">
              <form class="d-flex">
                <input v-model="search" class="form-control me-2" placeholder="Título/Autor">
                <button class="btn btn-outline-success" @click.prevent="findBook">Search</button>
              </form>
            </b-nav-item>
            <b-nav-item class="d-flex align-items-center">
              <img src="@/assets/coin.png" alt="Coin image" width="30px" class="rounded-circle">
              <span class="mx-1">100</span>
            </b-nav-item>
            
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
    
    <b-sidebar id="filters-sidebar" title="Filtros" shadow>
      <hr>
      <div class="px-3 py-2">
        <ul>
          <li class="d-flex mb-2">
            <b-form-checkbox v-model="costFilter" id="cost-filter" class="me-2"></b-form-checkbox>
            <label for="cost-filter">Menor costo</label>
          </li>
          <li class="mb-2">
            <span>Condición</span>
            <ul>
              <b-form-radio-group
                v-model="selectedCondition"
                :options="conditionFilters"
                name="condition-filters"
              ></b-form-radio-group>
            </ul>
          </li>
          <li>
            <span>Género</span>
            <ul>
              <b-form-radio-group
                v-model="selectedGenre"
                :options="genreFilters"
                name="genre-filters"
              ></b-form-radio-group>
            </ul>
          </li>
        </ul>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import globals from '@/globals.js';

export default {
  name: 'Home',
  data() {
    return {
      search: '',
      costFilter: false,
      selectedCondition: 'Ninguno',
      selectedGenre: 'Ninguno'
    }
  },
  computed: {
    conditionFilters() {
      let conditions = this.$_.cloneDeep(globals.book.conditions);
      conditions.unshift('Ninguno');
      return conditions;
    },
    genreFilters() {
      let genres = this.$_.cloneDeep(globals.book.genres);
      genres.unshift('Ninguno');
      return genres;
    }
  },
  methods: {
    findBook() {
      let searchVal = this.search.trimStart().trimEnd();
      this.$emit('search', searchVal, this.costFilter, this.selectedCondition, this.selectedGenre)
    }
  },
  mounted() {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul {
    list-style-type: none;
  }
</style>
