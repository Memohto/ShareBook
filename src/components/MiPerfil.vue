<template>
  <div>
    <section id="fotoSection">
      <img
        id="perfil-image"
        src="../assets/fotoEjemplo.jpg"
        alt="profile image"
      />
      <body id="perfil-data">
        <p id="Nombre" p class="resaltado">María Hinojosa</p>
        <button id="edit" button type="button" class="btn btn-dark">Dark</button>
        <br>
        <br>
        <br>
        <p>I love books, cats and travel</p>
      </body>
    </section>

    <section id="creditSection">
      <img id="credit-image" src="../assets/coin.png" alt="profile image" />
      <body id="credit-data">
        <p class="resaltado">Créditos</p>
        <p id="creditAmount">625</p>
      </body>
    </section>

    <section id="myBooksSection">
        <b-tabs class="tab" content-class="mt-3">
            <b-tab title="Mis libros" active>
                <div class="card-group">
                    <div class="card" style="width: 25%;">
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
                    <div class="card" style="width: 25%;">
                        <img src="../assets/libro6.jpeg" class="card-img-top" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">Harry Potter</h5>
                            <h6 class="card-subtitle mb-2 text-muted">J.K. Rowling</h6>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Creditos:  200</li>
                            <li class="list-group-item">Condición:  Usado</li>
                            <li class="list-group-item">Subido:  06/10/2021</li>
                        </ul>
                    </div>
                    <div class="card" style="width: 25%;">
                        <img src="../assets/libro2.jpeg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Las Batallas en el desierto</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Jose Emilio Pacheco</h6>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Creditos:  200</li>
                            <li class="list-group-item">Condición:  Usado</li>
                            <li class="list-group-item">Subido:  06/10/2021</li>
                        </ul>
                    </div>
                    <div class="card" style="width: 25%;">
                        <img src="../assets/libro5.png" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Demian</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Hermann Hesse</h6>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Creditos:  200</li>
                            <li class="list-group-item">Condición:  Usado</li>
                            <li class="list-group-item">Subido:  06/10/2021</li>
                        </ul>
                    </div>
                </div>
                <br>
                <div class="card-group">
                    <div class="card" style="width: 25%;">
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
                    <div class="card" style="width: 25%;">
                        <img src="../assets/libro8.jpeg" class="card-img-top" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">Cuentos</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Edgar Allan Poe</h6>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Creditos:  200</li>
                            <li class="list-group-item">Condición:  Usado</li>
                            <li class="list-group-item">Subido:  06/10/2021</li>
                        </ul>
                    </div>
                    <div class="card" style="width: 25%;">
                        <img src="../assets/libro7.jpeg" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Sinsajo</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Suzanne Collins</h6>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Creditos:  200</li>
                            <li class="list-group-item">Condición:  Usado</li>
                            <li class="list-group-item">Subido:  06/10/2021</li>
                        </ul>
                    </div>
                    <div class="card" style="width: 25%;">
                        <img src="../assets/libro5.png" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Demian</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Hermann Hesse</h6>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Creditos:  200</li>
                            <li class="list-group-item">Condición:  Usado</li>
                            <li class="list-group-item">Subido:  06/10/2021</li>
                        </ul>
                    </div>
                </div>
            </b-tab>
            <b-tab title="Mis intercambios"><p>Mis intercambios</p></b-tab>
        </b-tabs>
    </section>
    </div>
</template>

<script>
export default {
  name: "MiPerfil",
  data() {
    return {};
  },
  methods: {},
  mounted() {
    this.username = "Memo";
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#perfil-image {
  width: 200px;
  height: 200px;
  border-radius: 100px;
  float: left;
  margin-right: 70px;
}
#Nombre {
  
  float: left;
  
}
#edit{
    float: left;
    background: url("../assets/editIcon.png") no-repeat;
    background-size: 25px;
    width: 27px;
    height: 27px;
    text-indent: -9999px;
    margin-top: 12px;
    margin-right: 10px;
    margin-left: 10px;
}
.resaltado {
  font-weight: bold;
  font-size: xx-large;
}
.notas {
  font-size: x-small;
}
.notasResaltado {
  font-weight: bold;
  font-size: medium;
}
#fotoSection {
  position: absolute;
  left: 2%;
  top: 90px;
  width: 45%;
}
#perfil-data {
  position: absolute;
  left: 250px;
  top: 30px;
  width: 50%;
  height: 80%;
}

#creditSection {
  position: absolute;
  left: 55%;
  top: 90px;
  width: 43%;
}

#credit-image {
  width: 100px;
  border-radius: 100px;
  float: left;
  margin-top: 40px;
  margin-right: 10px;
  margin-left: 120px;
}
#credit-data {
  position: absolute;
  left: 250px;
  top: 30px;
  width: 50%;
  height: 80%;
}
 .card {
    display:inline-block;
    
 
 }
#creditAmount {
  font-size: xxx-large;
  position: absolute;
  left: 25px;
}
.card-img-top {
    width: 100%;
    height: 15vw;
    object-fit: cover;
}
#myBooksSection {
  position: absolute;
  top: 350px;
  left: 2%;
  width: 96%;
  height: 45%;
}

.tab {
  font-size: large;
}
.bookCard {
  height: 300px;
  width: 50%;
  display:inline-block;
}
.coinCard {
  width: 40px;
  position: relative;
  left: 550px;
  top: -305px;
}


</style>
