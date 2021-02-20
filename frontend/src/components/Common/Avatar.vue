<template>
  <img class="avatar" :src="src" alt="아바타 이미지" :width="width" :height="height" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class Avatar extends Vue {
  @Prop({ default: 'http://localhost:3000/images/profile/default.png' }) src!: string;
  @Prop({ default: 25 }) width!: number;
  @Prop({ default: 25 }) height!: number;
}
</script>

<style lang="scss" scoped>
.avatar {
  border-radius: 50%;
  object-fit: cover;
}
</style>
