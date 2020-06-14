<template>
  <div>
    <v-row>
      <v-col>
        <v-card
        height="400"
        width = "256"
        class="overflow-hidden"
        >
          <v-navigation-drawer
            absolute
            :color = "color"
            dark
          >
            <v-list
              dense
              nav
              class="py-0"
            >
  
              <v-list-item
                v-for="item in items"
                :key="item.title"
                link
              >
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="10">
        <router-view></router-view>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { title: '위시리스트' },
        { title: '장바구니' },
        { title: '구매 내역' },
        { title: '프로필 수정' },
      ],
      color : 'primary',
    }
  }
}
</script>

<style>
</style>