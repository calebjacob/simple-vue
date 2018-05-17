<template>
  <div class="container">
    <h1>Other Page</h1>

    <p>This is an example of another page. Exciting!</p>

    <input type="phone" name="test" placeholder="Phone number..." v-model="phone" v-auto-focus v-mask-input="'phone'">
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
        phone: null
      };
    }
  };
</script>
