<template>
  <div class="profile-input-container">
    <label ref="avatarPreview" class="profile-preview" for="file-upload">
      <Icon class="icon" filename="camera" width="30" height="30" />
    </label>
    <input class="hidden" id="file-upload" type="file" @change="onChangeAvatar" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator';
import Icon from '@components/Common/Icon.vue';

@Component({
  components: { Icon },
})
export default class AvatarInput extends Vue {
  @Ref() avatarPreview!: HTMLLabelElement;

  public onChangeAvatar(e: Event) {
    const file = (e.target as HTMLInputElement).files[0];
    const imageURL = URL.createObjectURL(file);

    this.avatarPreview.style.backgroundImage = `url(${imageURL})`;
    this.$emit('change', file);
  }
}
</script>

<style lang="scss" scoped>
.profile-input-container {
  .profile-preview {
    position: relative;
    display: block;
    width: 80px;
    height: 80px;
    border: none;
    border-radius: 50%;
    background-image: url('http://localhost:3000/images/profile/default.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    cursor: pointer;

    .icon {
      position: absolute;
      bottom: 0px;
      right: 0px;
    }
  }

  .hidden {
    display: none;
  }
}
</style>
