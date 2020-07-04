<template>
  <v-card
    width="195"
    color="white"
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline" id="title">{{ title }}</v-list-item-title>
        <v-list-item-subtitle id="writer">{{ writer }}</v-list-item-subtitle> <br>
        <v-list-item-subtitle id="hit">조회수 : {{ hit }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-img
      alt="이미지"
      :src="image"
      height="170"
    ></v-img>
    
    <v-card-actions>
      <v-row justify="center">
        <v-btn
          rounded
          depressed
          width="100" 
          color="warning"
          :to="`/product/${productID}`"
        >
          보러가기
        </v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  props: ['title', 'image', 'hit', 'writer', 'productID'],
}
</script>

<style scoped>
#title {
  color: black;
}
#writer {
  color:black
}
#hit {
  color: black;
}
</style>