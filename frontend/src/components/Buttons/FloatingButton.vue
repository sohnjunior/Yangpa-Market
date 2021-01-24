<template>
  <div class="floating-container">
    <router-link to="/product/new">
      <span class="plus">&#43;</span>
    </router-link>
    <div class="tooltip">새로운 상품을 등록해보세요!</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class FloatingButton extends Vue {}
</script>

<style lang="scss" scoped>
.floating-container {
  position: fixed;
  bottom: 15px;
  right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  padding: 20px;
  background-color: #e64980;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  border: none;

  .plus {
    display: inline-block;
    font-size: 1.5rem;
    font-weight: 500;
    color: white;
  }

  .tooltip {
    display: none;
    position: absolute;
    top: -40px;
    left: -150px;
    padding: 5px 10px;
    border-radius: 10px;
    background-color: #868e96;
    font-size: 0.9rem;
    font-weight: 500;
    color: white;
  }

  &:hover {
    .tooltip {
      display: block;
      animation-name: scale-up;
      animation-duration: 0.3s;
    }
  }
}

@keyframes scale-up {
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
}
</style>
