<template>
    <div>
        <b-row>
            <ExchangeIn/>
            <ExchangeOut/>
            <ExchangeIn/>
            <ExchangeOut/>
        </b-row>
    </div>
</template>


<script>
import ExchangeIn from "@/components/ExchangeIn.vue"
import ExchangeOut from "@/components/ExchangeOut.vue"
export default {
  name: 'MyExchanges',
  components:{
    ExchangeIn,
    ExchangeOut
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