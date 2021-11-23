<template>
  <b-card no-body class="overflow-hidden">
    <b-row no-gutters>
      <b-col md="5">
        <b-card-img :src="image" class="card-img-top" alt="Card image" height="300px"></b-card-img>
      </b-col>
      <b-col md="7">
        <b-card-body :title="title" :sub-title="author">
          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-if="!isMine"><b>Propietario:</b> {{ owner }} </li>
            <li class="list-group-item" v-if="!isMine"><b>Calificación del propietario:</b> {{ gradeMsg }} </li>
            <li class="list-group-item"> <b>Género:</b> {{ genre }} </li>
            <li class="list-group-item"> <b>Condición:</b> {{ condition }} </li>
            <li class="list-group-item"> <b>Creditos:</b> {{ credits }} </li>
            <li class="list-group-item"> <b>Subido:</b> {{ formatDate(uploaded) }} </li>
          </ul>
          <div class="d-flex justify-content-end mt-4">
            <!-- <b-button v-if="isMine" variant="danger"><i class="far fa-trash-alt"></i></b-button> -->
            <b-button v-if="!isMine" variant="success" @click="createRequest">Solicitar libro</b-button>
          </div>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import moment from "moment";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default {
  name: 'Book', 
  data: () => {
    return {
      gradeMsg: '',
    }
  },
  props: {
    id: String,
    image: String,
    title: String,
    author: String,
    credits: Number,
    condition: String,
    genre: String,
    uploaded: Number,
    owner: String,
    isMine: Boolean
  },
  methods: {
    formatDate(unix) {
      return moment(unix).locale('es').format('l');
    },
    async showGrade() {
      if(!this.owner) return;
      let msg = "";
      const ownerInfo = await firebase.firestore().collection('users').doc(this.owner).get();
      const owner = ownerInfo.data();
      if(owner.allGrades && owner.totalExchanges) {
        msg = owner.allGrades/owner.totalExchanges;
      } else {
        msg = 'N/a'
      }
      this.gradeMsg = msg;
    },
    async createRequest() {
      try {
        const userEmail = firebase.auth().currentUser.email;
        const userInfo = await firebase.firestore().collection('users').doc(userEmail).get();
        const user = userInfo.data();

        var requestCredits = 0;
        var alreadyRequested = false;
        const requests = await firebase.firestore().collection('requests').where('requestor', '==', userEmail).get();
        requests.docs.map(d => {
          let data = d.data();
          if(!alreadyRequested) alreadyRequested = this.id == data.book;
          requestCredits += data.bookCredits;
        });

        if(alreadyRequested) {
          alert('Ya solicitó este libro');
          return;
        }

        if(user.credits - requestCredits >= this.credits) {
          const doc = {
            requestor: firebase.auth().currentUser.email,
            owner: this.owner,
            book: this.id,
            bookImage: this.image,
            bookCredits: this.credits,
            status: "Esperando",
            received: false,
            delivered: false
          }
          await firebase.firestore().collection('requests').doc().set(doc);
          this.$router.push('/solicitudes');
        } else {
          alert('No hay créditos suficientes');
        }
      } catch(err) {
        console.error(`Error @createRequest: ${err.message}`);
      }
    },
  },
  async mounted() {
    await this.showGrade();
  }
}
</script>

