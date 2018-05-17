// subject:

import validatedForm from '@/components/validated-form.vue';



// dependencies:

import events from '@/services/events';



// mocks:

const validSubmit = jest.fn();
const $validator = {
  validateAll: jest.fn().mockReturnValue(new Promise(() => {}))
};



// wrapper:

function createWrapper(options = {}) {
  const template = options.template ? options.template : `
    <div>
      <input name="fieldOne" id="valid" type="text">
      <input name="fieldTwo" id="invalid" type="text" aria-invalid="true">
    </div>
  `;

  const wrapper = shallow(validatedForm, {
    mocks: {
      $validator
    },
    propsData: {
      name: 'myForm',
      validSubmit
    },
    slots: {
      default: template
    }
  });

  return wrapper;
}



// tests:

describe('component - validatedForm', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = createWrapper();
  });

  test('correctly named', () => {
    expect(validatedForm.name).toEqual('ValidatedForm');
  });

  test('defaults model values', () => {
    expect(validatedForm.data().dirty).toEqual(false);
    expect(validatedForm.data().submitAttempted).toEqual(false);
  });

  test('allows props', () => {
    expect(validatedForm.props).toEqual({
      disabled: {
        type: Boolean,
        default: false
      },

      disableAutoFocus: {
        type: Boolean,
        default: false
      },

      name: {
        type: String,
        required: true
      },

      validSubmit: {
        type: Function,
        required: true
      }
    });
  });

  it('injects $validator', function() {
    expect(validatedForm.inject.$validator).toBeTruthy();
  });

  describe('mounted()', () => {
    beforeEach(() => {
      validatedForm.focusFirstInput = jest.fn();

      validatedForm.mounted();
    });

    test('calls focusFirstInput()', () => {
      expect(validatedForm.focusFirstInput).toHaveBeenCalled();
    });

    afterEach(() => {
      delete validatedForm.focusFirstInput;
    });
  });

  describe('methods.focusFirstInput()', () => {
    let input;

    describe('when disableAutoFocus is true', () => {
      describe('when a regular input is the first input', () => {
        beforeEach(() => {
          wrapper = createWrapper({
            template: `
              <div>
                <input name="first" id="first" type="text">
                <input name="second" id="second" type="text">
              </div>
            `
          });

          wrapper.vm.disableAutoFocus = true;

          input = wrapper.element.querySelector('#first');
          jest.spyOn(input, 'focus');

          wrapper.vm.focusFirstInput();
        });

        test('input is not focused', () => {
          expect(input.focus).toHaveBeenCalledTimes(0);
        });
      });
    });

    describe('when disableAutoFocus is false', () => {
      describe('when a regular input is the first input', () => {
        beforeEach(() => {
          wrapper = createWrapper({
            template: `
              <div>
                <input name="first" id="first" type="text">
                <input name="second" id="second" type="text">
              </div>
            `
          });

          wrapper.vm.disableAutoFocus = false;

          input = wrapper.element.querySelector('#first');
          jest.spyOn(input, 'focus');

          wrapper.vm.focusFirstInput();
        });

        test('input is focused', () => {
          expect(input.focus).toHaveBeenCalled();
        });
      });

      describe('when a hidden input is the first input', () => {
        beforeEach(() => {
          wrapper = createWrapper({
            template: `
              <div>
                <input name="first" id="first" type="hidden">
                <input name="second" id="second" type="text">
              </div>
            `
          });

          wrapper.vm.disableAutoFocus = false;

          input = wrapper.element.querySelector('#second');
          jest.spyOn(input, 'focus');

          wrapper.vm.focusFirstInput();
        });

        test('input is focused', () => {
          expect(input.focus).toHaveBeenCalled();
        });
      });

      describe('when an input that is not tabbable is the first input', () => {
        beforeEach(() => {
          wrapper = createWrapper({
            template: `
              <div>
                <input name="first" id="first" type="text" tabindex="-1">
                <input name="second" id="second" type="text">
              </div>
            `
          });

          wrapper.vm.disableAutoFocus = false;

          input = wrapper.element.querySelector('#second');
          jest.spyOn(input, 'focus');

          wrapper.vm.focusFirstInput();
        });

        test('input is focused', () => {
          expect(input.focus).toHaveBeenCalled();
        });
      });

      describe('when a radio input is the first input', () => {
        beforeEach(() => {
          wrapper = createWrapper({
            template: `
              <div>
                <input name="myRadio" id="first" type="radio">
                <input name="myRadio" id="second" type="radio" checked>
              </div>
            `
          });

          wrapper.vm.disableAutoFocus = false;

          input = wrapper.element.querySelector('#second');
          jest.spyOn(input, 'focus');

          wrapper.vm.focusFirstInput();
        });

        test('checked radio option is focused', () => {
          expect(input.focus).toHaveBeenCalled();
        });
      });

      describe('when a select input is the first input', () => {
        beforeEach(() => {
          wrapper = createWrapper({
            template: `
              <div>
                <select name="first" id="first" type="text"></select>
                <input name="second" id="second" type="text">
              </div>
            `
          });

          wrapper.vm.disableAutoFocus = false;

          input = wrapper.element.querySelector('#first');
          jest.spyOn(input, 'focus');

          wrapper.vm.focusFirstInput();
        });

        test('select is focused', () => {
          expect(input.focus).toHaveBeenCalled();
        });
      });

      describe('when a button is the first input', () => {
        beforeEach(() => {
          wrapper = createWrapper({
            template: `
              <div>
                <button type="button" id="first">Click Me</button>
                <input name="second" id="second" type="text">
              </div>
            `
          });

          wrapper.vm.disableAutoFocus = false;

          input = wrapper.element.querySelector('#first');
          jest.spyOn(input, 'focus');

          wrapper.vm.focusFirstInput();
        });

        test('button is focused', () => {
          expect(input.focus).toHaveBeenCalled();
        });
      });
    });
  });

  describe('methods.markFormAsDirty()', function() {
    beforeEach(function() {
      wrapper.vm.dirty = false;
      wrapper.vm.markFormAsDirty();
    });

    it('sets dirty to true', function() {
      expect(wrapper.vm.dirty).toEqual(true);
    });
  });

  describe('methods.submit()', function() {
    let submitEvent = {};

    beforeEach(() => {
      submitEvent.preventDefault = jest.fn();

      wrapper.vm.name = 'foobar';
      wrapper.vm.submit(submitEvent);
    });

    it('sets submitAttempted to true', function() {
      expect(wrapper.vm.submitAttempted).toEqual(true);
    });

    it('preventService default form submit', function() {
      expect(submitEvent.preventDefault).toHaveBeenCalled();
    });

    it('calls $validator.validateAll() with form scope/name', function() {
      expect($validator.validateAll).toHaveBeenCalledWith('foobar');
    });

    describe('when $validator.validateAll() resolves with true', function() {
      beforeEach(function() {
        validSubmit.mockClear();

        $validator.validateAll.mockResolvedValue(true);

        return wrapper.vm.submit(submitEvent);
      });

      it('calls passed in validSubmit() function', function() {
        expect(validSubmit).toHaveBeenCalled();
      });
    });

    describe('when $validator.validateAll() resolves with false', function() {
      let invalidInput;

      beforeEach(function() {
        validSubmit.mockClear();

        invalidInput = wrapper.element.querySelector('#invalid');
        jest.spyOn(invalidInput, 'focus');

        $validator.validateAll.mockResolvedValue(false);

        return wrapper.vm.submit(submitEvent);
      });

      it('does not call passed in validSubmit() function', function() {
        expect(validSubmit).toHaveBeenCalledTimes(0);
      });

      it('focuses first invalid input', function() {
        expect(invalidInput.focus).toHaveBeenCalled();
      });
    });
  });
});










