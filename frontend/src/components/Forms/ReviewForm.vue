<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <label for="review-title">
        제묵
        <input type="text" v-model="title" :rules="[(v) => !!v || '제목을 입력해주세요']" />
      </label>

      <label for="review-rating">
        평점
        <v-rating v-model="rating" color="amber" background-color="orange lighten-3" />
      </label>

      <label for="review-body">
        내용
        <textarea
          v-model="body"
          placeholder="생생한 후기를 남겨주세요!"
          :rules="[(v) => !!v || '후기를 작성해주세요']"
        />
      </label>

      <label for="review-file">
        사진 첨부
        <input type="file" @change="onChangeFile" />
      </label>
    </fieldset>

    <SubmitButton :isValid="isValid"> 후기 등록 </SubmitButton>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SubmitButton from '@components/Buttons/SubmitButton.vue';

@Component({
  components: { SubmitButton },
})
export default class ReviewForm extends Vue {
  private title: string = '';
  private body: string = '';
  private image: string = '';
  private rating: number = 0;
  private isValid: boolean = false;

  public onSubmit(): void {
    const payload = {
      title: this.title,
      body: this.body,
      image: this.image,
      rating: this.rating,
    };
    this.$emit('submit-form', payload);
  }

  public onChangeFile(file): void {
    this.image = file;
  }
}
</script>

<style></style>
