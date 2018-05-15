import autoFocus from '@/directives/auto-focus';
import dropDown from '@/directives/drop-down';
import entrapFocus from '@/directives/entrap-focus';
import maskInput from '@/directives/mask-input';
import VueRouter from 'vue-router';



function components() {
}



function directives(Vue) {
  Vue.directive('autoFocus', autoFocus);
  Vue.directive('dropDown', dropDown);
  Vue.directive('entrapFocus', entrapFocus);
  Vue.directive('maskInput', maskInput);
}



function filters() {
}



function plugins(Vue) {
  Vue.use(VueRouter);
}



const globals = {
  initialize(Vue) {
    components(Vue);
    directives(Vue);
    filters(Vue);
    plugins(Vue);
  }
};



export default globals;