// let event = {};
// let validSubmit;



// let $validator = {};



// const injector = require('!!vue-loader?inject!components/validated-form.vue');
// const validatedForm = injector({});



// function createWrapper() {
//   let wrapper = avoriaz.mount(validatedForm, {
//     globals: {
//       $validator: $validator
//     },
//     slots: {
//       default: {
//         template: `
//           <div>
            // <input name="fieldOne" type="text">
            // <input name="fieldTwo" type="text" aria-invalid="true">
//           </div>
//         `
//       }
//     }
//   });

//   wrapper.setProps({
//     name: 'myForm',
//     validSubmit: validSubmit,
//     disabled: false,
//     disableAutoFocus: true
//   });

//   return wrapper;
// }



// describe('component - validatedForm', function() {
//   let wrapper;

//   beforeEach(function() {
//     event.preventDefault = sinon.stub();
//     validSubmit = sinon.stub();
//     $validator.validateAll = sinon.stub().returnsPromise();

//     wrapper = createWrapper();
//   });

//   it('passes through props to model', function() {
//     expect(wrapper.vm.disabled).to.equal(false);
//     expect(wrapper.vm.disableAutoFocus).to.equal(true);
//     expect(wrapper.vm.name).to.equal('myForm');
//     expect(wrapper.vm.validSubmit).to.equal(validSubmit);
//   });

