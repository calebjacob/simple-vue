import events from '@/services/events';



const modals = {
  methods: {
    $closeModal(name) {
      events.$emit('closeModal', name);
    },

    $openModal(name) {
      events.$emit('openModal', name);
    }
  }
};



export default modals;
