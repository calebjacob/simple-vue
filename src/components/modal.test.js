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

  const wrapper = shallowMount(modal, {
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

  it('correctly named', () => {
    expect(modal.name).toEqual('Modal');
  });

  it('defaults model values', () => {
    expect(modal.data().isOpen).toEqual(false);
  });

  it('allows props', () => {
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

    describe('when "modals:close" event occurs', () => {
      it('modal closes when name matches', () => {
        events.$emit('modals:close', 'foobar');

        expect(wrapper.vm.close).toHaveBeenCalled();
      });

      it('modal does not close when name does not match', () => {
        events.$emit('modals:close', 'baz');

        expect(wrapper.vm.close).toHaveBeenCalledTimes(0);
      });
    });

    describe('when "modals:open" event occurs', () => {
      it('modal opens when name matches', () => {
        events.$emit('modals:open', 'foobar');

        expect(wrapper.vm.open).toHaveBeenCalled();
      });

      it('modal does not open when name does not match', () => {
        events.$emit('modals:open', 'baz');

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

    it('sets isOpen to false', () => {
      expect(wrapper.vm.isOpen).toEqual(false);
    });

    it('re-enables body scrolling', () => {
      expect(document.body.style.overflow).toEqual('');
    });
  });

  describe('methods.focusFirstInput()', () => {
    let firstInput;

    beforeEach((done) => {
      wrapper.vm.open();

      wrapper.vm.$nextTick(() => {
        firstInput = wrapper.vm.$el.querySelector('#first');
        jest.spyOn(firstInput, 'focus');

        wrapper.vm.focusFirstInput();

        done();
      });
    });

    it('first input after the default modal close button is focused', () => {
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

    it('sets isOpen to true', () => {
      expect(wrapper.vm.isOpen).toEqual(true);
    });

    it('disables body scrolling', () => {
      expect(document.body.style.overflow).toEqual('hidden');
    });

    it('focuses first input', () => {
      expect(wrapper.vm.focusFirstInput).toHaveBeenCalled();
    });
  });
});
