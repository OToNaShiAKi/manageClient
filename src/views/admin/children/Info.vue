<template>
  <v-container>
    <v-subheader class="mt-6">修改信息</v-subheader>
    <v-text-field label="姓名" v-model="name" />
    <v-text-field label="手机号" v-model="phone" />
    <v-btn color="primary" outlined @click="changeInfo" class="float-right">
      提交
    </v-btn>
    <v-subheader class="mt-6">修改密码</v-subheader>
    <v-text-field label="原密码" type="password" v-model="old" />
    <v-text-field label="新密码" type="password" v-model="password" />
    <v-btn color="primary" outlined @click="changePassword" class="float-right">
      提交
    </v-btn>
  </v-container>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

const phoneRule = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;

export default {
  name: "Info",
  data: () => ({
    name: "",
    phone: "",
    old: "",
    password: ""
  }),
  mounted() {
    const admin = this.$store.state.admin;
    if (admin._id) {
      this.name = admin.name;
      this.phone = admin.phone;
    }
  },
  methods: {
    ...mapActions(["AccountInfo"]),
    ...mapMutations(["Notify"]),
    changeInfo() {
      if (!this.name.length) return this.Notify({ message: "请输入姓名" });
      if (!phoneRule.test(this.phone))
        return this.Notify({ message: "手机号不合法" });
      this.AccountInfo({
        name: this.name,
        phone: this.phone,
        _id: this.$store.state.admin._id
      });
    },
    changePassword() {
      const admin = this.$store.state.admin;
      if (this.old != admin.password)
        return this.Notify({ message: "原密码错误" });
      if (!this.password.length)
        return this.Notify({ message: "请输入新密码" });
      this.AccountInfo({
        password: this.password,
        _id: admin._id
      });
    }
  }
};
</script>
