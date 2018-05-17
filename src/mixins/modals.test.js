// subject:

import modals from '@/mixins/modals';



// dependencies:

import events from '@/services/events';



// mocks:

jest.mock('@/services/events');



// mixin setup:

const component = {
  template: '<div></div>'
};

const localVue = createLocalVue();

localVue.mixin(modals);



// wrapper:

function createWrapper() {
  const wrapper = shallow(component, {
    localVue
  });

  return wrapper;
}



// tests:

describe('mixin - modals', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper();
  });

  describe('methods.$modals.closeModal()', () => {
    beforeEach(() => {
      wrapper.vm.$closeModal('foobar');
    });

    test('emits a "closeModal" event message', () => {
      expect(events.$emit).toHaveBeenCalledWith('closeModal', 'foobar');
    });
  });

  describe('methods.$modals.openModal()', () => {
    beforeEach(() => {
      wrapper.vm.$openModal('foobar');
    });

    test('emits an "openModal" event message', () => {
      expect(events.$emit).toHaveBeenCalledWith('openModal', 'foobar');
    });
  });
});

