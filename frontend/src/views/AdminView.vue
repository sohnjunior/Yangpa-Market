<template>
<v-container>
  <v-data-table :headers="headers" :items="userlist" >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>유저 목록</v-toolbar-title>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small @click="deleteUser(item)">
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
  </v-container>
</template>

<script>
import { getallUser } from '../api/index'

export default {
  data() {
    return {
      dialog: false,
      headers: [
        { text: "Email", align:"start", value: "email", sortable: false },
        { text: "닉네임", align:"start", value: "nickname", sortable: false },
        { text: "전화번호", align:"start", value: "phone", sortable: false },
        { text: "성별", align:"start", value: "sex", sortable: false },
        { text: "생년월일", align:"start", value: "birthday", sortable: false },
        { text: "Actions", align:"end", value: "actions", sortable: false },
      ],
      userlist:[],
      idx:0,
    }
  },
  async created() {
    const { data } = await getallUser();
    this.userlist = data;
    console.log(this.userlist);
  },
  method:{
    deleteUser(item) {
      const index = this.userlist.indexOf(item);
      confirm("Are you sure you want to delete this user?") &&
        this.userlist.splice(index, 1);
    },
  }
}
</script>

<style>

</style>