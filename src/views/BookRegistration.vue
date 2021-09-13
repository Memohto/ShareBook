<template>
    <b-container>
      <b-alert
        :show="dismissCountDown"
        variant="danger"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
      >
        <ul>
          <li v-for="(e, i) in Object.keys(errors)" :key="i">
            {{e + ": " + errors[e]}}
          </li>
        </ul>
      </b-alert>

      <b-form @submit.prevent="onSubmit">
        <b-row class="mt-5">
          <b-col md="2"></b-col>
          <b-col md="4" class="px-5">
            <b-form-input
              class="mb-2"
              v-model="book.title"
              placeholder="Inserte título"
              required
            ></b-form-input>
            <b-form-input
              class="mt-2 mb-4"
              v-model="book.author"
              placeholder="Inserte autor"
              required
            ></b-form-input>
            <div class="imgInputContainer"> 
              <img :src="book.photo" alt="Book image" width="100%" height="100%">
              <b-form-file 
                v-model="photoFile"
                class="imgInput"
                accept=".jpg, .png"
                plain
                required
                @input="previewImage"
              ></b-form-file>
            </div>
          </b-col>

          <b-col md="4" class="px-5 mt-3">
            <div class="text-center">
              <img class="rounded-circle" src="@/assets/coin.png" alt="Coin image" width="200px">
            </div>
            <b-form-input
              class="mt-4"
              v-model="book.credits"
              placeholder="Créditos"
              type="number"
              required
            ></b-form-input>
            <b-form-group class="mt-5" label-cols="4" label="Condición:" label-for="condition-input">
              <select 
                v-model="book.condition"
                id="condition-input"
                class="form-select" 
                required
              >
                <option v-for="c in conditions" :key="c" :value="c">{{c}}</option>
              </select>
            </b-form-group>
            <b-form-group label-cols="4" label="Género:" label-for="genre-input">
              <select 
                v-model="book.genre"
                id="genre-input"
                class="form-select" 
                required
              >
                <option v-for="g in genres" :key="g" :value="g">{{g}}</option>
              </select>
            </b-form-group>
            <div class="d-flex align-items-center justify-content-end">
              <b-button style="margin-right:5px" @click="$router.push('./perfil')">Cancelar</b-button>
              <b-button class="my-5" variant="success" type="submit">Registrar</b-button>
            </div>
          </b-col>
        </b-row>
      </b-form>
    </b-container>
</template>

<script>
import uniqid from 'uniqid';
import moment from 'moment';
import globals from '@/globals.js';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

export default {
  name: 'BookRegistration',
  data() {
    return {
      book: {
        owner: '',
        author: '',
        condition: '',
        credits: 0,
        genre: '',
        photo: 'https://firebasestorage.googleapis.com/v0/b/sharebook-bfebb.appspot.com/o/bookPictures%2FdefaultBookImage.png?alt=media&token=19698a08-54a3-44f5-b1d5-80b48f71eb8c',
        title: '',
        uploadedAt: null
      },
      photoFile: null,
      errors: {},
      dismissSecs: 10,
      dismissCountDown: 0
    }
  },
  computed: {
    userEmail() {
      return firebase.auth().currentUser.email;
    },
    conditions() {
      return this.$_.cloneDeep(globals.book.conditions);
    },
    genres() {
      return this.$_.cloneDeep(globals.book.genres);
    }
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    async previewImage() {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.book.photo = reader.result;
      }
      if(this.photoFile) {
        reader.readAsDataURL(this.photoFile);
      }
    },
    validate() {
      this.errors = {};
      let valid = true;

      // Credits validation
      this.book.credits = +this.book.credits;
      if(!this.book.credits || this.book.credits < 0) {
        this.errors['Creditos'] = 'Los créditos tienen que ser mayor a cero.';
        valid = false;
      }

      return valid;
    },
    async onSubmit() {
      try {
        const valid = this.validate();
        if(valid) {
          const docId = uniqid();
          // Upload and update profile picture
          if(this.photoFile) {
            const bookPictureRef = firebase.storage().ref().child(`bookPictures/${this.userEmail}/${docId}`);
            await bookPictureRef.put(this.photoFile);
            this.book.photo = await bookPictureRef.getDownloadURL();
          }
          // Add book to collection
          this.book.owner = this.userEmail;
          this.book.uploadedAt = moment().utc().valueOf();
          await firebase.firestore().collection('books').doc(docId).set(this.book)
            .then(() => {
              this.$router.push('/perfil');
            })
            .catch(err => {
              console.err(err);
              this.errors['Error'] = err.message;
              this.dismissCountDown = this.dismissSecs;
            })
        } else {
          this.dismissCountDown = this.dismissSecs;
        }
      } catch(err) {
        console.err(err);
        this.errors['Error'] = err.message;
        this.dismissCountDown = this.dismissSecs;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .imgInputContainer {
    position: relative; 
    border: 1px solid black; 
    width:100%; 
    height:500px
  }
  .imgInput {
    opacity: 0.0; 
    position: absolute; 
    top:0; 
    left: 0; 
    bottom: 0; 
    right:0; 
    width: 100%; 
    height:100%;
  }
</style>