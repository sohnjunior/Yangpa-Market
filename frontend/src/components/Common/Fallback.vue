<template functional>
  <div class="fallback-container">
    <img class="image" src="../../assets/images/working-man.png" alt="열심히 일하는 사람 이미지" />
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Fallback extends Vue {}
</script>

<style lang="scss" scoped>
.fallback-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 600;

  .image {
    width: 200px;
    height: 300px;
    object-fit: cover;
  }
}
</style>
