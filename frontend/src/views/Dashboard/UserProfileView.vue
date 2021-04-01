<template>
  <div>
    <h1 class="view-title">⚙️ 프로필 설정</h1>
    <UserProfileForm />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserProfileForm from '@components/Forms/UserProfileForm.vue';

@Component({
  components: { UserProfileForm },
})
export default class UserProfileView extends Vue {}
</script>

<style lang="scss" scoped>
.view-title {
  margin-bottom: 20px;
  font-size: 1.7rem;
  font-weight: 600;
}
</style>
