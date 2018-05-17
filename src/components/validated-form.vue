<template>
  <form class="form" :class="{
    'form--disabled': disabled,
    'form--dirty': dirty,
    'form--submit-attempted': submitAttempted
  }" @submit="submit" @input="markFormAsDirty" @change="markFormAsDirty" :data-vv-scope="name" novalidate autocomplete="off">
    <fieldset :disabled="disabled">
      <slot/>
    </fieldset>
  </form>
</template>



<script>
  export default {
    name: 'ValidatedForm',

    data() {
      return {
        dirty: false,
        submitAttempted: false
      }
    },

    inject: ['$validator'],

    methods: {
      focusFirstInput() {
        let firstInput = this.$el.querySelector('input:not([type="hidden"]):not([tabindex="-1"]), button, select');

        if (firstInput && !this.disableAutoFocus) {
          if (firstInput.type === 'radio') {
            let checkedRadio = this.$el.querySelector('input:checked');

            if (checkedRadio) {
              firstInput = checkedRadio;
            }
          }

          firstInput.focus();
        }
      },

      markFormAsDirty() {
        this.dirty = true;
      },

      submit(event) {
        this.submitAttempted = true;

        event.preventDefault();

        this.$validator.validateAll(this.name).then(this.validationHandler);
      },

      validationHandler(isValid) {
        if (isValid) {
          this.validSubmit();
        }

        else {
          let firstInvalidInput = this.$el.querySelector('[aria-invalid="true"], .invalid');

          if (firstInvalidInput) {
            firstInvalidInput.focus();
          }
        }
      }
    },

    mounted() {
      this.focusFirstInput();
    },

    props: {
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
    }
  };
</script>
