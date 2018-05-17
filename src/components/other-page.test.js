// subject:

import otherPage from '@/components/other-page.vue';



// wrapper:

function createWrapper() {
  const wrapper = shallow(otherPage, {});

  return wrapper;
}



// tests:

describe('component - otherPage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper();
  });

  test('correctly named', () => {
    expect(otherPage.name).toEqual('OtherPage');
  });

  test('defaults model values', () => {
    expect(otherPage.data().name).toEqual(null);
    expect(otherPage.data().phone).toEqual(null);
  });

  test('sets page title', () => {
    expect(otherPage.metaInfo().title).toEqual('Other Page');
  });

  test('renders a view', () => {
    expect(wrapper.html().length).toBeGreaterThan(0);
  });
});
