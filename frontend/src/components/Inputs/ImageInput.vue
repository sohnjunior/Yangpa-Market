<template>
  <div class="image-input-container">
    <label class="input-label" for="file-upload">
      <Icon filename="upload" width="45" height="45" />
      <span class="label-text">사진 업로드</span>
    </label>
    <input id="file-upload" ref="fileInput" type="file" @change="onUploadFile" multiple />

    <ul class="image-preview-wrapper">
      <li class="image-wrapper" v-for="[key, file] in imageURLMap.entries()" :key="key">
        <img class="preview-image" alt="상품 이미지 미리보기" :src="convertToURL(file)" />
        <Icon
          class="close-icon"
          filename="close"
          @click="onDeleteImage(key)"
          width="20"
          height="20"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator';
import Icon from '@components/Common/Icon.vue';

@Component({
  components: { Icon },
})
export default class ImageInput extends Vue {
  @Ref() fileInput!: HTMLInputElement;

  private imageURLMap = new Map<string, File>();

  public convertToURL(file: File) {
    return URL.createObjectURL(file);
  }

  public onUploadFile(e: Event) {
    const files = (e.target as HTMLInputElement).files || [];

    for (let i = 0, len = files.length; i < len; i++) {
      const filename = files[i].name;

      if (!this.imageURLMap.has(filename)) {
        this.imageURLMap.set(filename, files[i]);
      }
    }

    this.$forceUpdate();
    this.$emit('change', [...this.imageURLMap.values()]);
  }

  public onDeleteImage(key: string) {
    this.imageURLMap.delete(key);
    this.$forceUpdate();
    this.$emit('change', [...this.imageURLMap.values()]);
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/variables';

.image-input-container {
  display: flex;
  width: 500px;

  @media screen and (max-width: $mobile-width) {
    & {
      width: 300px;
    }
  }

  .input-label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-basis: 30%;
    height: 100px;
    margin-right: 10px;
    border: 1px solid #efefef;
    border-radius: 5px;
    background-color: white;
    cursor: pointer;

    .label-text {
      margin-top: 10px;
      font-size: 0.8rem;
      font-weight: 600;
      color: #808080;
    }
  }

  input[type='file'] {
    display: none;
  }

  .image-preview-wrapper {
    display: flex;
    align-items: center;
    flex-basis: 70%;
    flex-wrap: nowrap;
    overflow-x: scroll;
    padding: 10px 20px;
    border: 1px solid #efefef;
    border-radius: 5px;
    background-color: white;

    .image-wrapper {
      position: relative;
      margin-right: 10px;

      .preview-image {
        width: 70px;
        height: 70px;
        border-radius: 5px;
        object-fit: cover;
      }

      .close-icon {
        position: absolute;
        top: 2px;
        right: 2px;
        cursor: pointer;
      }
    }
  }
}
</style>
