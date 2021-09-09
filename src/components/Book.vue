<template>
  <div class="card">
    <img :src="image" class="card-img-top" alt="Card image">
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ author }}</h6>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Creditos:  {{ credits }}</li>
      <li class="list-group-item">Condición:  {{ condition }}</li>
      <li class="list-group-item">Subido:  {{ uploaded }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Book',
  props: {
    image: String,
    title: String,
    author: String,
    credits: String,
    condition: String,
    uploaded: String
  }
}
</script>

