// subject:

import modal from '@/components/modal.vue';



// dependencies:

import events from '@/services/events';



// wrapper:

function createWrapper() {
  const template = `
    <div>
      <input id="first" type="text">
      <input id="last" type="email">
    </div>
  `;

  const wrapper = shallow(modal, {
    attachToDocument: true,
    propsData: {
      modalStyle: 'compact',
      name: 'foobar'
    },
    slots: {
      default: template
    }
  });

  return wrapper;
}



// tests:

describe('component - modal', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper();
  });

  test('correctly named', () => {
    expect(modal.name).toEqual('Modal');
  });

  test('defaults model values', () => {
    expect(modal.data().isOpen).toEqual(false);
  });

  test('allows props', () => {
    expect(modal.props).toEqual({
      modalStyle: {
        type: String,
        default: null
      },

      name: {
        type: String,
        required: true
      }
    });
  });

  describe('created()', () => {
    beforeEach(() => {
      wrapper.vm.close = jest.fn();
      wrapper.vm.open = jest.fn();
    });

    describe('when "closeModal" event occurs', () => {
      test('modal closes when name matches', () => {
        events.$emit('closeModal', 'foobar');

        expect(wrapper.vm.close).toHaveBeenCalled();
      });

      test('modal does not close when name does not match', () => {
        events.$emit('closeModal', 'baz');

        expect(wrapper.vm.close).toHaveBeenCalledTimes(0);
      });
    });

    describe('when "openModal" event occurs', () => {
      test('modal opens when name matches', () => {
        events.$emit('openModal', 'foobar');

        expect(wrapper.vm.open).toHaveBeenCalled();
      });

      test('modal does not open when name does not match', () => {
        events.$emit('openModal', 'baz');

        expect(wrapper.vm.open).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('methods.close()', () => {
    beforeEach(() => {
      document.body.style.overflow = 'hidden';
      wrapper.vm.isOpen = true;

      wrapper.vm.close();
    });

    test('sets isOpen to false', () => {
      expect(wrapper.vm.isOpen).toEqual(false);
    });

    test('re-enables body scrolling', () => {
      expect(document.body.style.overflow).toEqual('');
    });
  });

  describe('methods.focusFirstInput()', () => {
    let firstInput;

    beforeEach(() => {
      wrapper.vm.open();

      firstInput = wrapper.vm.$el.querySelector('#first');
      jest.spyOn(firstInput, 'focus');

      wrapper.vm.focusFirstInput();
    });

    test('first input after the default modal close button is focused', () => {
      expect(firstInput.focus).toHaveBeenCalled();
    });
  });

  describe('methods.open()', () => {
    beforeEach(() => {
      document.body.style.overflow = '';
      wrapper.vm.isOpen = false;

      wrapper.vm.focusFirstInput = jest.fn();

      wrapper.vm.open();
    });

    test('sets isOpen to true', () => {
      expect(wrapper.vm.isOpen).toEqual(true);
    });

    test('disables body scrolling', () => {
      expect(document.body.style.overflow).toEqual('hidden');
    });

    test('focuses first input', () => {
      expect(wrapper.vm.focusFirstInput).toHaveBeenCalled();
    });
  });
});
