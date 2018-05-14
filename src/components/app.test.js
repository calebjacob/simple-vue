// subject:

import app from '@/components/app.vue';



// wrapper:

function createWrapper() {
  const wrapper = shallow(app, {
    stubs: {
      'router-view': true
    }
  });

  return wrapper;
}



// tests:

describe('components - app', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper();
  });

  test('correctly named', () => {
    expect(app.name).toEqual('App');
  });

  test('renders a view', () => {
    expect(wrapper.html().length).toBeGreaterThan(0);
  });
});
