<template>
  <div>
    <v-app-bar color="white" shrink-on-scroll prominent app>
      <v-btn color="primary" icon @click="$router.back()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-app-bar-nav-icon color="primary" @click="drawer = !drawer" />
      <v-toolbar-title class="primary--text title">
        {{ title }}
      </v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer disable-resize-watcher v-model="drawer" app>
      <v-list-item>
        <v-list-item-avatar>
          <v-icon color="primary">mdi-account-circle</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title">{{ admin.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ admin.phone }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list shaped>
        <v-subheader>界面列表</v-subheader>
        <v-list-item
          color="primary"
          v-for="route in routes"
          :key="route.to"
          :to="route.to"
          :exact="true"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ route.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ route.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-logout-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content @click="dialog = !dialog">
            <v-list-item-title>退出登录</v-list-item-title>
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
          <v-btn color="primary" text @click="logout">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Admin",
  data: () => ({
    drawer: false,
    dialog: false,
    routes: [
      {
        title: "借用管理",
        to: "/admin",
        icon: "mdi-clipboard-list-outline"
      },
      {
        title: "添加 / 编辑",
        to: "/admin/edit",
        icon: "mdi-file-edit-outline"
      },
      {
        title: "个人信息",
        to: "/admin/info",
        icon: "mdi-information-outline"
      },
      {
        title: "历史记录",
        to: "/admin/history",
        icon: "mdi-history"
      }
    ]
  }),
  created() {
    if (this.admin._id && !this.login) {
      const login = {
        account: this.admin.name || this.admin.phone,
        password: this.admin.password,
        adminId: this.admin._id
      };
      this.AdminLogin(login);
    } else if (!this.login) this.$router.replace("/login");
  },
  computed: {
    ...mapState(["admin", "login"]),
    title() {
      let name = this.$route.name,
        title = "管理界面";
      if (name == "AdminList") title = "借用管理";
      else if (name == "Info") title = "个人信息";
      else if (name == "Edit") title = "添加 / 编辑";
      else if (name == "History") title = "历史记录";
      return title;
    }
  },
  methods: {
    ...mapActions(["AdminLogin", "AdminLogout"]),
    logout() {
      if (this.admin._id) this.AdminLogout();
      else this.$router.replace("/login");
      this.dialog = false;
    }
  }
};
</script>
