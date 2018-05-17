// subject:

import globals from '@/globals';



// dependencies:

import modal from '@/components/modal.vue';
import validatedForm from '@/components/validated-form.vue';

import autoFocus from '@/directives/auto-focus';
import dropDown from '@/directives/drop-down';
import entrapFocus from '@/directives/entrap-focus';
import maskInput from '@/directives/mask-input';

import modals from '@/mixins/modals';

import VeeValidate from 'vee-validate';
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

      test('validatedForm', () => {
        expect(Vue.component).toHaveBeenCalledWith('validatedForm', validatedForm);
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
      test('VeeValidate', () => {
        expect(Vue.use).toHaveBeenCalledWith(VeeValidate, {
          classes: true
        });
      });

      test('VueMeta', () => {
        expect(Vue.use).toHaveBeenCalledWith(VueMeta);
      });

      test('VueRouter', () => {
        expect(Vue.use).toHaveBeenCalledWith(VueRouter);
      });
    });
  });
});
