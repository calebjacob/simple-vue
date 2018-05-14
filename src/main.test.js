// subject:

import main from '@/main';



// dependencies:

import app from '@/components/app.vue';
import globals from '@/globals';
import router from '@/router';
import Vue from 'vue';



// mocks:

jest.mock('@/globals', () => {
  return {
    initialize: jest.fn()
  };
});

jest.mock('@/router', () => {
  return 'router config';
});

jest.mock('vue');



// tests:

describe('main', () => {
  test('show production tip is set to false', () => {
    expect(Vue.config.productionTip).toEqual(false);
  });

  test('global vue components, directives, and filters are initialized', () => {
    expect(globals.initialize).toHaveBeenCalled();
  });

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
