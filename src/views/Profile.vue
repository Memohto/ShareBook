<template>
  <b-container>
    <b-alert
        :show="dismissCountDown"
        :variant="alertVariant"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
      >
        <ul>
          <li v-for="(e, i) in Object.keys(errors)" :key="i">
            {{e + ": " + errors[e]}}
          </li>
        </ul>
      </b-alert>
    <b-row class="my-5" >
      <b-col md="8">
        <b-row>
          <b-col md="4" class="text-center">
            <img
              id="profile-image"
              :src="photoUrl"
              alt="profile image"
            />
          </b-col>
          <b-col md="8">
              <div class="d-flex justify-content-end">
                <b-button @click='openModal'><i class="fas fa-edit"></i></b-button>
              </div>
              <h2>{{userInfo.fullName}}</h2>
              <hr>
              <p><b>Usuario: </b>{{userInfo.username}}</p>
              <p><b>Teléfono: </b>{{userInfo.phone}}</p>
          </b-col>
        </b-row>
      </b-col>

      <b-col md="4">
        <b-row class="d-flex align-items-center mt-5">
          <b-col md="6" class="text-center">
            <img id="credit-image" src="@/assets/coin.png" alt="Coin image" />
          </b-col>
          <b-col md="6">
            <h3>Créditos:</h3>
            <h5>{{userInfo.credits}}</h5>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    
    
    <b-row>
      <div class="d-flex justify-content-end">
        <b-button variant="success" @click="$router.push('/registroLibro')">
          Agregar libro
        </b-button>
      </div>
      <b-tabs class="tab" content-class="mt-3">
        <b-tab title="Mis libros" active>
          <MyBooks />
        </b-tab>

        <b-tab title="Mis intercambios">
          Mis intercambios
        </b-tab>
      </b-tabs>
    </b-row>

    <b-modal 
      ref="edit-info"
      id="edit-info" 
      title="Edita tu información personal" 
      ok-title="Actualizar" 
      ok-variant="success"
      cancel-title="Cancelar"
      @ok.prevent="updateInfo"
    >
      <b-form-group label-cols="4" label="Nombre y apellido" label-for="name-input">
        <b-form-input
          v-model="newInfo.fullName"
          id="name-input"
          placeholder="Eg. Daniel Pérez"
          :state="fullNameValidation"
        ></b-form-input>
        <b-form-invalid-feedback :state="fullNameValidation">
          Este campo no puede estar vacío.
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="fullNameValidation">
          Correcto.
        </b-form-valid-feedback>
      </b-form-group>

      <b-form-group label-cols="4" label="Usuario" label-for="username-input">
        <b-form-input
          v-model="newInfo.username"
          id="username-input"
          placeholder="Ingresa tu usuario"
          :state="usernameValidation"
        ></b-form-input>
        <b-form-invalid-feedback :state="usernameValidation">
          Este campo no puede estar vacío.
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="usernameValidation">
          Correcto.
        </b-form-valid-feedback>
      </b-form-group>

      <b-form-group label-cols="4" label="Teléfono" label-for="phone-input">
        <b-form-input
          v-model="newInfo.phone"
          id="phone-input"
          type="tel"
          placeholder="Ej. 9933334444"
          :state="phoneValidation"
        ></b-form-input>
        <b-form-invalid-feedback :state="phoneValidation">
          El teléfono tiene que contener únicamente 10 dígitos.
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="phoneValidation">
          Correcto.
        </b-form-valid-feedback>
      </b-form-group>

      <b-form-group label-cols="4" label="Imagen (Opcional)" label-for="image-input">
        <b-form-file 
          v-model="newPhoto"
          id="image-input"
          accept=".jpg, .png"
          plain
        ></b-form-file>
      </b-form-group>
    </b-modal>

    </b-container>
</template>

<script>
import MyBooks from '@/views/MyBooks.vue';
import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

export default {
  name: "Profile",
  components: {
    MyBooks
  },
  data() {
    return {
      userInfo: {
        fullName: '',
        username: '',
        phone: '',
        credits: 0,
      },
      newInfo: {
        fullName: '',
        username: '',
        phone: '',
      },
      newPhoto: null,
      photoUrl: '',
      errors: {},
      dismissSecs: 10,
      dismissCountDown: 0,
      alertVariant: 'danger'
    };
  },
  computed: {
    email() {
      return firebase.auth().currentUser.email;
    },
    phoneValidation() {
      const phoneRegex = new RegExp(/^[0-9]{10}$/);
      return phoneRegex.test(this.newInfo.phone)
    },
    fullNameValidation() {
      return this.newInfo.fullName.length ? true : false;
    },
    usernameValidation() {
      return this.newInfo.username.length ? true : false;
    }
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    openModal() {
      this.newInfo = this.$_.cloneDeep(this.userInfo);
      this.$bvModal.show("edit-info");
    },
    async updateInfo() {
      try {
        let valid = true;
        // Phone validation
        const phoneRegex = new RegExp(/^[0-9]{10}$/);
        if(!phoneRegex.test(this.newInfo.phone)) valid = false;

        // Text validation
        if(!this.newInfo.username.length) valid = false;
        if(!this.newInfo.fullName.length) valid = false;

        if(valid) {
          // Update user info
          let updatedInfo = this.$_.assign(this.userInfo, this.newInfo);
          await firebase.firestore().collection('users').doc(this.email).set(updatedInfo);
          this.userInfo = this.$_.cloneDeep(updatedInfo);

          // Upload and update profile picture
          if(this.newPhoto) {
            const profilePictureRef = firebase.storage().ref().child(`profilePictures/${this.email}`)
            await profilePictureRef.put(this.newPhoto);
            this.photoUrl = await profilePictureRef.getDownloadURL();
          }
          
          this.alertVariant = 'success';
          this.errors['Éxito'] = 'La información se ha actualizado correctamente';
          this.dismissCountDown = this.dismissSecs;
        }
      } catch(err) {
        console.error(err.message);
        this.alertVariant = 'danger';
        this.errors['Error'] = err.message;
        this.dismissCountDown = this.dismissSecs;
      } finally { 
        this.$bvModal.hide("edit-info");
      }
      
    }
  },
  async mounted() {
    try {
      let userInfo = await firebase.firestore().collection('users').doc(this.email).get();
      if(userInfo.exists) {
        this.userInfo = userInfo.data();

        const profilePictureRef = firebase.storage().ref().child(`profilePictures/${this.email}`)
        await profilePictureRef.getDownloadURL()
          .then(url => {
            this.photoUrl = url;
          })
          .catch(() => {
            this.photoUrl = 'https://firebasestorage.googleapis.com/v0/b/sharebook-bfebb.appspot.com/o/profilePictures%2FprofilePictureDefault.jpg?alt=media&token=cd8015a7-3862-4cad-82f9-426caafac93e';
          });
      }
    } catch(err) {
      console.error(err.message);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#profile-image {
  width: 200px;
  height: 200px;
  border: 2px grey solid;
  border-radius: 100px;
}

#credit-image {
  width: 100px;
  border-radius: 100px;
}

</style>
