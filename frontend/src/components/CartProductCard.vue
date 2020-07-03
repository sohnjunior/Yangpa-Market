<template>
  <v-card
    max-width="600"
    outlined
    class="elevation-1"
  >
    <v-row>
      <v-col cols="auto" class="ml-5 mr-2">
        <v-img 
          height="100"
          width="100"
          :src="image"/>
      </v-col>
      <v-col cols="6">
        <v-row class="mt-2">
          {{ name }}
        </v-row>
        <v-row class="mt-2">
          <b :style="[status ? soldOut : onSale]">{{ statusMessage }}</b>
        </v-row>
      </v-col>
      <v-col cols="3">
        <v-row>
          <b class="ml-4">₩ {{ price }}</b>
        </v-row>
        <v-spacer class="mt-3"></v-spacer>
        <v-row>
          <v-btn class="ml-4" small color="teal" tile outlined @click="deleteProduct">바구니에서 삭제</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      onSale: {
        color: 'darkseagreen',
      },
      soldOut: {
        color: 'crimson',
      },
    }
  },
  props: ['id', 'name', 'price', 'image', 'status'],
  computed: {
    statusMessage() {
      return this.status ? '판매완료' : '판매중';
    }
  },
  methods: {
    deleteProduct() {
      this.$emit('deleteProduct', this.id);
      this.$router.go(0);
    }
  }
}
</script>

<style>
</style>