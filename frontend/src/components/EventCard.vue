<template>
  <div v-if="event" class="event-card" :key="compKey">
    <div class="event-card-title">{{ event.title }}</div>
    <div>{{ cardTimeStart }} - {{ cardTimeEnd }}</div>
  </div>
</template>

<script>
import EventService from '@/services/EventService'

export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      compKey: 0,
    }
  },
  methods: {
    rerender() {
      this.compKey++
    },
    deleteEvent() {
      const event = this.event
      const id = event.id

      const confirmDelete = confirm(`Are you sure you want to delete ${event.title}?`)

      if(confirmDelete) {
        this.$store.dispatch('deleteEvent', id, event)
          .then(() => {
            console.log('event deleted')
          })
          .catch(error => {
            console.log(error);
          })
      }
    }
  },
  computed: {
    earliest() {
      return this.$store.state.earliest
    },
    latest() {
      return this.$store.state.latest
    },
    cardHeight() {
      return `${(parseInt(this.event.end.hour) * 60 + parseInt(this.event.end.minute) 
      - (parseInt(this.event.start.hour) * 60 + parseInt(this.event.start.minute)))/2}px`
    },
    cardYPosition() {
      return `${(parseInt(this.event.start.hour) * 60 + parseInt(this.event.start.minute))/2 - (this.earliest)*30}px`
    },
    cardXPosition() {
      const XPosition = 100
      const day = this.event.day
      let multiplier = 0

      const multiplierMap = { 'Monday': 0, 
                              'Tuesday': 1, 
                              'Wednesday': 2, 
                              'Thursday': 3, 
                              'Friday': 4, 
                              'Saturday': 5, 
                              'Sunday': 6 }

      multiplier = multiplierMap[this.event.day]

      return `${(XPosition * multiplier)}px`
    },
    cardTimeStart() {
      const event = this.event
      let suffix
      let startHour = parseInt(event.start.hour)
      let startMinute = event.start.minute

      if(startHour < this.earliest) {
        this.$store.dispatch('updateEarliest', startHour)
      }

      if(startHour < 12) {
        suffix = 'AM'

        if(startHour === 0) {
          startHour = 12
        }
      } else {
        suffix = 'PM'

        if(startHour > 12) {
          startHour -= 12
        } 
      }

      return `${startHour}:${startMinute}${suffix}`
    },
    cardTimeEnd() {
      const event = this.event
      let suffix
      let endHour = parseInt(event.end.hour)
      let endMinute = event.end.minute

      if(endHour > this.latest) {
        this.$store.dispatch('updateLatest', endHour)
      }

      if(endHour < 12) {
        suffix = 'AM'
      } else {
        suffix = 'PM'

        if(endHour > 12) {
          endHour -= 12
        } 
      }

      return `${endHour}:${endMinute}${suffix}`
    },
  }
}
</script>

<style>

.event-card {
  box-sizing: border-box;
  border: 1px solid rgba(50, 200, 250, 0.7);
  border-inline: none;
  border-top: none;
  background-color: rgba(50, 200, 250, 0.4);
  height: v-bind('cardHeight');
  font-size: 10px;
  position: absolute;
  margin-top: v-bind('cardYPosition');
  margin-left: v-bind('cardXPosition');
  z-index: 1;
  width: 100px;
  user-select: none;
}

.event-card:hover {
  background-color: rgba(50, 200, 250, 0.5);
  cursor: pointer;
}

.event-card:active {
  background-color: rgba(50, 200, 250, 0.6);
}

.event-card-title {
  font-size: 11px;
  font-weight: bold;
}

</style>