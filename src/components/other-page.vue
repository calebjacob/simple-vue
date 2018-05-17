<template>
  <div class="container">
    <h1>Other Page</h1>

    <p>This is an example of another page. Exciting!</p>

    <validated-form name="myForm" :valid-submit="doTheThing">
      <label for="name">Name</label>

      <input type="text" name="name" id="name" placeholder="Name..." v-model="name" v-validate="{
        required: true,
        max: 10
      }">

      <p>{{errors.first('myForm.name')}}</p>

      <label for="phone">Phone</label>

      <input type="phone" name="phone" id="phone" placeholder="Phone number..." v-model="phone" v-mask-input="'phone'" v-validate="{
        required: true
      }">

      <p>{{errors.first('myForm.phone')}}</p>

      <button class="button" type="submit">Submit</button>
    </validated-form>
  </div>
</template>



<script>
  export default {
    name: 'OtherPage',

    metaInfo() {
      return {
        title: 'Other Page'
      };
    },

    data() {
      return {
        name: null,
        phone: null
      };
    },

    methods: {
      doTheThing() {
        alert('Valid form submit! :)');
      }
    }
  };
</script>
