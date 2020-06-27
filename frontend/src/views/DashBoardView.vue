<template>
  <v-row>
    <v-col cols="3">
      <v-navigation-drawer
      absolute
      :color = "color"
      permanent
      class="d-none d-md-flex text-center"
      >
      <v-list
        dense
        nav
        class="py-0"
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="`/dashboard/${item.to}`"
          link
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
      items: [
        {
          title: '장바구니',
          to: 'cart',
        },
        {
          title: '구매내역',
          to: 'order',
        },
        {
          title: '프로필 관리',
          to: 'profile',
        },
      ],
      color : 'red lighten-5',
    }
  }
}
</script>

<style>
</style>