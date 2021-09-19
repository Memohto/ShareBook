<template>
	<div>
		<SearchBar @search="findBook" />
		<b-container>
			<Catalog v-if="!searching" />
			<BookSearch
				v-else
				:key="renderSearch"
				:value="searchData.value"
				:costFilter="searchData.costFilter"
				:selectedCondition="searchData.selectedCondition"
				:selectedGenre="searchData.selectedGenre"
				@searchStoped="searching = false"
			/>
		</b-container>
	</div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import Catalog from "@/views/Catalog.vue";
import BookSearch from "@/views/BookSearch.vue";

export default {
	name: "Home",
	components: {
		SearchBar,
		Catalog,
		BookSearch,
	},
	data() {
		return {
			searching: false,
			renderSearch: true,
			searchData: {
				value: "",
				costFilter: false,
				selectedCondition: "Ninguno",
				selectedGenre: "Ninguno",
			},
		};
	},
	methods: {
		findBook(searchVal, costFilter, selectedCondition, selectedGenre) {
			this.searchData.value = searchVal;
			this.searchData.costFilter = costFilter;
			this.searchData.selectedCondition = selectedCondition;
			this.searchData.selectedGenre = selectedGenre;
			this.searching = true;
			this.renderSearch = !this.renderSearch;
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
	list-style-type: none;
}
</style>
