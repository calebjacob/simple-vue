import Vue from 'vue';
import VueRouter from 'vue-router';
import vueTestUtils from '@vue/test-utils';



jest.unmock('vue');
jest.unmock('vue-router');

jest.setTimeout(500);

Vue.use(VueRouter);

Vue.directive('autoFocus', {});

global.createLocalVue = vueTestUtils.createLocalVue;
global.shallow = vueTestUtils.shallow;
