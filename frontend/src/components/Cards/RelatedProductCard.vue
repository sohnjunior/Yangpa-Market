<template>
  <BaseCard>
    <template v-slot:body>
      <div>
        <img alt="상품 이미지" :src="image" />
        <em>₩{{ price }}</em>
      </div>
    </template>
    <template v-slot:card-footer>
      <div>
        <button @click="move">
          <v-icon>mdi-cursor-default-click-outline</v-icon>
        </button>
        <h3>{{ title }}</h3>
        <p>
          {{ body }}
        </p>
      </div>
    </template>
  </BaseCard>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BaseCard from '@components/Cards/BaseCard.vue';

@Component({
  components: { BaseCard },
})
export default class RelatedProductCard extends Vue {
  @Prop({ required: true }) readonly title!: string;
  @Prop({ required: true }) readonly image!: string;
  @Prop({ required: true }) readonly body!: string;
  @Prop({ required: true }) readonly hit!: number;
  @Prop({ required: true }) readonly price!: string;
  @Prop({ required: true }) readonly productID!: string;

  public move(): void {
    this.$router.push(`/product/${this.productID}`);
    this.$router.go(0);
  }
}
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
