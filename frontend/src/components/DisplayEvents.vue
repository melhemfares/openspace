<template>
  <div>
    <div class="delete-event-container">
      <h1 class="container-title">{{ eventChange }} an event</h1>
      <EventTitle v-for="event in events" :key="event.id" :event="event"/>
      <div class="add-event-buttons">
        <button class="cancel" @click="closeWindow">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import EventTitle from '@/components/EventTitle.vue'

export default {
  components: {
    EventTitle
  },
  props: {
    events: {
      type: Object,
      required: true
    }
  },
  methods: {
    closeWindow() {
      this.$store.dispatch('toggle')
      this.$store.dispatch('toggleEvent', '')
    }
  },
  computed: {
    eventChange() {
      return this.$store.state.toggleEvent
    }
  }
}
</script>

<style scoped>
.delete-event-container {
  width: 710px;
  box-shadow: 0px 0px 10px #36454F;
  background-color: #f0f0f0;
  margin: 0 auto 0 auto;
}

.delete-event-title {
  padding: 10px;
  width: 95%;
  margin-bottom: 10px;
}

.cancel {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  width: 100px;
}

.container-title {
  padding: 15px;
}
</style>