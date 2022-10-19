<template>
  <div>
    <div class="add-event-container">
      <h1 class="container-title">Create an event</h1>
      <form @submit.prevent="onSubmit" class="add-event-form">

        <div class="event-day">
          <label>Day: </label>
          <select v-model="event.day">
            <option v-for="day in days" :value="day">{{day}}</option>
          </select>
        </div>

        <div class="event-title">
          <label>Title: </label>
          <input v-model="event.title" type="text">
        </div>

        <div class="event-times">
          <div class="event-start">
            <label>From: </label>
            <input v-model="event.start" type="time">
          </div>

          <div class="event-end">
            <label>To: </label>
            <input v-model="event.end" type="time">
          </div>  
        </div>

        <div class="add-event-buttons">
          <button class="save" type="submit">Save</button>
          <button class="cancel" @click="closeWindow">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'

export default {
  props: ['toggle'],
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
      event: {
        title: '',
        day: '',
        start: '',
        end: ''
      }
    }
  },
  methods: {
    onSubmit() {
      event = {
        ...this.event,
        start: {
          hour: this.event.start.slice(0,2),
          minute: this.event.start.slice(3,5)
        },
        end: {
          hour: this.event.end.slice(0,2),
          minute: this.event.end.slice(3,5)
        },
        id: nanoid()
      }
      console.log(event)

      this.$store.dispatch('addEvent', event)
        .then(() => {
          this.closeWindow()
        })
        .catch(error => {
          console.log(error);
        })
    },
    closeWindow() {
      this.$store.dispatch('toggle')
      this.$store.dispatch('toggleEvent', '')
    }
  }
}
</script>

<style>
.add-event-container {
  width: 710px;
  height: 450px;
  box-shadow: 0px 0px 10px #36454F;
  background-color: #f0f0f0;
  margin: 0 auto 0 auto;
}

.container-title {
  padding: 15px;
  margin-bottom: 0px;
}

.add-event-form {
  width: 420px;
  padding: 20px;
  margin: 0 auto 0 auto;
  box-shadow: 0px 0px 2px #36454F;
}

.event-day {
  margin-top: 20px;
  padding: 10px;
  box-shadow: 0px 0px 2px #36454F;
}

.event-day select {
  padding: 10px;
  margin-inline: 20px;
}

.event-title {
  margin-top: 20px;
  padding: 10px;
  box-shadow: 0px 0px 2px #36454F;
}

.event-times {
  margin-top: 20px;
  padding: 10px;
  display: flex;
  justify-content: center;
  box-shadow: 0px 0px 2px #36454F;
}

.event-decoration {
  margin-top: 20px;
  padding: 10px;
  box-shadow: 0px 0px 2px #36454F;
}

.event-times input {
  margin-inline: 20px;
}

.event-title input {
  margin-inline: 28px;
  width: 260px;
}

.event-decoration input {
  margin-inline: 28px;
  height: 55px;
  padding: 0;
  border: none;
  cursor: pointer;
}

.add-event-buttons button {
  margin-inline: 10px;
}

.save {
  margin-top: 20px;
  padding: 10px;
  width: 150px;
}

.cancel {
  margin-top: 20px;
  padding: 10px;
  width: 100px;
}

@media only screen and (max-width: 750px) {
  .add-event-container {
    width: 100%;
    margin: 0 auto 0 auto;
  }

  .grid-item-days {
    font-size: 2vw;
    padding: 5px 2px;
  }
}

</style>