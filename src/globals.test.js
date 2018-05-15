// subject:

import globals from '@/globals';



// dependencies:

import autoFocus from '@/directives/auto-focus';
import dropDown from '@/directives/drop-down';
import entrapFocus from '@/directives/entrap-focus';
import maskInput from '@/directives/mask-input';
import Vue from 'vue';
import VueRouter from 'vue-router';



// mocks:

jest.mock('vue');



// tests:

describe('globals', () => {
  describe('initialize()', () => {
    beforeEach(() => {
      globals.initialize(Vue);
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

    describe('plugins are initialized', () => {
      test('VueRouter', () => {
        expect(Vue.use).toHaveBeenCalledWith(VueRouter);
      });
    });
  });
});
