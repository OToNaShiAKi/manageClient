<template>
  <v-app>
    <v-progress-linear
      indeterminate
      color="primary"
      absolute
      :active="progress"
    />
    <router-view />
    <v-snackbar
      :color="notify.type"
      :timeout="1500"
      v-model="notify.show"
      top
      dark
    >
      {{ notify.message }}
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import { getItem } from "./plugins/storage";

export default {
  name: "App",
  computed: { ...mapState(["notify", "progress"]) },
  created() {
    let admin = this.$store.state.admin;
    if (!admin._id) {
      admin = GetItem("admin");
      if (admin.account && admin.password) this.$store.dispatch("Login", admin);
    }
  },
};
</script>