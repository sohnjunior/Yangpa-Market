<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      width="260"
      max-height="420"
      class="card"
      :elevation="hover ? 12 : 2"
      @click="move"
      style="background-color: rgba(255, 245, 238, 0.4)"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            style="font-family: 'Handon3gyeopsal300g'; font-size: 1.3rem"
            >{{ title }}</v-list-item-title
          >
          <v-list-item-subtitle
            style="font-size: 1rem; margin-top: 7px; margin-bottom: 5px"
            >{{ writer }}</v-list-item-subtitle
          >
          <br />
          <v-list-item-subtitle
            style="font-size: 1rem; font-family: 'HangeulNuri-Bold'"
          >
            <v-icon>mdi-eye-check-outline</v-icon> {{ hit }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-img alt="이미지" :src="image" height="170"></v-img>

      <v-card-text>
        <h3
          class="deep-orange--text text--lighten-3 font-weight-medium price-tag"
        >
          {{ price }} 원
        </h3>
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
  props: [
    'title',
    'image',
    'body',
    'hit',
    'writer',
    'like',
    'price',
    'productID',
  ],
  methods: {
    move() {
      this.$router.push(`/product/${this.productID}`);
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: 'Handon3gyeopsal300g';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_seven@1.2/Handon3gyeopsal300g.woff')
    format('woff');
  font-weight: normal;
  font-style: normal;
}
</style>