<template>
  <ul class="list-container">
    <li
      class="list-item"
      v-for="product in products"
      :key="product.id"
      @click="onRedirect(product.id)"
    >
      <img class="thumbnail" alt="상품 이미지" :src="product.photos[0].path" />
      <div class="detail">
        <h1 class="name">{{ product.name }}</h1>
        <h2 class="price">{{ product.price }} 원</h2>
        <p class="description">{{ product.description }}</p>
        <!-- TODO: 지난 일수 계산 후 출력하기 <span>{{ product.updatedAt }}</span> -->
        <div class="meta">
          <span class="like">
            <Icon filename="like" width="13" height="13" />
            {{ product.likes }}
          </span>
          <span class="hit">
            <Icon filename="glasses" width="13" height="13" />
            {{ product.views }}
          </span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Icon from '@components/Common/Icon.vue';
import { IProduct } from '../../types';

@Component({
  components: { Icon },
})
export default class ProductList extends Vue {
  @Prop({ required: true }) readonly products!: IProduct[];

  public onRedirect(productID: string) {
    this.$router.push(`/product/${productID}`);
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  padding: 10px 0px;

  .list-item {
    display: flex;
    align-items: center;
    padding: 15px 0px;

    .thumbnail {
      width: 95px;
      height: 95px;
      margin-right: 15px;
      border-radius: 12px;
      object-fit: cover;
    }

    .detail {
      width: 100%;

      .name {
        font-size: 1rem;
        font-weight: 600;
      }

      .price {
        font-size: 0.8rem;
        font-weight: 500;
      }

      .description {
        margin-top: 7px;
        font-size: 0.8rem;
        font-weight: 400;
      }

      .meta {
        font-size: 0.8rem;
        font-weight: 400;

        .like {
          margin-right: 10px;
          margin-left: 65%;
        }
      }
    }
  }
}
</style>
