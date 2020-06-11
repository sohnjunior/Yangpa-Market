<template>
  <v-form>
      <h1>New User</h1>
      <div>
          <label for="email">E-mail</label>
          <input id = "email" type="text" v-model="email"/>
      </div>
      <div>
          <label for="password">비밀번호</label>
          <input id = "password" type="password" v-model="password"/>
      </div>
      <div>
          <label for="passwordcheck">비밀번호 확인</label>
          <input id = "passwordcheck" type="password" v-model="passwordcheck"/>
      </div>
      <div>
          <label for="nickname">닉네임</label>
          <input id = "nickname" type="text" v-model="nickname"/>
      </div>
      <div>
          <label for="phone">전화번호</label>
          <input id = "phone" type="text" v-model="phone"/>
      </div>
      <div>
          <label for="sex">성별</label>
          
          <input id = "sex" type="radio" value="male" v-model="sex"/>
          <label for="male">남</label>
          
          <input id = "sex" type="radio" value="female" v-model="sex"/>
          <label for="female">여</label>
      </div>
      <div>
          <label for="birthday">생년월일</label>
          <input id = "birthday" type="date" v-model="birthday"/>
      </div>
      <div>
          <label for="admin">관리자</label>

          <input id = "admin" type="checkbox" v-model="admin"/>
          <label for="admin">예</label>
      </div>
      <v-btn @click="submitForm">가입하기</v-btn>
  </v-form>
</template>

<script>
import { registerUser } from '../api/index';

export default {
    data() {
        return {
            email: '',
            password:'',
            passwordcheck:'',
            nickname:'',
            phone:'',
            sex : '',
            birthday : '',
            admin:'',
        }
    },
    methods: {
        async submitForm() {
            console.log('Hello');
            //비밀번호 확인, 이메일, 닉네임 필히 기재 알람 필요

            const userData = {
                email : this.email,
                password : this.password,
                nickname : this.nickname,
                phone : this.phone,
                sex : this.sex,
                birthday : this.birthday,
                admin : this.admin,
            }

            try {
                const { data } = await registerUser(userData);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<style>

</style>