<template>
  <data-table :lists="lists" :move="MoveList" />
</template>

<script>
import { mapState, mapActions } from "vuex";
import DataTable from "./../components/DataTable.vue";

export default {
  name: "AdminList",
  computed: { ...mapState(["lists"]) },
  components: { DataTable },
  methods: { ...mapActions(["MoveList"]) }
};
</script>
