<template>
  <div>
    <h3 class="text-center title pa-6">数院科技楼借用管理</h3>
    <v-card class="login mx-auto px-6 py-3">
      <v-tabs v-model="select" grow>
        <v-tab key="login">登录</v-tab>
        <v-tab key="register">注册</v-tab>
      </v-tabs>
      <v-tabs-items class="my-5" v-model="select">
        <v-tab-item key="login">
          <v-text-field v-model="login.account" label="用户名/手机号" />
          <v-text-field
            type="password"
            v-model="login.password"
            @keyup.enter="loginSubmit"
            label="密码"
          />
          <v-btn color="primary" @click="loginSubmit" block outlined rounded>
            登录
          </v-btn>
        </v-tab-item>
        <v-tab-item key="register">
          <v-text-field v-model="register.name" label="用户名" />
          <v-text-field
            type="tel"
            maxlength="11"
            counter="11"
            v-model="register.phone"
            label="手机号"
          />
          <v-text-field
            type="password"
            v-model="register.password"
            label="密码"
            @keyup.enter="registerSubmit"
          />
          <v-btn color="primary" @click="registerSubmit" block outlined rounded>
            注册
          </v-btn>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <p class="caption mx-auto pa-5 login">
      温馨提示：该网站由数院科协One
      Echo与雁祉作坊联合开发，如有任何使用问题或bug，请联系数院科协。
    </p>
  </div>
</template>

<script>
import { getItem } from "./../plugins/storage";
import { mapActions, mapMutations } from "vuex";

const phoneRule = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;

export default {
  name: "Login",
  data: () => ({
    select: "",
    login: {
      account: "",
      password: ""
    },
    register: {
      name: "",
      phone: "",
      password: ""
    }
  }),
  created() {
    const admin = getItem("admin");
    if (admin) {
      this.login.account = admin.name || admin.phone;
      this.login.password = admin.password;
    }
  },
  methods: {
    ...mapActions(["AdminLogin", "AdminRegister"]),
    ...mapMutations(["Notify"]),
    loginSubmit() {
      if (!this.login.account.length)
        return this.Notify({ message: "请输入姓名或手机号" });
      if (!this.login.password.length)
        return this.Notify({ message: "请输入密码" });
      this.AdminLogin(this.login);
    },
    registerSubmit() {
      if (!this.register.name.length)
        return this.Notify({ message: "请输入姓名" });
      if (!phoneRule.test(this.register.phone))
        return this.Notify({ message: "请输入手机号" });
      if (!this.register.password.length)
        return this.Notify({ message: "请输入密码" });
      this.AdminRegister(this.register);
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  max-width: 320px;
}
</style>
