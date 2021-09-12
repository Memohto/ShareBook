<template>
  <div class="container">
    <div class="row">
        <p></p>
        <div class="col-2">
            <img id="credit-image" src="../assets/coin.png" alt="credit coin" />
            <p id="creditAmount">175</p>
        </div>
        <div class = "col-4">
            <img id="arrow" src="../assets/right_arrow.png" alt="right arrow" />
            <img class="book" src="../assets/libro3.jpeg" alt="right arrow" />
        </div>
        <div class = "col-3">
            <p class = "resaltado">Publicado por:</p>
            <p>@leector25</p>
            <b-button 
              class="my-3" 
              type="submit" 
              variant="success"
              >
              Solicitar
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
                Recibí
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
  name: 'Request',
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
    width: 70%;
    border-radius: 100px;
    margin-top: 15%;
  }
  
  #creditAmount{
    margin-top: 1%;
    margin-left: 18%;
    font-size: xx-large;
  }

  #arrow{
    width:20%;
    margin-right: 20%;
    
  }

  .book{
    width:40%;
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