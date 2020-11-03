<template>
  <v-content>
    <v-container>
      <v-data-table :headers="headers" :items="userlist" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>유저 목록</v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="check(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-container>
  </v-content>
</template>

<script>
import { UserAPI } from '@api';

export default {
  data() {
    return {
      dialog: false,
      headers: [
        { text: 'Email', align: 'start', value: 'email', sortable: false },
        { text: '닉네임', align: 'start', value: 'nickname', sortable: false },
        { text: '전화번호', align: 'start', value: 'phone', sortable: false },
        { text: '성별', align: 'start', value: 'sex', sortable: false },
        {
          text: '생년월일',
          align: 'start',
          value: 'birthday',
          sortable: false,
        },
        { text: 'Delete', align: 'end', value: 'actions', sortable: false },
      ],
      userlist: [],
      idx: 0,
      email: '',
    };
  },

  async created() {
    const { data } = await UserAPI.fetchAllUser();

    this.userlist = data;
  },

  methods: {
    check(item) {
      confirm('해당 유저를 삭제하시겠습니까') && UserAPI.deleteUser(item);
    },

    async deleteUser(item) {
      const index = this.userlist.indexOf(item);

      const Todelete = { email: this.userlist[index].email };

      try {
        const { data } = await UserAPI.deleteUser(Todelete);
        console.log(data);
        this.$router.go(0);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
