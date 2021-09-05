<template>
  <div>
      <section id= "fotoSection">
          <img id="perfil-image" src="../assets/fotoPerfil_mockup.jpg" alt="profile image" />
          <body id="perfil-data">
              <p class="resaltado">María López</p>
              <p>I love to learn HTML</p>
              <p class="notas">Editar información</p>
          </body>
      </section>

      <section id="creditSection">
          <img id="credit-image" src="../assets/coin.png" alt="profile image" />
          <body id="credit-data">
              <p class="resaltado">Créditos</p>
              <p id="creditAmount">625</p>
          </body>
      </section>

      <section id=myBooksSection>
        <b-tabs class="tab" content-class="mt-3">
           <b-tab title="Mis libros" active>
                <b-card img-src="https://placekitten.com/300/300" img-alt="Card image" img-left class="bookCard">
                    <img class="coinCard" src="../assets/coin.png" alt="profile image"/>
                    <b-card-text id="amountCredit">150</b-card-text>
                    <b-card-text id="condicionLabel" class="notasResaltado">Condición:</b-card-text>
                    <b-card-text id="condicionText">Usado</b-card-text>
                    <b-card-text id="subidoLabel" class="notasResaltado">Subido el:</b-card-text>
                    <b-card-text id="subidoText">17/05/2021</b-card-text>
                </b-card>
           </b-tab>
           <b-tab title="Mis intercambios" ><p>Mis intercambios</p></b-tab>
        </b-tabs>
      </section>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      
    }
  },
  methods: {
    
  },
  mounted() {
    this.username = "Memo";
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #perfil-image {
        width: 200px;
        border-radius: 100px;
        float: left;
        margin-right: 70px;
      }
    .resaltado {
        font-weight: bold;
        font-size: xx-large;
      }
    .notas{
        font-size: x-small;
    }
    .notasResaltado{
        font-weight: bold;
        font-size: medium;
    }
    #fotoSection{
        position: absolute;
        left:2%;
        top:90px;
        width: 45%;
    }
    #perfil-data{
        position:absolute;
        left: 250px;
        top:30px;
        width: 50%;
        height: 80%;
    }

    #creditSection{
        position: absolute;
        left:55%;
        top:90px;
        width: 43%;
    }

    #credit-image{
        width: 200px;
        border-radius: 100px;
        float: left;
        margin-right: 70px;
    }
    #credit-data{
        position:absolute;
        left: 250px;
        top:30px;
        width: 50%;
        height: 80%;
    }
    #creditAmount{
        font-size: xxx-large;
        position: absolute;
        left:25px;
    }

    #myBooksSection{
        position: absolute;
        top:350px;
        left:2%;
        width: 96%;
        height: 45%;
    }

    .tab{
        font-size: large;
    }
    .bookCard{
        height: 230px;
        width: 50%;
    }
    .coinCard{
        width: 60px;
        position:relative;
        left:100px;
    }
    #amountCredit{
        position: relative;
        left:180px;
        top:-60px;
        font-size: xx-large;
    }
    #condicionLabel{
        position:relative;
        left:30px;
        width: 80px;
    }
    #condicionText{
        position:relative;
        left:30px;
        width: 80px;
    }
    #subidoLabel{
        position:relative;
        top:-84px;
        left:230px;
    }
    #subidoText{
        position:relative;
        top:-82px;
        left:230px;
    }
</style>