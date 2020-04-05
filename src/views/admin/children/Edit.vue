<template>
  <v-container class="mt-6">
    <v-text-field v-model="list.name" label="借用人" />
    <v-text-field v-model="list.phone" label="手机号" />
    <v-select :items="houses" v-model="list.house" label="教室" />
    <v-select
      v-if="!list.day.length"
      messages="无选中则不重复"
      small-chips
      :items="repeat"
      v-model="list.repeat"
      label="重复"
      multiple
    />
    <v-menu
      v-if="!list.repeat.length"
      v-model="menu"
      :close-on-content-click="false"
      max-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-combobox
          v-model="list.day"
          multiple
          small-chips
          label="选择日期"
          readonly
          v-on="on"
        />
      </template>
      <v-date-picker
        :allowed-dates="allowedDates"
        v-model="list.day"
        multiple
        no-title
        scrollable
      >
        <v-spacer />
        <v-btn text color="primary" @click="menu = false">OK</v-btn>
      </v-date-picker>
    </v-menu>
    <v-row>
      <v-col>
        <v-menu :close-on-content-click="false" max-width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field
              class="time-width"
              v-model="list.startTime"
              label="选择时间"
              readonly
              v-on="on"
            />
          </template>
          <v-time-picker scrollable v-model="list.startTime" full-width />
        </v-menu>
      </v-col>
      <v-icon>mdi-minus</v-icon>
      <v-col>
        <v-menu :close-on-content-click="false" max-width="290px">
          <template v-slot:activator="{ on }">
            <v-text-field
              class="time-width"
              v-model="list.endTime"
              readonly
              v-on="on"
            />
          </template>
          <v-time-picker scrollable v-model="list.endTime" full-width />
        </v-menu>
      </v-col>
    </v-row>
    <v-text-field
      v-model="list.purpose"
      clearable
      label="借用目的"
      placeholder="非必填"
    />
    <v-btn @click="edit" color="primary" outlined class="float-right">
      提交
    </v-btn>
  </v-container>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
const phoneRule = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;

export default {
  name: "Edit",
  data: () => ({
    menu: false,
    time: null,
    houses: [
      { text: "702教室 容量56", value: "702" },
      { text: "602教室 容量56", value: "602" },
      { text: "706会议室 容量32", value: "706" }
    ],
    repeat: [
      { text: "每周一", value: 1 },
      { text: "每周二", value: 2 },
      { text: "每周三", value: 3 },
      { text: "每周四", value: 4 },
      { text: "每周五", value: 5 },
      { text: "每周六", value: 6 },
      { text: "每周日", value: 0 }
    ],
    list: {
      name: "",
      phone: "",
      house: "702",
      startTime: null,
      endTime: null,
      repeat: [],
      day: [],
      purpose: ""
    }
  }),
  mounted() {
    const item = this.$route.params.item;
    if (item) {
      this.list = { ...item };
      delete this.list.date;
      delete this.list.time;
    } else {
      this.list.name = this.$store.state.admin.name;
      this.list.phone = this.$store.state.admin.phone;
    }
  },
  methods: {
    ...mapActions(["EditList"]),
    ...mapMutations(["Notify"]),
    allowedDates: val => {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date
        .getDate()
        .toString()
        .padStart(2, "0");
      return val > year + "-" + month + "-" + day;
    },
    edit() {
      if (!this.list.name.length) return this.Notify({ message: "请输入姓名" });
      if (!phoneRule.test(this.list.phone))
        return this.Notify({ message: "手机号不合法" });
      if (!this.list.repeat.length && !this.list.day.length)
        return this.Notify({ message: "请输入日期" });
      if (this.list.startTime >= this.list.endTime)
        return this.Notify({ message: "输入时间不合法" });
      this.list.adminId = this.$store.state.admin._id;
      this.EditList(this.list);
    }
  }
};
</script>
