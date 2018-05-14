import Vue from 'vue';
import vueTestUtils from '@vue/test-utils';

import globals from '@/globals';



jest.unmock('vue');
jest.unmock('vue-router');

jest.setTimeout(500);

globals.initialize(Vue);

global.createLocalVue = vueTestUtils.createLocalVue;
global.shallow = vueTestUtils.shallow;
