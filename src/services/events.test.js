// subject:

import events from '@/services/events';



// dependencies:

import Vue from 'vue';



// mocks:

jest.mock('vue');



// tests:

describe('service - events', () => {
  test('default vue instance is configured', () => {
    expect(Vue).toHaveBeenCalled();
  });

  test('vue instance is exported', () => {
    expect(events.name).toEqual('vue instance');
  });
});
