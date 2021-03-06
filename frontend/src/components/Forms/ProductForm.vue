<template>
  <form class="form-container" @submit.prevent="onSubmit">
    <fieldset class="form-fieldset">
      <section>
        <ImageInput :init-values="formData.images" @change="onChangeFile" />
        <span class="error" v-show="!validation.images.isValid">
          {{ validation.images.message }}
        </span>
      </section>

      <section>
        <label>
          상품명
          <input type="text" v-model="formData.name" placeholder="어떤 상품인가요?" />
        </label>
        <span class="error" v-show="!validation.name.isValid">
          {{ validation.name.message }}
        </span>
      </section>

      <section>
        <label>
          카테고리
          <select v-model="formData.category">
            <option v-for="(option, index) in categoryOptions" :key="index" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </label>
      </section>

      <section>
        <label>
          희망 가격
          <input type="text" v-model="formData.price" placeholder="상품 가격" />
        </label>
        <span class="error" v-show="!validation.price.isValid">
          {{ validation.price.message }}
        </span>
      </section>

      <section>
        <label>
          상품 설명
          <textarea class="" v-model="formData.description" placeholder="상품 내용입력" />
        </label>
        <span class="error" v-show="!validation.description.isValid">
          {{ validation.description.message }}
        </span>
      </section>
    </fieldset>

    <SubmitButton :isValid="isFormValid"> 등록하기 </SubmitButton>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import ImageInput from '@components/Inputs/ImageInput.vue';
import SubmitButton from '@components/Buttons/SubmitButton.vue';
import { IProductForm, ICategoryOption } from '../../types';
import { validateTextMinLength, validatePrice } from '../../utils/validators';

interface IValidation {
  isValid: boolean;
  message: string;
}

interface IProductValidation {
  images: IValidation;
  name: IValidation;
  price: IValidation;
  description: IValidation;
}

@Component({
  components: { ImageInput, SubmitButton },
})
export default class ProductForm extends Vue {
  @Prop({ required: false, default: false }) readonly isEditMode!: boolean;
  @Prop({ required: false }) readonly initalFormData!: IProductForm;

  private formData: IProductForm = {
    images: [],
    name: '',
    category: '',
    price: '',
    description: '',
  };
  private categoryOptions: ICategoryOption[] = [
    { text: '회원권', value: 'tickets' },
    { text: '원룸', value: 'rooms' },
    { text: '전공서적', value: 'books' },
    { text: '의류', value: 'clothes' },
    { text: '기타', value: 'others' },
  ];
  private validation: IProductValidation = {
    images: { isValid: false, message: '' },
    name: { isValid: false, message: '' },
    price: { isValid: false, message: '' },
    description: { isValid: false, message: '' },
  };

  get isFormValid() {
    return Object.values(this.validation).every((v) => v.isValid);
  }

  public created() {
    if (!this.isEditMode) return;
    this.initFormData();
  }

  private initFormData() {
    this.formData = this.initalFormData;
  }

  public onChangeFile(files: File[]) {
    this.formData.images = files;
  }

  public onSubmit() {
    this.$emit('submit', this.formData);
  }

  @Watch('formData.images')
  public onWatchImages(images: File[]) {
    const isValid = images.length > 0;

    this.validation.images.isValid = isValid;
    this.validation.images.message = isValid ? '' : '최소 1개의 상품 이미지가 필요합니다.';
  }

  @Watch('formData.name')
  public onWatchName(value: string) {
    const isValid = validateTextMinLength(value, 1);

    this.validation.name.isValid = isValid;
    this.validation.name.message = isValid ? '' : '상품명을 확인해주세요';
  }

  @Watch('formData.price')
  public onWatchPrice(value: string) {
    const isValid = validatePrice(value);

    this.validation.price.isValid = isValid;
    this.validation.price.message = isValid ? '' : '가격을 확인해주세요';
  }

  @Watch('formData.description')
  public onWatchDescription(value: string) {
    const isValid = validateTextMinLength(value, 10);

    this.validation.description.isValid = isValid;
    this.validation.description.message = isValid ? '' : '상품에 대해 설명해주세요(10자 이상)';
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins';

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .form-fieldset {
    width: inherit;
    margin-bottom: 50px;

    label {
      @include form-label();

      input,
      select,
      textarea {
        width: inherit;
        margin: 10px 0px;
        padding: 15px 20px;
        border: 1px solid #efefef;
        border-radius: 5px;
        background-color: white;
        font-size: 1rem;
        font-weight: 500;

        &::placeholder {
          font-size: 1rem;
          font-weight: 500;
        }
      }
    }

    .error {
      @include error-message();
    }
  }
}
</style>
