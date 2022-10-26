<template>
  <h1>{{ username }}'s Schedule</h1>
  <div class="add-event">
    <AddEvent 
      @wheel.prevent
      @touchmove.prevent
      @scroll.prevent
      v-if="toggleAddEvent"
    />
  </div>
  <div class="display-events">
    <DisplayEvents 
      @wheel.prevent
      @touchmove.prevent
      @scroll.prevent
      v-if="toggleDeleteEvent"
      :events="events"
    />
  </div>
  <div class="display-events">
    <DisplayEvents 
      @wheel.prevent
      @touchmove.prevent
      @scroll.prevent
      v-if="toggleEditEvent"
      :events="events"
    />
  </div>
  <div class="screen-dim" v-if="toggle"></div>
  <div v-if="!isLoading" class="schedule-main">
    <div class="schedule-options">
      <div class="event-buttons">
        <button @click="addEvent" class="event-btn">Add event &nbsp; </button>
        <button @click="deleteEvent" class="event-btn">Delete event</button>
        <button @click="editEvent" class="event-btn">Edit event</button>
      </div>
    </div>
    <div class="schedule-container">
      <div class="schedule">
        <div class="grid-container-days">
          <div v-for="day in days" class="grid-item-days">{{ day }}</div>
        </div>
        <div class="grid-container-events">
          <div v-for="index in 7*hoursShown" class="grid-item-events"></div>
          <EventCard v-for="event in events" :key="event.id" :event="event" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddEvent from '@/components/AddEvent.vue'
import EditEvent from '@/components/EditEvent.vue'
import DisplayEvents from '@/components/DisplayEvents.vue'
import EventCard from '@/components/EventCard.vue'

export default {
  components: {
    AddEvent,
    DisplayEvents,
    EditEvent,
    EventCard
  },
  data() {
    return {
      days: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      schedule: {
        events: []
      }
    }
  },
  methods: {
    addEvent() {
      this.$store.dispatch('toggle')
      this.$store.dispatch('toggleEvent', 'Add')
    },
    deleteEvent() {
      this.$store.dispatch('toggle')
      this.$store.dispatch('toggleEvent', 'Delete')
    },
    editEvent() {
      this.$store.dispatch('toggle')
      this.$store.dispatch('toggleEvent', 'Edit')
    }
  },
  created() {
    this.$store.state.toggle = false
    this.$store.state.toggleEvent = ''

    const schedule = this.schedule

    this.$store.dispatch('beginLoading')
    this.$store.dispatch('getSchedule')
      .then(() => {
        this.$store.dispatch('stopLoading')
      })

  },
  updated() {
    this.$store.dispatch('updateEarliest', this.sortedTimes[0])
    this.$store.dispatch('updateLatest', this.sortedTimes[1])
    this.$store.dispatch('updateHoursShown', this.latest - this.earliest)
  },
  computed: {
    events() {
      return this.$store.state.schedule.events
    },
    isLoading() {
      return this.$store.state.loading
    },
    hoursShown() {
      return this.$store.state.hoursShown
    },
    earliest() {
      return this.$store.state.earliest
    },
    latest() {
      return this.$store.state.latest
    },
    username() {
      return this.$store.state.payload.user.name
    },
    events() {
      return this.$store.state.schedule.schedule.events
    },
    toggle() {
      return this.$store.state.toggle
    },
    toggleAddEvent() {
      return this.$store.state.toggleEvent === 'Add'
    },
    toggleDeleteEvent() {
      return this.$store.state.toggleEvent === 'Delete'
    },
    toggleEditEvent() {
      return this.$store.state.toggleEvent === 'Edit'
    },
    toggleEditingEvent() {
      return this.$store.state.toggleEvent === 'Editing'
    },
    scheduleHeight() {
      return `${30*this.hoursShown}px`
    },
    sortedTimes() {
      const events = this.events

      if(events.length === 0) {
        return [0,12]
      }

      let starts = []
      let ends = []

      events.forEach((event) => {
        starts.push(event.start.hour)
        ends.push(event.end.hour)
      })

      starts.sort(function(a, b){return a-b})
      ends.sort(function(a, b){return b-a})

      let earliest = starts[0]
      let latest = ends[0]

      return [earliest, latest]
    }
  }
}
</script>

<style>
.screen-dim {
  width: 100%;
  height: 1000px;
  transform: translateY(-20%);
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 2;
}

.schedule-main {
  width: 1000px;
  margin: 0 auto 0 auto;
}

.schedule-container {
  width: 710px;
  margin: 0 auto 0 auto;
}

.schedule-options {
  float: left;
}

.schedule {
  padding: 5px;
  box-shadow: 0px 0px 2px #36454F;
}

.add-event {
  position: fixed;
  z-index: 3;
  margin: 0 auto 0 auto;
  width: 100%;
  margin-bottom: 20px;
  transform: translateY(-5%);
}

.display-events {
  position: fixed;
  z-index: 3;
  margin: 0 auto 0 auto;
  width: 100%;
  margin-bottom: 20px;
  transform: translateY(-5%);
}

.event-buttons {
  margin-top: 5px;
  margin: 0 auto 0 auto;
}

.event-btn {
  display: flex;
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
}

button {
  padding: 5px;
  font-family : inherit;
  font-size: 1em;
  cursor: pointer;
  box-shadow: 0px 0px 2px #36454F;
  border: none;
  color: #36454F;
}

button:hover {
  border: none;
  outline: none;
  background-color: #ddd;
  color: #36454F;
}

button:active {
  background-color: #ccc;
}

input {
  margin-right: 0px;
  font-family : inherit;
  padding: 10px;
}

.join-text h4 {
  margin: 0px 10px 10px 0px;
}

/* Grids */
.grid-container-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin: auto;
  width: 100%;
}

.grid-item-days {
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 2px #36454F;
  padding: 5px;
  font-size: 16px;
  text-align: center;
}

.grid-container-events {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color:;
  margin: auto;
  margin-top: 5px;
  width: 100%;
  height: v-bind('scheduleHeight');
  z-index: 0;
}

.grid-container-events:hover {
  background-color:;
}

.grid-item-events {
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 2px #36454F;
  padding: 1px;
  font-size: 16px;
  text-align: center;
}

</style>
