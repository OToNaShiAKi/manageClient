<template>
  <v-container>
    <v-text-field
      clearable
      prepend-icon="mdi-calendar-search"
      v-model="search"
    />
    <v-data-table
      :headers="headers"
      :items="lists"
      item-key="_id"
      show-select
      no-results-text="无符合条件借用记录"
      no-data-text="暂无借用记录"
      :items-per-page="-1"
      hide-default-footer
      :search="search"
      @item-selected="selectItem"
      @toggle-select-all="selectAll"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            outlined
            @click="dialog = true"
            :disabled="!select.length"
          >
            {{ button ? "停" : "启" }}用选中
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          color="primary"
          small
          @click="$router.push({ name: 'Edit', params: { item } })"
        >
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog max-width="300" v-model="dialog">
      <v-card>
        <v-card-title>确认{{ button ? "停" : "启" }}用？</v-card-title>
        <v-card-text v-if="button">
          停用后，最后编辑该记录的管理员可在个人历史记录中查找该记录，并启用或重新编辑后启用。
        </v-card-text>
        <v-card-text v-else>
          若该时间段已被占用，则无法启用，需重新编辑时间段
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" text @click="dialog = false">取消</v-btn>
          <v-spacer />
          <v-btn color="primary" text @click="submit">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "AdminList",
  data: () => ({
    search: "",
    dialog: false,
    select: [],
    headers: [
      { text: "借用人", value: "name" },
      { text: "电话", value: "phone" },
      { text: "时间", value: "time" },
      { text: "教室", value: "house" },
      { text: "日期", sortable: false, value: "date" },
      { text: "用途", sortable: false, value: "purpose" },
      { text: "编辑", sortable: false, value: "actions" }
    ]
  }),
  props: {
    lists: {
      type: Array,
      require: true
    },
    button: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: "借用记录表"
    },
    move: {
      type: Function,
      require: true
    }
  },
  methods: {
    selectItem({ item, value }) {
      if (value) this.select.push(item._id);
      else this.select = this.select.filter(id => item._id != id);
    },
    selectAll({ items, value }) {
      this.select = [];
      if (value) for (let item of items) this.select.push(item._id);
    },
    submit() {
      this.move(this.select);
      this.dialog = false;
    }
  }
};
</script>
