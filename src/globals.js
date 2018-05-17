import modal from '@/components/modal.vue';

import autoFocus from '@/directives/auto-focus';
import dropDown from '@/directives/drop-down';
import entrapFocus from '@/directives/entrap-focus';
import maskInput from '@/directives/mask-input';

import modals from '@/mixins/modals';

import VueRouter from 'vue-router';



function components(Vue) {
  Vue.component('modal', modal);
}



function directives(Vue) {
  Vue.directive('autoFocus', autoFocus);
  Vue.directive('dropDown', dropDown);
  Vue.directive('entrapFocus', entrapFocus);
  Vue.directive('maskInput', maskInput);
}



function filters() {
}



function mixins(Vue) {
  Vue.mixin(modals);
}



function plugins(Vue) {
  Vue.use(VueRouter);
}



const globals = {
  initialize(Vue) {
    components(Vue);
    directives(Vue);
    filters(Vue);
    mixins(Vue);
    plugins(Vue);
  }
};



export default globals;
