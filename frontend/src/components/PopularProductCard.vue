<template>
  <v-card
    width="195"
    color="white"
  >
    <v-list-item style="background-color: rgba(255, 245, 238, 0.4);">
      <v-list-item-content>
        <v-list-item-title style="font-family: 'Handon3gyeopsal300g'; font-size: 1.3rem" id="title">{{ title }}</v-list-item-title>
        <v-list-item-subtitle id="category">
          <v-chip
            class="mt-2 mb-1"
            color="success"
            outlined
            small
          >
           {{ category }}
          </v-chip>
        </v-list-item-subtitle> <br>
        <v-list-item-subtitle id="hit"><v-icon color="grey">mdi-eye-check-outline</v-icon>
          <span class="ml-1">{{ hit }}</span>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-img
      alt="이미지"
      :src="image"
      height="170"
    ></v-img>
    
    <v-card-actions style="background-color: rgba(255, 245, 238, 0.4);">
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
  props: ['title', 'image', 'hit', 'category', 'productID'],
}
</script>

<style scoped>
#title {
  color: black;
}
#category {
  color:black
}
#hit {
  color: grey;
  font-family: 'HangeulNuri-Bold'; 
}

@font-face { 
  font-family: 'Handon3gyeopsal300g'; 
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_seven@1.2/Handon3gyeopsal300g.woff') format('woff'); 
  font-weight: normal; 
  font-style: normal; 
}
</style>