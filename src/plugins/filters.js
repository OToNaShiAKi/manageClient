import Vue from 'vue'

Vue.filter('repeatFormat', item => {
    if (item.repeat.length)
        return "每周" + item.repeat.join('、');
    else if (item.day.length)
        return item.day.join('、');
})