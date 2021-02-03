<template>
  <BaseCard>
    <template v-slot:card-body>
      <h1 class="card-title">판매자 정보</h1>
      <Icon filename="user" width="35" height="35" />
      <span class="contact">닉네임 : {{ user.nickname }}</span>
      <span class="contact">이메일 : {{ user.email }}</span>
    </template>
  </BaseCard>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Icon from '@components/Common/Icon.vue';
import BaseCard from '@components/Cards/BaseCard.vue';
import { IUserInfo } from '../types';

@Component({
  components: { Icon, BaseCard },
})
export default class SellerInfoCard extends Vue {
  @Prop({ required: true }) readonly user!: IUserInfo;
}
</script>

<style lang="scss">
.card-title {
  font-size: 1.25rem;
  font-weight: 500;
}

.contact {
  font-size: 1rem;
  font-weight: 500;
  color: #808080;
}
</style>
