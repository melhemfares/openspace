<template>
  <div v-if="period" class="free-time-card">
    <div v-for="time in _period">{{ time }}</div>
  </div>
</template>

<script>
import EventService from '@/services/EventService'

export default {
  props: {
    period: {
      type: Object,
      required: true
    }
  },
  methods: {
   
  },
  computed: {
    //Receives each free period object and turns it into a timestamp legible to the user
    _period() {
      const period = this.period
      let periods = []
      let timeStart, timeEnd

      let suffix

      period.forEach(time => {

        //If there are no events, the day is all free, yay
        if(time === 'Free') {
          periods.push('Completely free!')
          return
        }

        let startHour = parseInt(time.start.hour)
        let startMinute = time.start.minute

        let endHour = parseInt(time.end.hour)
        let endMinute = time.end.minute

        const difference = (endHour * 60 + parseInt(endMinute)) - (startHour * 60 + parseInt(startMinute))

        if(difference <= 0) {
          return
        }

        if(startHour < 12) {
          suffix = 'AM'

        } else {
          suffix = 'PM'

          if(startHour > 12) {
            startHour -= 12
          } 
        }

        timeStart = `${startHour}:${startMinute}${suffix}`

        if(startHour === 0) {
          timeStart = 'Start of day'
        }

        if(endHour < 12) {
          suffix = 'AM'
        } else {
          suffix = 'PM'

          if(endHour > 12 && endHour != 24) {
            endHour -= 12
          }
        }

        timeEnd = `${endHour}:${endMinute}${suffix}`

        if(endHour == 24) {
          timeEnd = 'End of day'   
        }

        periods.push(`${timeStart} - ${timeEnd}`)
      })

      return periods
    }

  }
}
</script>

<style>

.event-card {
  background-color: rgba(50, 200, 250, 0.4);
  font-size: 10px;
  width: 100px;
}


</style>