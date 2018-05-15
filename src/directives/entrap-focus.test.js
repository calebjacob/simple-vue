// subject:

import entrapFocus from '@/directives/entrap-focus';



// directive setup:

const component = {
  template: `
    <div v-entrap-focus>
      <input type="text" id="first">
      <button type="button" id="second">Click Me</button>
      <textarea id="third"></textarea>
      <select id="last"></select>
    </div>
  `
};

const localVue = createLocalVue();

localVue.directive('entrapFocus', entrapFocus);



// wrapper:

function createWrapper() {
  const wrapper = shallow(component, {
    localVue
  });

  return wrapper;
}



// tests:

describe('directive - entrapFocus', () => {
  let firstInput;
  let lastInput;
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper();

    firstInput = wrapper.element.querySelector('#first');
    lastInput = wrapper.element.querySelector('#last');

    jest.spyOn(firstInput, 'focus');
    jest.spyOn(lastInput, 'focus');

    entrapFocus.inserted(wrapper.element);
  });



  describe('when the input is inserted into the DOM', () => {
    test('automatically focuses the first input', () => {
      expect(firstInput.focus).toHaveBeenCalled();
    });
  });



  describe('when tabbing downwards', () => {
    let event;

    beforeEach(() => {
      event = new Event('keydown');
      event.keyCode = 9;
      event.shiftKey = false;

      firstInput.focus.mockClear();

      jest.spyOn(event, 'preventDefault');
    });

    describe('when currently focused in first input', () => {
      beforeEach(() => {
        firstInput.dispatchEvent(event);
      });

      test('does not preventDefault()', () => {
        expect(event.preventDefault).toHaveBeenCalledTimes(0);
      });

      test('does not focus last input', () => {
        expect(lastInput.focus).toHaveBeenCalledTimes(0);
      });
    });

    describe('when currently focused in last input', () => {
      beforeEach(() => {
        lastInput.dispatchEvent(event);
      });

      test('does preventDefault()', () => {
        expect(event.preventDefault).toHaveBeenCalled();
      });

      test('focuses first input', () => {
        expect(firstInput.focus).toHaveBeenCalled();
      });
    });
  });



  describe('when tabbing upwards', () => {
    let event;

    beforeEach(() => {
      event = new Event('keydown');
      event.keyCode = 9;
      event.shiftKey = true;

      firstInput.focus.mockClear();

      jest.spyOn(event, 'preventDefault');
    });

    describe('when currently focused in first input', () => {
      beforeEach(() => {
        firstInput.dispatchEvent(event);
      });

      test('does preventDefault()', () => {
        expect(event.preventDefault).toHaveBeenCalled();
      });

      test('focuses last input', () => {
        expect(lastInput.focus).toHaveBeenCalled();
      });
    });

    describe('when currently focused in last input', () => {
      beforeEach(() => {
        lastInput.dispatchEvent(event);
      });

      test('does not preventDefault()', () => {
        expect(event.preventDefault).toHaveBeenCalledTimes(0);
      });

      test('does not focus first input', () => {
        expect(firstInput.focus).toHaveBeenCalledTimes(0);
      });
    });
  });
});
