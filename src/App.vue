<template>
  <v-app>
    <v-snackbar top v-model="snack.show" :color="snack.type" :timeout="2000">{{snack.message}}</v-snackbar>
    <router-view />
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState(["snack"])
  },
  created() {
    this.$store.dispatch("GetList");
  }
};
</script>