//   it('defaults data model values', function() {
//     expect(validatedForm.data().dirty).to.equal(false);
//     expect(validatedForm.data().submitAttempted).to.equal(false);
//   });

//   it('injects $validator', function() {
//     expect(validatedForm.inject.$validator).to.deep.equal({
//       from: '$validator'
//     });
//   });



  // describe('methods.markFormAsDirty()', function() {
  //   beforeEach(function() {
  //     wrapper.vm.dirty = false;
  //     wrapper.vm.markFormAsDirty();
  //   });

  //   it('sets dirty to true', function() {
  //     expect(wrapper.vm.dirty).to.equal(true);
  //   });
  // });



  // describe('methods.submit()', function() {
  //   let sharedExamples = function sharedExamples() {
  //     it('sets submitAttempted to true', function() {
  //       expect(wrapper.vm.submitAttempted).to.equal(true);
  //     });

  //     it('preventService default form submit', function() {
  //       sinon.assert.called(event.preventDefault);
  //     });

  //     describe('when $validator.validateAll() resolves with true', function() {
  //       beforeEach(function() {
  //         $validator.validateAll.resolves(true);
  //       });

  //       it('calls passed in validSubmit() function', function() {
  //         sinon.assert.called(validSubmit);
  //       });
  //     });

  //     describe('when $validator.validateAll() resolves with false', function() {
  //       let invalidInput;

  //       beforeEach(function() {
  //         invalidInput = wrapper.find('input')[1].element;
  //         sinon.spy(invalidInput, 'focus');

  //         $validator.validateAll.resolves(false);
  //       });

  //       it('does not call passed in validSubmit() function', function() {
  //         sinon.assert.notCalled(validSubmit);
  //       });

  //       it('focuses first invalid input', function() {
  //         sinon.assert.called(invalidInput.focus);
  //       });
  //     });
  //   };

  //   describe('when form has no name', function() {
  //     beforeEach(function() {
  //       wrapper.vm.name = null;
  //       wrapper.vm.submit(event);
  //     });

  //     it('calls $validator.validateAll() without any arguments', function() {
  //       sinon.assert.called($validator.validateAll);
  //       expect($validator.validateAll.getCall(0).args.length).to.equal(0);
  //     });

  //     sharedExamples();
  //   });

  //   describe('when form has a name', function() {
  //     beforeEach(function() {
  //       wrapper.vm.name = 'foobar';
  //       wrapper.vm.submit(event);
  //     });

  //     it('calls $validator.validateAll() with form scope/name', function() {
  //       sinon.assert.calledWith($validator.validateAll, 'foobar');
  //     });

  //     sharedExamples();
  //   });
  // });
// });
