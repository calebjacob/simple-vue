// subject:

import otherPage from '@/components/other-page.vue';



// wrapper:

function createWrapper() {
  const wrapper = shallow(otherPage, {});

  return wrapper;
}



// tests:

describe('components - otherPage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper();
  });

  test('correctly named', () => {
    expect(otherPage.name).toEqual('OtherPage');
  });

  test('renders a view', () => {
    expect(wrapper.html().length).toBeGreaterThan(0);
  });
});
