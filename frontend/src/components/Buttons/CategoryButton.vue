<template>
  <v-btn color="light-green lighten-4" depressed x-large @click="onClick">
    <v-img class="btn-image" :src="imageSrcMap[name]" />
    <span class="ml-2 category"> {{ name }} </span>
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

declare const require;

const imageSrcMap = {
  원룸: require('@/assets/room.svg'),
  전공서적: require('@/assets/study.svg'),
  회원권: require('@/assets/ticket.svg'),
  의류: require('@/assets/clothes.svg'),
  기타: require('@/assets/box.svg'),
};

@Component
export default class CategoryButton extends Vue {
  @Prop({ required: true }) readonly name!: string;

  private imageSrcMap = imageSrcMap;

  public onClick() {
    this.$emit('click', this.name);
  }
}
</script>

<style scoped>
.btn-image {
  width: 30px;
  height: 30px;
}
</style>
