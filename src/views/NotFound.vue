<template>
  <div class="mx-auto mt-6 text-center" style="max-width: 300px;">
    <v-icon size="270" color="error">mdi-cancel</v-icon>
    <p class="title error--text">404，您访问的页面不存在</p>
    <v-btn color="error" @click="$router.replace('/')" outlined rounded block large>返回首页</v-btn>
    <v-btn color="error" @click="$router.back()" class="my-3" outlined rounded block large>返回上页</v-btn>
    <p class="caption px-2">
      该网站由数院科协One
      Echo与雁祉作坊联合开发，如有任何使用问题或bug，请联系数院科协
    </p>
  </div>
</template>

<script>
export default {
  name: "NotFound"
};
</script>