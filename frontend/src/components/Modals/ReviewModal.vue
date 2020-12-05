<template>
  <BaseModal :isOpen="show">
    <template v-slot:modal-header>
      <div class="modal-header-wrapper">
        <h1 class="modal-title">{{ title }}</h1>
        <button class="close-btn" @click="closeDialog">
          <v-icon>mdi-close-circle</v-icon>
        </button>
      </div>
    </template>
    <template v-slot:modal-content>
      <div class="modal-content-wrapper">
        <section>
          <h2 class="subtitle">포토리뷰</h2>
          <img class="review-image" alt="후기 이미지" :src="image" />
        </section>
        <section>
          <h2 class="subtitle">작성자</h2>
          <div>
            <v-icon small>mdi-account</v-icon>
            {{ writer }}
          </div>
        </section>
        <section>
          <h2 class="subtitle">평점</h2>
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
        </section>
        <section>
          <h2 class="subtitle">상품평</h2>
          <p>
            {{ body }}
          </p>
        </section>
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
@import '../../assets/scss/mixins';

.modal-header-wrapper {
  display: flex;

  .modal-title {
    @include modal-title();
  }

  .close-btn {
    @include modal-close-btn();
  }
}

.modal-content-wrapper {
  section {
    margin: 20px 0px;
  }

  .subtitle {
    font-size: 1.2rem;
    font-weight: 500;
    color: #808080;
  }

  .review-image {
    width: 300px;
    height: 200px;
    object-fit: cover;
  }
}
</style>
