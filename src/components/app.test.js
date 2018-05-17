// subject:

import app from '@/components/app.vue';



// wrapper:

function createWrapper() {
  const wrapper = shallow(app, {});

  return wrapper;
}



// tests:

describe('component - app', () => {
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

  describe('metaInfo.titleTemplate()', () => {
    test('returns base website title when no title chunk is passed in', () => {
      expect(app.metaInfo.titleTemplate()).toEqual('Simple Vue');
    });

    test('title chuck with base website title when chunk is passed in', () => {
      expect(app.metaInfo.titleTemplate('Foobar')).toEqual('Foobar | Simple Vue');
    });
  });
});
