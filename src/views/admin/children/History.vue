<template>
  <data-table
    :lists="history"
    :button="false"
    title="个人历史记录"
    :move="StartList"
  />
</template>

<script>
import { mapActions, mapState } from "vuex";
import DataTable from "./../components/DataTable.vue";

export default {
  name: "History",
  computed: { ...mapState(["history"]) },
  components: { DataTable },
  methods: { ...mapActions(["StartList"]) }
};
</script>
