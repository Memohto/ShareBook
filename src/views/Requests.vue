<template>
    <div>
        <b-row>
            <b-tabs class="tab" content-class="mt-3">
                <b-tab title="Solicitudes" active>
                  <Request/>
                  <Request/>
                  <Request/>
                  <Request/>
                  <Request/>
                  <Request/>
                </b-tab>
                <b-tab title="Entregas">
                  <Deliver/>
                  <Deliver/>
                  <Deliver/>
                  <Deliver/>
                </b-tab>
            </b-tabs>
        </b-row>
    </div>
</template>


<script>
import Request from "@/components/Request.vue"
import Deliver from "@/components/Deliver.vue"
export default {
  name: 'Requests',
  components:{
    Request,
    Deliver
  },
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
  
</style>