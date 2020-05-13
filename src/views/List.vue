<template>
  <v-container>
    <v-subheader class="primary--text">借用列表</v-subheader>
    <v-text-field
      clearable
      prepend-icon="mdi-calendar-search"
      v-model="search"
    />
    <v-data-table
      :headers="headers"
      :items="lists"
      item-key="_id"
      no-results-text="无符合条件借用记录"
      no-data-text="暂无借用记录"
      :items-per-page="-1"
      hide-default-footer
      :search="search"
    />
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "AdminList",
  data: () => ({
    search: "",
    headers: [
      { text: "借用人", value: "name" },
      { text: "电话", value: "phone" },
      { text: "时间", value: "time" },
      { text: "教室", value: "house" },
      { text: "日期", sortable: false, value: "date" },
      { text: "用途", sortable: false, value: "purpose" }
    ]
  }),
  computed: { ...mapState(["lists"]) },
  created() {
    this.$store.dispatch("GetList");
  }
};
</script>
