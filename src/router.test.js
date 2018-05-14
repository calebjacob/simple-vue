// subject:

import router from '@/router';



// dependencies:

import Vue from 'vue';
import VueRouter from 'vue-router';

import home from '@/components/home.vue';
import otherPage from '@/components/other-page.vue';



// mocks:

jest.mock('vue');
jest.mock('vue-router');

jest.mock('@/components/home.vue', () => {
  return {
    name: 'home'
  };
});

jest.mock('@/components/other-page.vue', () => {
  return {
    name: 'other-page'
  };
});



// tests:

describe('router', () => {
  test('vue is configured to use the router plugin', () => {
    expect(Vue.use).toBeCalledWith(VueRouter);
  });

  test('router instance is configured', () => {
    expect(VueRouter).toBeCalledWith({
      mode: 'history',
      routes: [
        {
          path: '/',
          name: 'home',
          component: home
        },
        {
          path: '/other-page',
          name: 'otherPage',
          component: otherPage
        }
      ]
    });
  });

  test('exports router instance', () => {
    expect(router.name).toEqual('vue router instance');
  });
});
