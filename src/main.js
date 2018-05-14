import app from '@/components/app.vue';
import globals from '@/globals';
import router from '@/router';
import Vue from 'vue';



// global vue configurations:

Vue.config.productionTip = false;



// initialize global vue components, directives, and filters:

globals.initialize(Vue);



// confgiure vue instance and router:

const main = new Vue({
  router,
  render(createElement) {
    return createElement(app);
  }
});

main.$mount('#app');



export default main;
