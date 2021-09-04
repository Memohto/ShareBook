<template>
  <div id="rectangle">
    <h1>
        <font face="Voltaire,verdana,arial">Registro</font>
        <img src="../assets/logo.png" alt="an image of borregos" />
    </h1>
    
    <b-form @submit.prevent="printName" id = registroForm>
      <label for="name-input">Nombre y apellido</label>
      <b-form-input
        id="name-input"
        class="registroField"
        placeholder="Eg. Daniel Pérez"
      ></b-form-input>

      <label for="email-input">Correo electrónico</label>
      <b-form-input
        id="email-input"
        class="registroField"
        placeholder="Ej. juan25@provider.com"
      ></b-form-input>

      <label for="phone-input">Teléfono</label>
      <b-form-input
        id="phone-input"
        class="registroField"
        placeholder="Ej. 9933334444"
      ></b-form-input>

      <label for="username-input">Usuario</label>
      <b-form-input
        id="username-input"
        class="registroField"
        placeholder="Ingresa tu usuario"
      ></b-form-input>

      <label for="password-input">Contraseña</label>
      <b-form-input 
        id="password-input" :type="inputType"
        class="registroField"
        placeholder="Ingresa tu contraseña">
        </b-form-input>

      <label for="image-input">Imagen (opcional)</label>
      <b-form-file v-model="file2" class="mt-3" plain id = "image-input"></b-form-file>

      <b-button variant="success" type="submit" id= "SubmitForm">Login</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      inputType:"password"
    }
  },
  methods: {
    
  },
  mounted() {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    img {
        width: 200px;
        float:right;
        position: absolute;
        top:-75px;
        left:1170px;
     }
    
    h1{
        position: absolute;
        top: 5px;
        left: 10px;
    }

    #rectangle{
    width:100%;
    height:60px;
    background:#f7bf50;
    position:relative;
    top:0;
    left:0;
    }

    #registroForm{
        position: absolute  ;
        top:100px;
        left: 30px;
    }

    .registroField{
        width: 500px;
    }

    #image-input{
        position: absolute;
        top:340px;
        left:0px;
    }

    #SubmitForm{
        position: absolute;
        top:420px;
        left:0px;
    }

</style>