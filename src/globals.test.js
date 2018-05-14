// subject:

import globals from '@/globals';



// dependencies:

import autoFocus from '@/directives/auto-focus';
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
    });

    describe('plugins are initialized', () => {
      test('VueRouter', () => {
        expect(Vue.use).toHaveBeenCalledWith(VueRouter);
      });
    });
  });
});
