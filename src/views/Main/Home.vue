<template>
  <div>
    <v-app-bar color="white" shrink-on-scroll prominent app flat>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title class="primary--text title">{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer disable-resize-watcher v-model="drawer" app>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="primary">mdi-account-circle</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="title">{{ admin.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ admin.phone }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list shaped>
        <v-subheader>界面列表</v-subheader>
        <v-list-item
          v-for="route in routes"
          :key="route.to"
          :to="route.to"
          :exact="true"
          link
          color="primary"
        >
          <v-list-item-icon>
            <v-icon>{{ route.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            {{ route.title }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view />
    </v-content>
    <v-dialog max-width="300" v-model="dialog">
      <v-card>
        <v-card-title>确认退出登录？</v-card-title>
        <v-card-text>退出登录后将清空登录数据，下次将无法自动登录</v-card-text>
        <v-card-actions>
          <v-btn color="error" text @click="dialog = false">取消</v-btn>
          <v-spacer />
          <v-btn color="primary" text>确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { /* mapActions, */ mapState } from "vuex";

const width = document.body.clientWidth > 1200;

export default {
  name: "Home",
  data: () => ({
    drawer: width,
    dialog: false,
    focus: "",
    routes: [
      {
        title: "借用管理",
        to: "/home/calendar",
        icon: "mdi-calendar-outline",
      },
      {
        title: "添加借用",
        to: "/home/edit",
        icon: "mdi-file-edit-outline",
      },
      {
        title: "个人信息",
        to: "/home/info",
        icon: "mdi-information-outline",
      },
      {
        title: "账户管理",
        to: "/home/account",
        icon: "mdi-account-outline",
      },
      {
        title: "教室管理",
        to: "/home/room",
        icon: "mdi-google-classroom",
      },
    ],
  }),
  /* created() {
    if (this.admin._id && !this.login) {
      const login = {
        account: this.admin.name || this.admin.phone,
        password: this.admin.password,
        adminId: this.admin._id,
      };
      this.AdminLogin(login);
      this.GetList();
    } else if (!this.login) this.$router.replace("/login");
  }, */
  computed: {
    ...mapState(["admin", "login"]),
    title() {
      const name = this.$route.name;
      let title = "管理界面";
      if (name == "Calendar") title = "借用管理";
      else if (name == "Info") title = "个人信息";
      else if (name == "Edit") title = "添加借用";
      else if (name == "History") title = "历史记录";
      return title;
    },
  },
  /* methods: {
    ...mapActions(["AdminLogin", "AdminLogout", "GetList"]),
    logout() {
      if (this.admin._id) this.AdminLogout();
      else this.$router.replace("/login");
      this.dialog = false;
    },
  }, */
};
</script>
