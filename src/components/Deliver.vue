<template>
  <div class="container">
    <div class="row">
        <p></p>
        <div class="col-2">
            <img class="book" src="../assets/libro7.jpeg" alt="right arrow" />
        </div>
        <div class = "col-4">
            <img id="arrow" src="../assets/right_arrow.png" alt="right arrow" />
            <img id="credit-image" src="../assets/coin.png" alt="credit coin" />
            <p id="creditAmount">225</p>
        </div>
        <div class = "col-3">
            <p class = "resaltado">Solicitado por:</p>
            <p>@Leemur_19</p>
            <b-button 
              class="my-3" 
              type="submit" 
              variant="success"
              >
              Aceptar
            </b-button>
        </div>
        <div class = "col-3">
            <img id="chat" src="../assets/chat.png" alt="chat icon"/>
            <p>Chat</p>
            <b-button
                id="recibi"
                class="my-3" 
                type="submit"
                >
                Entregué
            </b-button>
        </div>
        <p></p>
        <p></p>
        <hr>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Deliver',
  data() {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #credit-image {
    width: 33%;
    border-radius: 100px;
    margin-top: 7%;
  }
  
  #creditAmount{
    margin-top: 1%;
    margin-left: 50%;
    font-size: xx-large;
  }

  #arrow{
    width:20%;
    margin-right: 20%;
    margin-top: 23%;
  }

  .book{
    width:84%;
  }
  .resaltado{
    font-weight: bold;
  }
  #chat{
    width:10%;
    float:left;
    margin-right: 10px;
  }
</style>