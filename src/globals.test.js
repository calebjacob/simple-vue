// subject:

import globals from '@/globals';



// dependencies:

import modal from '@/components/modal.vue';

import autoFocus from '@/directives/auto-focus';
import dropDown from '@/directives/drop-down';
import entrapFocus from '@/directives/entrap-focus';
import maskInput from '@/directives/mask-input';

import modals from '@/mixins/modals';

import Vue from 'vue';
import VueMeta from 'vue-meta';
import VueRouter from 'vue-router';



// mocks:

jest.mock('vue');



// tests:

describe('globals', () => {
  describe('initialize()', () => {
    beforeEach(() => {
      globals.initialize(Vue);
    });

    describe('components are initialized', () => {
      test('modal', () => {
        expect(Vue.component).toHaveBeenCalledWith('modal', modal);
      });
    });

    describe('directives are initialized', () => {
      test('autoFocus', () => {
        expect(Vue.directive).toHaveBeenCalledWith('autoFocus', autoFocus);
      });

      test('dropDown', () => {
        expect(Vue.directive).toHaveBeenCalledWith('dropDown', dropDown);
      });

      test('entrapFocus', () => {
        expect(Vue.directive).toHaveBeenCalledWith('entrapFocus', entrapFocus);
      });

      test('maskInput', () => {
        expect(Vue.directive).toHaveBeenCalledWith('maskInput', maskInput);
      });
    });

    describe('mixins are initialized', () => {
      test('modals', () => {
        expect(Vue.mixin).toHaveBeenCalledWith(modals);
      });
    });

    describe('plugins are initialized', () => {
      test('VueMeta', () => {
        expect(Vue.use).toHaveBeenCalledWith(VueMeta);
      });

      test('VueRouter', () => {
        expect(Vue.use).toHaveBeenCalledWith(VueRouter);
      });
    });
  });
});
