<template>
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        fab
        dark
        large
        color="pink"
        fixed
        right
        bottom
        to="/product/new"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <span>새로운 상품을 등록해보세요!</span>
  </v-tooltip>
</template>

<script>
export default {};
</script>

<style></style>
