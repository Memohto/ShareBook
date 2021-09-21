<template>
    <b-container>
      <b-tabs class="mt-3">
          <b-tab title="Mis solicitudes" active>
            <b-col md="12" v-for="(r, i) in requests" :key="i">
              <Request
                :id="r.id"
                :requestor="r.requestor"
                :owner="r.owner"
                :book="r.book"
                :bookImage="r.bookImage"
                :bookCredits="r.bookCredits"
                :status="r.status"
                :received="r.received"
                :isDeliver="false"
              />
            </b-col>
          </b-tab>
          <b-tab title="Entregas">
            <b-col md="12" v-for="(d, i) in deliveries" :key="i">
              <Request
                :id="d.id"
                :requestor="d.requestor"
                :owner="d.owner"
                :book="d.book"
                :bookImage="d.bookImage"
                :bookCredits="d.bookCredits"
                :status="d.status"
                :delivered="d.delivered"
                :isDeliver="true"
              />
            </b-col>
          </b-tab>
      </b-tabs>
    </b-container>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import Request from "@/components/Request.vue"

export default {
  name: 'Requests',
  components:{
    Request
  },
  data() {
    return {
      requests: [],
      deliveries: [],
      userEmail: '',
      unsubscribe: null
    }
  },
  methods: {
    isMine(data) {
      return data.owner == this.userEmail || data.requestor == this.userEmail
    },
    addRequest(id, data) {
      if(data.owner == this.userEmail && data.status != 'Rechazado') {
        this.deliveries.push({
          id: id,
          ...data
        })
      } else if(data.requestor == this.userEmail) {
        this.requests.push({
          id: id,
          ...data
        })
      }
    },
    updateRequest(id, data) {
      if(data.owner == this.userEmail) {
        const index = this.deliveries.findIndex(d => d.id == id);
        let temp = this.$_.cloneDeep(this.deliveries);
        temp[index] = {id: id, ...data};
        this.deliveries = this.$_.cloneDeep(temp);
      } else if(data.requestor == this.userEmail) {
        const index = this.requests.findIndex(d => d.id == id);
        let temp = this.$_.cloneDeep(this.requests);
        temp[index] = {id: id, ...data};
        this.requests = this.$_.cloneDeep(temp);
      }
    },
    removeRequest(id, data) {
      if(data.owner == this.userEmail) {
        const index = this.deliveries.findIndex(d => d.id == id);
        this.deliveries.splice(index, 1);
      } else if(data.requestor == this.userEmail) {
        const index = this.requests.findIndex(d => d.id == id);
        this.requests.splice(index, 1);
      }
    },
    subscribeRequests() {
      this.unsubscribe = firebase.firestore().collection("requests").onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const data = change.doc.data();
          if(this.isMine(data)) {
            if (change.type === "added") {
              this.addRequest(change.doc.id, change.doc.data());
            }
            if (change.type === "modified") {
              this.updateRequest(change.doc.id, change.doc.data());
            }
            if (change.type === "removed") {
              this.removeRequest(change.doc.id, change.doc.data());
            }
          }
        }
      );
    });
    },
    unsubscribeRequests() {
      this.unsubscribe();
    }
  },
  mounted() {
    this.userEmail = firebase.auth().currentUser.email;
    this.subscribeRequests();
  },
  beforeDestroy(){
    this.unsubscribeRequests();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>