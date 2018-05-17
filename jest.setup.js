import Vue from 'vue';
import vueTestUtils from '@vue/test-utils';



jest.unmock('vue');
jest.unmock('vue-router');

jest.setTimeout(500);

Vue.config.warnHandler = () => {};

global.createLocalVue = vueTestUtils.createLocalVue;
global.mount = vueTestUtils.mount;
global.shallow = vueTestUtils.shallow;
