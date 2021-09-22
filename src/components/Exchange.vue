<template>
  <b-row id="container">
    <!-- Exchange in -->
    <b-col v-if="isIn" class="centeredColumn" md="3">
      <img height="100%" width="70%" :src="bookImage" alt="Book image" />
    </b-col>

    <!-- Exchange out -->
    <b-col v-else class="centeredColumn" md="3">
      <img class="rounded-circle" width="150px" src="../assets/coin.png" alt="Coin image"/>
      <span id="creditAmount">{{bookCredits}}</span>
    </b-col>

    <b-col class="centeredColumn" md="1">
      <img width="100px" src="../assets/arrow_exchange.png" alt="Arrow image" />
    </b-col>

    <!-- ExchangeIn -->
    <b-col v-if="isIn" class="centeredColumn" md="3">
      <img class="rounded-circle" width="150px" src="../assets/coin.png" alt="Coin image"/>
      <span id="creditAmount">{{bookCredits}}</span>
    </b-col>

    <!-- Exchange out -->
    <b-col v-else class="centeredColumn" md="3">
      <img height="100%" width="70%" :src="bookImage" alt="Book image" />
    </b-col>

    <b-col class="d-flex flex-column justify-content-center">
      <b-row>
        <label for="other"><b>Trueque con:</b></label> <br>
        <span id="other">{{otherUser}}</span> 
      </b-row>
      <br>
      <b-row>
        <label for="other"><b>Fecha:</b></label> <br>
        <span id="other">{{formatDate(date)}}</span>
      </b-row>
      <br>
      <b-row>
        <b-col class="d-flex justify-content-end">
          <b-button variant="success">
            Calificar trueque
          </b-button>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import moment from 'moment';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default {
  name: 'ExchangeIn',
  data() {
    return {
      userEmail: '',
      otherUser: '',
    }
  },
  props: {
    book: String,
    bookImage: String,
    bookCredits: Number,
    requestor: String,
    owner: String,
    date: Number,
    grade: Number,
    isIn: Boolean,
  },
  methods: {
    formatDate(unix) {
      return moment(unix).locale('es').format('l');
    },
  },
  mounted() {
    this.userEmail = firebase.auth().currentUser.email;
    this.otherUser = this.isIn ? this.requestor : this.owner;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #container {
    margin: 1rem;
    height: 300px; 
    border: 1px solid #c2c2c2;
    border-radius: 5px;
    box-shadow: 2px 2px 5px grey;
  }

  .centeredColumn {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }
  
  #creditAmount{
    font-size: xx-large;
  }
</style>