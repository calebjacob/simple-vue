// subject:

import main from '@/main';



// dependencies:

import Vue from 'vue';
import router from '@/router';

import app from '@/components/app.vue';

import autoFocus from '@/directives/auto-focus';



// mocks:

jest.mock('vue');

jest.mock('@/router', () => {
  return 'router config';
});

jest.mock('@/components/app.vue', () => {
  return {
    name: 'App'
  };
});

jest.mock('@/directives/auto-focus', () => {
  return {
    name: 'AutoFocus'
  };
});



// tests:

describe('main', () => {
  describe('when global vue settings are configured', () => {
    test('show production tip is set to false', () => {
      expect(Vue.config.productionTip).toEqual(false);
    });
  });



  // describe('when global components are initialized', () => {
  // });



  describe('when directives are initialized', () => {
    test('autoFocus', () => {
      expect(Vue.directive).toHaveBeenCalledWith('autoFocus', autoFocus);
    });
  });



  describe('when vue instance is created', () => {
    test('instance is configured', () => {
      const createElement = jest.fn(() => {
        return 'created element';
      });

      expect(Vue.mock.calls[0]).toHaveLength(1);
      expect(Vue.mock.calls[0][0].router).toEqual(router);
      expect(Vue.mock.calls[0][0].render).toBeTruthy();

      const renderResult = Vue.mock.calls[0][0].render(createElement);

      expect(createElement).toHaveBeenCalledWith(app);
      expect(renderResult).toEqual('created element');
    });

    test('instance is exported', () => {
      expect(main.name).toEqual('vue instance');
    });
  });
});
