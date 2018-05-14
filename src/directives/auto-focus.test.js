// subject:

import autoFocus from '@/directives/auto-focus';



// configuration:

const component = {
  template: `
    <input type="text" v-auto-focus>
  `
};

const localVue = createLocalVue();

localVue.directive('autoFocus', autoFocus);



// wrapper:

function createWrapper() {
  const wrapper = shallow(component, {
    localVue
  });

  return wrapper;
}



// tests:

describe('directive - autoFocus', () => {
  let input;
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper();

    input = wrapper.element;

    jest.spyOn(input, 'focus');
  });

  describe('when the input is inserted into the DOM', () => {
    beforeEach(() => {
      autoFocus.inserted(input);
    });

    test('focuses the input', () => {
      expect(input.focus).toHaveBeenCalled();
    });
  });
});
