<template>
  <BaseModal :isOpen="show" @click:outside="closeDialog">
    <template v-slot:modal-header>
      <h1>{{ title }}</h1>
      <button @click="closeDialog">
        <v-icon>mdi-close-circle</v-icon>
      </button>
    </template>
    <template v-slot:modal-content>
      <div>
        <h2>포토리뷰</h2>
        <img alt="후기 이미지" :src="image" class="review-image" />

        <h2>작성자</h2>
        <div>
          <v-icon small>mdi-account</v-icon>
          {{ writer }}
        </div>

        <h2>평점</h2>
        <v-rating
          :value="rating"
          class="ml-8"
          background-color="amber lighten-3"
          color="amber"
          dense
          half-increments
          readonly
          size="25"
        />

        <h2>상품평</h2>
        <div>
          {{ body }}
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BaseModal from '@components/Modals/BaseModal.vue';

@Component({
  components: { BaseModal },
})
export default class ReviewModal extends Vue {
  @Prop({ required: true }) readonly show!: boolean;
  @Prop({ required: true }) readonly title!: string;
  @Prop({ required: true }) readonly writer!: string;
  @Prop({ required: true }) readonly image!: string;
  @Prop({ required: true }) readonly body!: string;
  @Prop({ required: true }) readonly rating!: number;
  @Prop({ required: true }) readonly like!: number;

  public closeDialog(): void {
    this.$emit('close-dialog');
  }
}
</script>

<style lang="scss" scoped>
.review-image {
  width: 250px;
  height: 200px;
}
</style>
