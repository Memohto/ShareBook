<template>
	<b-card no-body class="overflow-hidden">
		<b-row no-gutters>
			<b-col md="5">
				<b-card-img
					:src="image"
					class="card-img-top"
					alt="Card image"
					height="300px"
				></b-card-img>
			</b-col>
			<b-col md="7">
				<b-card-body :title="title" :sub-title="author">
					<ul class="list-group list-group-flush">
						<li class="list-group-item" v-if="!isMine">
							<b>Propietario:</b> {{ owner }}
						</li>
						<li class="list-group-item"><b>Género:</b> {{ genre }}</li>
						<li class="list-group-item"><b>Condición:</b> {{ condition }}</li>
						<li class="list-group-item"><b>Creditos:</b> {{ credits }}</li>
						<li class="list-group-item">
							<b>Subido:</b> {{ formatDate(uploaded) }}
						</li>
					</ul>
					<div class="d-flex justify-content-end mt-4">
						<b-button v-if="isMine" variant="danger"
							><i class="far fa-trash-alt"></i
						></b-button>
						<b-button v-else variant="success" v-on:click="solicitar"
							>Solicitar libro</b-button
						>
					</div>
				</b-card-body>
			</b-col>
		</b-row>
	</b-card>
</template>

<script>
import moment from "moment";

export default {
	name: "Book",
	props: {
		image: String,
		title: String,
		author: String,
		credits: Number,
		condition: String,
		genre: String,
		uploaded: Number,
		owner: String,
		isMine: Boolean,
	},
	methods: {
		formatDate(unix) {
			return moment(unix)
				.locale("es")
				.format("l");
		},
		solicitar() {
			var otro = this.owner;
			this.$router.push({ path: `/chat/${otro}` });
		},
	},
};
</script>
