<template>
	<b-row id="container">
		<!-- Request component -->
		<b-col v-if="!isDeliver" class="centeredColumn" md="3">
			<img
				class="rounded-circle"
				width="150px"
				src="../assets/coin.png"
				alt="Coin image"
			/>
			<span id="creditAmount">{{ bookCredits }}</span>
		</b-col>

		<!-- Deliver component -->
		<b-col v-else class="centeredColumn" md="3">
			<img height="100%" width="70%" :src="bookImage" alt="Book image" />
		</b-col>

		<b-col class="centeredColumn" md="1">
			<img width="100px" src="../assets/right_arrow.png" alt="Arrow image" />
		</b-col>

		<!-- Request component -->
		<b-col v-if="!isDeliver" class="centeredColumn" md="3">
			<img height="100%" width="70%" :src="bookImage" alt="Book image" />
		</b-col>

		<!-- Deliver component -->
		<b-col v-else class="centeredColumn" md="3">
			<img
				class="rounded-circle"
				width="150px"
				src="../assets/coin.png"
				alt="Coin image"
			/>
			<span id="creditAmount">{{ bookCredits }}</span>
		</b-col>

		<b-col class="mt-3">
			<b-row class="d-flex align-items-center">
				<b-col md="6">
					<label for="owner"
						><b
							>{{ isDeliver ? "Solicitado por" : "Publicado por" }}:
						</b></label
					>
					<br />
					<span id="owner">{{ isDeliver ? requestor : owner }}</span> <br />
				</b-col>
				<b-col class="d-flex justify-content-end" md="6">
					<b-button @click="openChat" class="mx-2" :disabled="isDisabled">
						<i class="far fa-comment-alt"></i>
					</b-button>
				</b-col>
			</b-row>

			<br />

			<b-row>
				<label for="status"><b>Estatus de solicitud: </b></label> <br />
				<span id="status">{{ status }}</span> <br />
			</b-row>

			<br />

			<b-row>
				<b-col v-if="isDeliver && isDisabled">
					<b-button
						style="margin-right:10px"
						variant="success"
						@click="acceptRequest"
					>
						Aceptar
					</b-button>
					<b-button variant="danger" @click="rejectRequest">
						Rechazar
					</b-button>
				</b-col>

				<b-col v-if="!isDeliver && status == 'Rechazado'">
					<b-button variant="danger" @click="deleteRequest">
						<i class="far fa-trash-alt"></i>
					</b-button>
				</b-col>

				<b-col class="d-flex justify-content-end">
					<b-button
						v-if="isDeliver"
						class="mx-2"
						variant="success"
						:disabled="isDisabled || delivered"
						@click="finishRequest"
					>
						Entregué
					</b-button>
					<b-button
						v-else
						class="mx-2"
						variant="success"
						:disabled="isDisabled || received"
						@click="finishRequest"
					>
						Recibí
					</b-button>
				</b-col>
			</b-row>
		</b-col>
	</b-row>
</template>

<script>
import moment from "moment";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default {
	name: "Request",
	data() {
		return {
			userEmail: "",
			otherUser: "",
		};
	},
	props: {
		id: String,
		requestor: String,
		owner: String,
		book: String,
		bookImage: String,
		bookCredits: Number,
		status: String,
		isDeliver: Boolean,
		delivered: Boolean,
		received: Boolean,
	},
	computed: {
		isDisabled() {
			return this.status == "Esperando" || this.status == "Rechazado";
		},
	},
	methods: {
		openChat() {
			this.$router.push({ path: `/chat/${this.otherUser}` });
		},
		async acceptRequest() {
			await firebase
				.firestore()
				.collection("requests")
				.doc(this.id)
				.update({ status: "En proceso" })
				.catch((err) => console.error(err));
		},
		async rejectRequest() {
			await firebase
				.firestore()
				.collection("requests")
				.doc(this.id)
				.update({ status: "Rechazado" })
				.catch((err) => console.error(err));
		},
		async deleteRequest() {
			await firebase
				.firestore()
				.collection("requests")
				.doc(this.id)
				.delete()
				.catch((err) => console.error(err));
		},
		async finishRequest() {
			const docInfo = await firebase
				.firestore()
				.collection("requests")
				.doc(this.id)
				.get()
				.catch((err) => console.error(err));
			const request = docInfo.data();
			if (this.isDeliver) {
				if (request.received) {
					await this.processExchange();
				} else {
					this.deliverRequest();
				}
			} else {
				if (request.delivered) {
					await this.processExchange();
				} else {
					this.receiveRequest();
				}
			}
		},
		async deliverRequest() {
			await firebase
				.firestore()
				.collection("requests")
				.doc(this.id)
				.update({ delivered: true })
				.catch((err) => console.error(err));
		},
		async receiveRequest() {
			await firebase
				.firestore()
				.collection("requests")
				.doc(this.id)
				.update({ received: true })
				.catch((err) => console.error(err));
		},
		async processExchange() {
			try {
				await this.createExchange();
				await this.deleteRequest();
				await this.deleteBook();
				await this.chargeCredits();
			} catch (err) {
				console.error(`Error @processingExchange: ${err.message}`);
			}
		},
		async createExchange() {
			const doc = {
				requestor: this.requestor,
				owner: this.owner,
				book: this.book,
				bookImage: this.bookImage,
				bookCredits: this.bookCredits,
				date: moment()
					.utc()
					.valueOf(),
			};
			await firebase
				.firestore()
				.collection("exchanges")
				.doc()
				.set(doc)
				.catch((err) => console.error(err));
		},
		async deleteBook() {
			await firebase
				.firestore()
				.collection("books")
				.doc(this.book)
				.delete()
				.catch((err) => console.error(err));
		},
		async chargeCredits() {
			const requestorInfo = await firebase
				.firestore()
				.collection("users")
				.doc(this.requestor)
				.get()
				.catch((err) => console.error(err));
			const requestor = requestorInfo.data();

			const ownerInfo = await firebase
				.firestore()
				.collection("users")
				.doc(this.owner)
				.get()
				.catch((err) => console.error(err));
			const owner = ownerInfo.data();

			firebase
				.firestore()
				.collection("users")
				.doc(this.requestor)
				.update({ credits: requestor.credits - this.bookCredits })
				.then(() => {
					firebase
						.firestore()
						.collection("users")
						.doc(this.owner)
						.update({ credits: owner.credits + this.bookCredits })
						.catch((err) => console.error(err));
				})
				.catch((err) => console.error(err));
		},
	},
	mounted() {
		this.userEmail = firebase.auth().currentUser.email;
		this.otherUser = this.isDeliver ? this.requestor : this.owner;
	},
};
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

#creditAmount {
	font-size: xx-large;
}
</style>
