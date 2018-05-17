import modal from '@/components/modal.vue';
import validatedForm from '@/components/validated-form.vue';

import autoFocus from '@/directives/auto-focus';
import dropDown from '@/directives/drop-down';
import entrapFocus from '@/directives/entrap-focus';
import maskInput from '@/directives/mask-input';

import dollars from '@/filters/dollars';
import moment from '@/filters/moment';

import modals from '@/mixins/modals';

import VeeValidate from 'vee-validate';
import VueMeta from 'vue-meta';
import VueRouter from 'vue-router';



function components(Vue) {
  Vue.component('modal', modal);
  Vue.component('validatedForm', validatedForm);
}



function directives(Vue) {
  Vue.directive('autoFocus', autoFocus);
  Vue.directive('dropDown', dropDown);
  Vue.directive('entrapFocus', entrapFocus);
  Vue.directive('maskInput', maskInput);
}



function filters(Vue) {
  Vue.filter('dollars', dollars);
  Vue.filter('moment', moment);
}



function mixins(Vue) {
  Vue.mixin(modals);
}



function plugins(Vue) {
  Vue.use(VeeValidate, {
    classes: true
  });

  Vue.use(VueMeta);
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
