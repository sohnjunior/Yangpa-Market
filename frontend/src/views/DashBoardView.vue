<template>
  <v-row>
    <v-col cols="3">
      <v-navigation-drawer
      absolute
      permanent
      class="d-none d-md-flex text-center"
      >
      <v-list
        dense
        nav
        class="py-0"
      >
        <v-subheader>내 결제</v-subheader>
        <v-list-item
          v-for="item in orders"
          :key="item.title"
          :to="`/dashboard/${item.to}`"
          link
          color="primary"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-subheader>설정</v-subheader>
        <v-list-item
          v-for="item in profile"
          :key="item.title"
          :to="`/dashboard/${item.to}`"
          link
          color="primary"
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      </v-navigation-drawer>
    </v-col>
    <v-col>
      <v-content class="pt-2 pr-12">
        <router-view></router-view>
      </v-content>
    </v-col>
  </v-row>
</template>

<script>

export default {
  data () {
    return {
      orders: [
        {
          title: '장바구니',
          to: 'cart',
        },
        {
          title: '구매 및 판매 내역',
          to: 'order',
        },
      ],
      profile: [
        {
          title: '프로필 설정',
          to: 'profile',
        },
      ]
    }
  }
}
</script>

<style>
</style>