<template>
  <v-hover
    v-slot:default="{ hover }"
  >
      <v-card
      max-width="260"
      max-height="420"
      class="card"
      :elevation="hover ? 12 : 2"
      @click="move"
      >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="headline">{{ title }}</v-list-item-title>
          <v-list-item-subtitle>{{ writer }}</v-list-item-subtitle> <br>
          <v-list-item-subtitle>조회수 : {{ hit }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-img
        alt="이미지"
        :src="image"
        height="190"
      ></v-img>

      <v-card-text>
        {{ price }} 원 <br>
        {{ body }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
          <v-icon color="pink">mdi-heart</v-icon>
          {{ like }}
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>

export default {
  props: ['title', 'image', 'body', 'hit', 'writer', 'like', 'price', 'productID'],
  methods: {
    move() {
      this.$router.push(`/product/${this.productID}`);
    }
  }
}
</script>

<style>
</style>