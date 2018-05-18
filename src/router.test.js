// subject:

import router from '@/router';



// dependencies:

import home from '@/components/home.vue';
import otherPage from '@/components/other-page.vue';
import VueRouter from 'vue-router';



// mocks:

jest.mock('vue-router');



// tests:

describe('router', () => {
  it('router instance is configured', () => {
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

  it('exports router instance', () => {
    expect(router.name).toEqual('vue router instance');
  });
});
