<template>
  <v-content class="pt-5">
    <v-row>
      <v-col cols="3">
        <v-navigation-drawer absolute permanent class="d-none d-md-flex text-center">
          <v-list dense nav class="py-0">
            <v-subheader class="sub-title">내 결제</v-subheader>
            <v-list-item
              v-for="item in orders"
              :key="item.title"
              :to="`/dashboard/${item.to}`"
              link
              color="primary"
              class="sub-title"
            >
              <v-list-item-content>
                <v-list-item-title style="font-size: 0.9rem">
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider />

            <v-subheader class="sub-title">설정</v-subheader>
            <v-list-item
              v-for="item in profile"
              :key="item.title"
              :to="`/dashboard/${item.to}`"
              link
              color="primary"
              class="sub-title"
            >
              <v-list-item-content>
                <v-list-item-title style="font-size: 0.9rem">
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-col>
      <v-col>
        <div class="pt-2 pr-12">
          <router-view />
        </div>
      </v-col>
    </v-row>
  </v-content>
</template>

<script>
const orders = [
  {
    title: '장바구니',
    to: 'cart',
  },
  {
    title: '판매 관리',
    to: 'selling',
  },
  {
    title: '구매 관리',
    to: 'buying',
  },
  {
    title: '알림',
    to: 'alarm',
  },
];

const profile = [
  {
    title: '프로필 설정',
    to: 'profile',
  },
];

export default {
  created() {
    this.orders = orders;
    this.profile = profile;
  },
};
</script>

<style></style>
