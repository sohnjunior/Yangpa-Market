<template>
  <v-card
    max-width="270"
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
      <v-btn
        text
        color="deep-purple accent-4"
        :to="`/product/${productID}`"
      >
        확인
      </v-btn>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        장바구니 담기
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
        {{ like }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['title', 'image', 'body', 'hit', 'writer', 'like', 'price', 'productID']
}
</script>

<style>
</style>