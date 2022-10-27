<template>
  <div v-if="!isLoading" class="main-container">
    <h1>Find Free Time</h1>
    <div class="free-time-content">
      <div class="free-schedule-container">
        <div v-if="!toggle" class="schedule">
          <div class="grid-container-days">
            <div v-for="day in days" class="grid-item-days">{{ day }}</div>
          </div>
          <div class="free-grid-container-events">
            <div v-for="index in 7*hoursShown" class="grid-item-events"></div>
            <EventCard v-for="event in events" :key="event.id" :event="event" />
          </div>
        </div>
      </div>

      <table class="table-container" style="width:450px">
        <tr>
          <th>Day</th>
          <th>Free Periods</th>
        </tr>
        <tr v-for="(period, day) in freePeriods">
          <td><div class="free-content">{{ day }}</div></td>
          <td><FreeTimeCard class="free-content" :period="period"/></td>
        </tr>
      </table>
    </div>
  </div>

</template>

<script>
import AddEvent from '@/components/AddEvent.vue'
import EventCard from '@/components/EventCard.vue'
import FreeTimeCard from '@/components/FreeTimeCard.vue'
import NProgress from 'nprogress'

export default {
  components: {
    AddEvent,
    EventCard,
    FreeTimeCard
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
      toggleAddEvent: false,
      schedule: {
        events: []
      }
    }
  },
  methods: {
    addEventToggle() {
      this.$store.dispatch('toggle')
    }
  },
  created() {
    this.$store.state.toggle = false
    const schedule = this.schedule

    //Calls for all existing schedules
    this.$store.dispatch('beginLoading')
    NProgress.start()
    this.$store.dispatch('getAllSchedules')
      .then(() => {
        this.$store.dispatch('stopLoading')
        NProgress.done()
      })
  },
  computed: {
    //Receives and stores all the event objects
    events() {
      const schedules = this.$store.state.schedule.schedules
      let events = []

      schedules.forEach(schedule => {
        schedule.events.forEach(event => {
          events.push(event)
        })
      })
      
      return events
    },
    hoursShown() {
      return this.$store.state.hoursShown
    },
    isLoading() {
      return this.$store.state.loading
    },
    scheduleHeight() {
      return `${30*this.hoursShown}px`
    },
    //Takes the event objects and finds the free periods in each day of the week
    freePeriods() {
      //Original event times go in here
      let eventTimes = 
        {
          'Monday': [],
          'Tuesday': [],
          'Wednesday': [],
          'Thursday': [],
          'Friday': [],
          'Saturday': [],
          'Sunday': [],
        }

      //Calculated periods of free time go in here
      let freePeriods = 
        {
          'Monday': [],
          'Tuesday': [],
          'Wednesday': [],
          'Thursday': [],
          'Friday': [],
          'Saturday': [],
          'Sunday': [],
        }

      //Push the event in the array corresponding to its date
      this.events.forEach(event => {
          eventTimes[event.day].push({
            start: event.start,
            end: event.end
        })
      })

      Object.keys(eventTimes).forEach(day => {

        //Sort the events in chronological order (rather than in order added)
        eventTimes[day].sort((a, b) => {
          return (a.start.hour * 60 + a.start.minute) - (b.start.hour * 60 + b.start.minute)
        })

        if (eventTimes[day].length != 0) {
          eventTimes[day].forEach(timePeriod => {
            let freePeriod

            //First index is a special case as it's the start of the day
            if(eventTimes[day].indexOf(timePeriod) === 0) {
 
              freePeriod = {
                start: {
                  hour: '00',
                  minute: '00',
                },
                end: {
                  hour: timePeriod.start.hour,
                  minute: timePeriod.start.minute
                }
              }

            } else {
              
              let lastTimePeriod = eventTimes[day][eventTimes[day].indexOf(timePeriod)-1]

              freePeriod = {
                start: {
                  hour: lastTimePeriod.end.hour,
                  minute: lastTimePeriod.end.minute
                },
                end: {
                  hour: timePeriod.start.hour,
                  minute: timePeriod.start.minute
                }
              }
            }

            freePeriods[day].push(freePeriod)

            //Additional push on final index, another special case
            if(eventTimes[day].indexOf(timePeriod) == eventTimes[day].length-1) {
              freePeriod = {
                start: {
                  hour: timePeriod.end.hour,
                  minute: timePeriod.end.minute
                },
                end: {
                  hour: '24',
                  minute: '00'
                }
              }

              freePeriods[day].push(freePeriod)
            }
          })
        } else {
          freePeriods[day].push('Free')
        }
      })

      return freePeriods
    },
    toggle() {
      return this.$store.state.toggle
    }
  }
}
</script>

<style>
/* Grids */
table {
  box-shadow: 0px 0px 2px #36454F;
  padding: 5px;
}

th, td {
  box-shadow: 0px 0px 2px #36454F;
  background-color: white;
}

th {
  background-color: #04AA6D;
  color: #f0f0f0;
  padding: 10px;
  font-size: 18px;
}

.free-time-content {
  margin-inline: 10px;
}

.main-container {
  width: 80%;
  margin: 0 10% 0 10%;
}

.row {
  display: flex;
}

.free-grid {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  margin: auto;
  width: 700px;
}

.free-grid-header {
  font-size: 18px;
}

.free-content {
  padding: 10px;
}

.free-schedule-container {
  width: 710px;
  float: left;
  margin-right: 30px;
}

.free-grid-container {
  box-shadow: 0px 0px 2px #36454F;
  width: inherit;
}

.free-grid-container-events {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color:;
  margin: auto;
  margin-top: 5px;
  width: 100%;
  height: v-bind('scheduleHeight');
  z-index: 0;
}

.schedule {
  padding: 5px;
  box-shadow: 0px 0px 2px #36454F;
}

@media only screen and (max-width: 1535px) {
  .main-container {
    width: 90%;
    margin: 0 5% 0 5%;
  }
}

@media only screen and (max-width: 1355px) {
  .main-container {
    width: 96%;
    margin: 0 2% 0 2%;
  }
}

@media only screen and (max-width: 1260px) {
  .main-container {
    width: 100%;
    margin: 0;
  }
}

@media only screen and (max-width: 1210px) {
  .main-container {
    width: 100%;
  }

  .free-schedule-container {
    float: none;
    margin: 0 auto 30px auto;
  }

  .table-container {
    margin: 0 auto 0 auto;
  }
}

</style>
