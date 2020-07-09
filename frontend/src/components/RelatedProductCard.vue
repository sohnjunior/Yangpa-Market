<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      color="grey lighten-4"
      width="240"
      height="270"
    >
      <v-img
        :aspect-ratio="16/9"
        :src="image"
      >
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-1 white--text"
            style="height: 100%;"
          >
            ₩{{price}}
          </div>
        </v-expand-transition>
      </v-img>
      <v-card-text
        style="position: relative;"
      >
        <v-btn
          absolute
          color="orange"
          class="white--text"
          fab
          normal
          right
          top
          @click="move"
        >
        <v-icon>mdi-cursor-default-click-outline</v-icon>
        </v-btn>
        <h3 class="font-weight-medium orange--text mb-2">{{ title }}</h3>
        <div class="font-weight-regular mb-2 text-truncate">
          {{ body }}
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>

export default {
  props: ['title', 'image', 'body', 'hit', 'price', 'productID'],
  methods: {
    move() {
      this.$router.push(`/product/${this.productID}`);
      this.$router.go(0);  // refresh
    }
  }
}
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
</style>