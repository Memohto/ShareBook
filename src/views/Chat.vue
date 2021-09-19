<template>
	<div class="body">
		<header>
			<h1>Chat con {{ $route.params.otro }}</h1>
		</header>
		<section>
			<main>
				<div
					v-for="(msg, index) in messages"
					v-bind:key="'index-' + index"
					:class="['message', sentOrRecived(msg.sent)]"
				>
					<p>{{ msg.text }}</p>
				</div>
			</main>
			<form v-on:submit.prevent="sendMessage">
				<input v-model="message" type="text" placeholder="Ingrese su mensaje" />
				<button :disabled="!message" type="submit">Enviar</button>
			</form>
		</section>
	</div>
</template>

<script>
import firebase from "firebase/app";

export default {
	name: "Chat",
	mounted() {
		this.db
			.collection("messages")
			.doc(firebase.auth().currentUser.email)
			.collection(this.contacto)
			.orderBy("createdAt")
			.onSnapshot((querySnap) => {
				this.messages = [];
				querySnap.forEach((doc) => {
					//console.log(doc.data().text);
					this.messages.push(doc.data());
				});
			});
	},
	data() {
		return {
			user: firebase.auth().currentUser,
			db: firebase.firestore(),
			message: "",
			messages: [],
			contacto: this.$route.params.otro,
			errors: {},
			dismissSecs: 10,
			dismissCountDown: 0,
		};
	},
	methods: {
		countDownChanged(dismissCountDown) {
			this.dismissCountDown = dismissCountDown;
		},
		async sendMessage(e) {
			e.preventDefault();
			const messageInfo = {
				text: this.message,
				createdAt: Date.now(),
				sent: true,
			};
			const messageInfo2 = {
				text: this.message,
				createdAt: Date.now(),
				sent: false,
			};

			this.message = "";

			await this.db
				.collection("messages")
				.doc(firebase.auth().currentUser.email)
				.collection(this.contacto)
				.add(messageInfo);

			await this.db
				.collection("messages")
				.doc(this.contacto)
				.collection(firebase.auth().currentUser.email)
				.add(messageInfo2);
		},
		sentOrRecived(value) {
			return value === true ? "sent" : "recived";
		},
	},
};
</script>

<style lang="css">
.body {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	font-size: 2rem;
	min-height: calc(100vh - 72px);
}
header {
	width: 100%;
	padding: 10px;
}
section {
	padding: 10px;
}
form {
	position: sticky;
	bottom: 10px;
}
button {
	background-color: #4caf50;
	border: none;
	color: white;
	padding: 7px 15px;
	text-align: center;
}
.message {
	border: 3px solid;
	border-radius: 10px;
	margin: 10px;
	padding: 0 10px;
	width: fit-content;
}

.sent {
	background-color: rgba(0, 193, 99, 0.7);
	margin-left: auto;
	margin-right: 0;
}
.recived {
	background-color: rgba(0, 123, 193, 0.6);
	margin-left: 0;
	margin-right: auto;
}
</style>
