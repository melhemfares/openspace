<template>
  <div>
    <div class="edit-event">
    <EditEvent 
      @wheel.prevent
      @touchmove.prevent
      @scroll.prevent
      v-if="toggleEdit"
      :event="event"
    />
  </div>
    <button @click="changeEvent" class="delete-event-title">
      {{ event.title }}
    </button>
  </div>
</template>

<script>
import EditEvent from '@/components/EditEvent.vue'

export default {
  components: {
    EditEvent
  },
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      toggleEdit: false
    }
  },
  methods: {
    //Decides whether to edit or delete based on which toggle is on
    changeEvent() {
      if (this.$store.state.toggleEvent === 'Delete') {
        this.deleteEvent()
      } else if (this.$store.state.toggleEvent === 'Edit') {
        this.editEvent()
      } else {
        console.log('Something went wrong.')
      }
    },
    deleteEvent() {
      const event = this.event
      const id = event.id

      const confirmDelete = confirm(`Are you sure you want to delete ${event.title}?`)

      if(confirmDelete) {
        this.$store.dispatch('deleteEvent', id)
          .then(() => {
            console.log('event deleted')
          })
          .catch(error => {
            console.log(error);
          })
      }
    },
    editEvent() {
      this.toggleEdit = !this.toggleEdit
    }
  }
}
</script>

<style scoped>
.delete-event-title {
  padding: 10px;
  width: 95%;
  margin-bottom: 10px;
}

.edit-event {
  position: fixed;
  z-index: 3;
  margin: 0 auto 0 auto;
  width: 45%;
  margin-bottom: 20px;
  transform: translateY(-20%);
}
</style>