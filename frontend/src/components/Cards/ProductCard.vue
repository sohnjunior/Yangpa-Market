<template>
  <BaseCard @click="onRedirect">
    <template v-slot:card-title>
      <div class="product-header-wrapper">
        <h1 class="product-name">{{ title }}</h1>
        <h2 class="product-seller">
          <Avatar class="icon" :src="avatar ? avatar : undefined" />
          {{ seller }}
        </h2>
        <h2 class="product-meta">
          <Icon class="icon" filename="glasses" width="20" height="20" />
          {{ views }}
        </h2>
      </div>
    </template>
    <template v-slot:card-body>
      <div class="body-wrapper">
        <div class="image-wrapper">
          <img class="product-image" alt="상품 이미지" :src="image" />
        </div>
        <p class="product-detail">{{ body }}</p>
      </div>
    </template>
    <template v-slot:card-footer>
      <div class="footer-wrapper">
        <em>{{ price | commaSeparated }} 원</em>
        <div class="like-wrapper">
          <Icon filename="heart" width="15" height="15" />
          <span class="like-count">{{ likes }}</span>
        </div>
      </div>
    </template>
  </BaseCard>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Icon from '@components/Common/Icon.vue';
import Avatar from '@components/Common/Avatar.vue';
import BaseCard from '@components/Cards/BaseCard.vue';

@Component({
  components: { Icon, Avatar, BaseCard },
})
export default class ProductCard extends Vue {
  @Prop({ required: true }) title!: string;
  @Prop({ required: true }) image!: string;
  @Prop({ required: true }) body!: string;
  @Prop({ required: true }) views!: number;
  @Prop({ required: true }) seller!: string;
  @Prop({ required: true }) avatar!: string;
  @Prop({ required: true }) likes!: number;
  @Prop({ required: true }) price!: string;
  @Prop({ required: true }) productID!: string;

  public onRedirect() {
    this.$router.push(`/product/${this.productID}`);
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins';

.product-header-wrapper {
  width: 220px;

  .product-name {
    @include text-shorthand();
    padding: 5px 0px;
    font-size: 1.3rem;
    font-weight: 600;
  }

  .product-seller,
  .product-meta {
    display: flex;
    align-items: center;

    .icon {
      margin-right: 5px;
    }
  }

  .product-seller {
    margin-top: 7px;
    margin-bottom: 5px;
    font-size: 1rem;
    font-weight: 500;
  }

  .product-meta {
    font-size: 0.9rem;
    font-weight: 500;
    color: #808080;
  }
}

.body-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 220px;

  .image-wrapper {
    display: flex;
    justify-content: center;

    .product-image {
      width: 100%;
      height: 160px;
      margin: 20px 0px;
      border-radius: 10px;
      object-fit: cover;
    }
  }

  .product-detail {
    @include text-shorthand();
    padding: 5px 0px;
    font-size: 1rem;
    font-weight: 500;
  }
}

.footer-wrapper {
  display: flex;

  .like-wrapper {
    display: flex;
    align-items: center;
    margin-left: auto;

    .like-count {
      margin-left: 5px;
      font-size: 0.9rem;
    }
  }
}
</style>
