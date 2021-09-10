<template>
  <div>
      <section id="creditSection">
        <img id="credit-image" src="../assets/coin.png" alt="profile image" />
        <body id="credit-data">
          <p class="resaltado">Créditos</p>
          <p id="creditAmount">625</p>
        </body>
      </section>
      <section id="search">
        <nav class="navbar navbar-light bg-light">
          <div class="container-fluid">
            <a class="navbar-brand">Buscar Libro</a>
            <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Titulo/Autor" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </nav>
      </section>
  
  <section id="myBooksSection">
        <b-tabs class="tab" content-class="mt-3">
            <b-tab title="Añadidos Recientemente" active>
                <span v-for="i of [1,2,3,4,5,6,7]" :key="i">
                    <div class="card" style="width: 21rem;">
                        <img src="../assets/libro1.png" class="card-img-top" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">Cien años de soledad</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Gabriel García Márquez</h6>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Creditos:  200</li>
                            <li class="list-group-item">Condición:  Usado</li>
                            <li class="list-group-item">Subido:  06/10/2021</li>
                        </ul>
                    </div>
                </span>
            </b-tab>
            <b-tab title="Recomendaciones" active>
                <span v-for="i of [1,2,3,4,5,6,7]" :key="i">
                    <div class="card" style="width: 21rem;">
                        <img src="../assets/libro2.jpeg" class="card-img-top" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">Las Batallas en el desierto </h5>
                            <h6 class="card-subtitle mb-2 text-muted">José Emilio Pacheco</h6>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Creditos:  200</li>
                            <li class="list-group-item">Condición:  Usado</li>
                            <li class="list-group-item">Subido:  06/10/2021</li>
                        </ul>
                    </div>
                </span>
            </b-tab>
        </b-tabs>
    </section>
    </div>
</template>

<script>
export default {
  name: 'Catalog',
  data(){
    return{
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>

#search{
  position: absolute;
  top: 90px;
  width: 80%;
  margin-right: 10px;
  margin-left: 30px;
}

#creditSection {
  position: absolute;
  left:75%;
  top: 50px;
  width: 43%;
}

#credit-image {
  width: 50px;
  border-radius: 100px;
  float: left;
  margin-top: 40px;
  margin-right: 10px;
  margin-left: 180px;
}
#credit-data {
  position: absolute;
  left: 250px;
  top: 30px;
  width: 50%;
  height: 80%;
}
#myBooksSection {
  position: absolute;
  top: 150px;
  left: 2%;
  width: 96%;
  height: 70%;
}

.card {
    display:inline-block;
    
}
</style>