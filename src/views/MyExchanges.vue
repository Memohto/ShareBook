<template>
  <div>
    <b-row>
      <b-col v-for="(e, i) in exchanges" :key="i" md="12">
        <Exchange
          :book="e.book"
          :bookImage="e.bookImage"
          :bookCredits="e.bookCredits"
          :requestor="e.requestor"
          :owner="e.owner"
          :date="e.date"
          :grade="-1"
          :isIn="userEmail == e.owner"
        />
      </b-col>
    </b-row>
  </div>
</template>


<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import Exchange from "@/components/Exchange.vue"

export default {
  name: 'MyExchanges',
  components:{
    Exchange
  },
  data() {
    return {
      userEmail: '',
      exchanges: [],
      unsubscribe: null
    }
  },
  methods: {
    isMine(data) {
      return data.owner == this.userEmail || data.requestor == this.userEmail
    },
    addExchange(id, data) {
      this.exchanges.push({
        id: id,
        ...data
      })
    },
    updateExchange(id, data) {
      const index = this.exchanges.findIndex(d => d.id == id);
      let temp = this.$_.cloneDeep(this.exchanges);
      temp[index] = {id: id, ...data};
      this.exchanges = this.$_.cloneDeep(temp);
    },
    removeExchange(id) {
      const index = this.exchanges.findIndex(d => d.id == id);
      this.exchanges.splice(index, 1);
    },
    subscribeExchanges() {
      this.unsubscribe = firebase.firestore().collection("exchanges").onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const data = change.doc.data();
          if(this.isMine(data)) {
            if (change.type === "added") {
              this.addExchange(change.doc.id, change.doc.data());
            }
            if (change.type === "modified") {
              this.updateExchange(change.doc.id, change.doc.data());
            }
            if (change.type === "removed") {
              this.removeExchange(change.doc.id);
            }
          }
        });
      });
    },
    unsubscribeExchanges() {
      this.unsubscribe();
    }
  },
  mounted() {
    this.userEmail = firebase.auth().currentUser.email;
    this.subscribeExchanges();
  },
  beforeDestroy(){
    this.unsubscribeExchanges();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>