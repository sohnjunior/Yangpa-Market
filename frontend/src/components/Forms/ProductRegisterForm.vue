<template>
  <form class="form-container" @submit.prevent="onSubmit">
    <fieldset>
      <section>
        <label>
          상품명
          <input type="text" v-model="title" placeholder="어떤 상품인가요?" />
        </label>
      </section>

      <section>
        <label>
          상품 카테고리
          <select v-model="category">
            <option v-for="(option, index) in categoryOptions" :key="index" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </label>
      </section>

      <section>
        <label>
          상품 사진
          <input type="file" @change="onSelectFile" />
        </label>
      </section>

      <section>
        <label>
          희망 가격
          <input type="text" v-model="price" placeholder="상품 가격" />
        </label>
      </section>

      <section>
        <label>
          상품 설명
          <textarea class="" v-model="body" placeholder="상품 내용입력" />
        </label>
      </section>
    </fieldset>

    <SubmitButton :isValid="isValid"> 등록하기 </SubmitButton>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { CategoryOption } from '../../types';
import { ProductAPI } from '../../api';
import SubmitButton from '@components/Buttons/SubmitButton.vue';

const ruleMap = {
  titleRules: [(v) => !!v || '상품명을 입력해주세요'],
  priceRules: [(v) => !!v || '가격을 입력해주세요'],
  bodyRules: [(v) => !!v || '상품에 대해 설명해주세요'],
  categoryRules: [(v) => !!v || '상품군이 무엇인가요?'],
  fileRules: [(v) => !!v || '상품 사진이 필요해요'],
};

@Component({
  components: { SubmitButton },
})
export default class ProductRegisterForm extends Vue {
  private isValid: boolean = true; // TODO: form 유효성 검사 기능 추가하기
  private title: string = '';
  private image: string = '';
  private category: string = '';
  private price: string = '';
  private body: string = '';
  private categoryOptions: CategoryOption[] = [
    { text: '회원권', value: 'tick' },
    { text: '원룸', value: 'rooms' },
    { text: '전공서적', value: 'books' },
    { text: '의류', value: 'clothes' },
    { text: '기타', value: 'others' },
  ];
  private rules = ruleMap;

  async onSubmit() {
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('image', this.image);
    formData.append('category', this.category);
    formData.append('body', this.body);
    formData.append('price', this.price);

    try {
      await ProductAPI.createNewProduct(formData);
      this.$router.push('/');
    } catch (err) {
      console.log(err);
    }
  }

  public onSelectFile(file) {
    this.image = file;
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/mixins';

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    @include form-label();

    input,
    select,
    textarea {
      @include form-inputs();
    }
  }
}
</style>
