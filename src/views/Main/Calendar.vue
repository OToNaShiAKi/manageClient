<template>
  <v-container>
    <v-tabs v-model="tab" align-with-title>
      <v-tabs-slider></v-tabs-slider>

      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-toolbar flat>
      <v-btn outlined color="primary" @click="focus = ''"> Today </v-btn>
      <v-btn
        @click="$refs.calendar.prev()"
        fab
        text
        small
        class="mx-1"
        color="primary"
      >
        <v-icon small> mdi-chevron-left</v-icon>
      </v-btn>

      <v-btn
        @click="$refs.calendar.next()"
        fab
        text
        small
        class="mx-1"
        color="primary"
      >
        <v-icon small> mdi-chevron-right </v-icon>
      </v-btn>
      <v-spacer />
      <v-menu bottom right>
        <template v-slot:activator="{ on }">
          <v-btn color="primary" outlined v-on="on">
            <span>{{ type }}</span>
            <v-icon right> mdi-menu-down </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="type = 'day'"> Day </v-list-item>
          <v-list-item @click="type = 'week'"> Week </v-list-item>
          <v-list-item @click="type = 'month'"> Month </v-list-item>
          <v-list-item @click="type = '4day'"> 4 day </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-calendar
      ref="calendar"
      v-model="focus"
      color="primary"
      :events="events"
      :type="type"
      event-color="warning"
    />
  </v-container>
</template>

<script>
const width = document.body.clientWidth > 1200;

export default {
  name: "Calendar",
  data: () => ({
    focus: "",
    type: width ? "month" : "4day",
    tab: "web",
    events: [],
    items: ["702", "706", "602"],
  }),
};
</script>

