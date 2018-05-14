import Vue from 'vue';
import router from '@/router';

import app from '@/components/app.vue';

import autoFocus from '@/directives/auto-focus';



// global vue configurations:

Vue.config.productionTip = false;



// initialize global components:

// ...



// initialize directives:

Vue.directive('autoFocus', autoFocus);



// confgiure vue instance and router:

const main = new Vue({
  router,
  render(createElement) {
    return createElement(app);
  }
});

main.$mount('#app');



export default main;
