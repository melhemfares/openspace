import { createStore } from 'vuex'
import store from '@/store'
import EventService from '@/services/EventService'
import persistedStateVuex from "persisted-state-vuex";
import Cookies from 'js-cookie'
import router from '@/router'

export default createStore({
  plugins: [persistedStateVuex],
  state: {
    user: {},
    payload: {},
    msg: '',
    isLoggedIn: !!Cookies.get('token'),
    schedule: {},
    event: {},
    events: [],
    toggle: false,
    toggleEvent: '',
    hoursShown: 24,
    earliest: 0,
    latest: 24,
    loading: false
  },
  getters: {
  },
  mutations: {
    GET_USER(state, user) {
      state.user = user
    },
    GET_PAYLOAD(state, payload) {
      state.payload = payload
    },
    CREATE_MSG(state, msg) {
      state.msg = msg;
    },
    LOGIN_SUCCESS(state) {
      state.isLoggedIn = true;
    },
    LOGOUT(state) {
      state.isLoggedIn = false;
    },
    GET_SCHEDULE(state, schedule) {
      state.schedule = schedule
    },
    GET_EVENT(state, event) {
      state.event = event
    },
    TOGGLE(state) {
      state.toggle = !state.toggle
    },
    TOGGLE_EVENT(state, toggleEvent) {
      state.toggleEvent = toggleEvent
    },
    ADD_EVENTS(state, events) {
      state.event.push(events)
    },
    UPDATE_HOURS_SHOWN(state, hoursShown) {
      state.hoursShown = hoursShown
    },
    UPDATE_EARLIEST(state, earliest) {
      state.earliest = earliest
    },
    UPDATE_LATEST(state, latest) {
      state.latest = latest
    },
    BEGIN_LOADING(state) {
      state.loading = true
    },
    STOP_LOADING(state) {
      state.loading = false
    }
  },
  actions: {
    toggle({ commit }) {
      commit('TOGGLE')
    },
    toggleEvent({ commit }, toggleEvent) {
      commit('TOGGLE_EVENT', toggleEvent)
    },
    updateHoursShown({ commit }, hoursShown) {
      commit('UPDATE_HOURS_SHOWN', hoursShown)
    },
    updateLatest({ commit }, latest) {
      commit('UPDATE_LATEST', latest)
    },
    updateEarliest({ commit }, earliest) {
      commit('UPDATE_EARLIEST', earliest)
    },
    beginLoading({ commit }) {
      commit('BEGIN_LOADING')
    },
    stopLoading({ commit }) {
      commit('STOP_LOADING')
    },
    createUser({ commit }, user) {
      return EventService.registerUser(user)
        .then(() => {
          commit('GET_USER', user)
          commit('UPDATE_HOURS_SHOWN', 24)
          commit('UPDATE_EARLIEST', 0)
          commit('UPDATE_LATEST', 24)
          commit('CREATE_MSG', 'Sucessfully registered')
          router.push({
            name: 'login'
          })
        })
        .catch(error => {
          commit('CREATE_MSG', error.response.data.msg)
        })
    },
    login({ commit }, user) {
      return EventService.loginUser(user)
        .then(response => {
          commit('LOGIN_SUCCESS')
          commit('GET_PAYLOAD', response.data)
          Cookies.set('token', response.data.token)
          router.push({
            name: 'schedule'
          })
        })
        .catch(error => {
          commit('CREATE_MSG', error.response.data.msg)
        })
    },
    logout({ commit }) {
      sessionStorage.removeItem('token')
      commit('LOGOUT')
    },
    createSchedule({ commit }, schedule) {
      EventService.createSchedule(schedule)
        .then(() => {
          commit('GET_SCHEDULE', schedule)
          console.log('schedule made')
        })
        .catch(error => {
          console.log(error)
        })
    },
    getAllSchedules({ commit }) {
      return EventService.getAllSchedules()
        .then(response => {
          commit('GET_SCHEDULE', response.data)
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getSchedule({ commit }) {
      return EventService.getSchedule()
        .then(response => {
          commit('GET_SCHEDULE', response.data)
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    collectEvents({ commit }, events) {
      store.state.events = []
      commit('ADD_EVENTS', events)
    },
    addEvent({ commit }, event) {
      return EventService.addEvent(event)
        .then(response => {
          commit('GET_SCHEDULE', response.data)
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteEvent({ commit }, id) {
      return EventService.deleteEvent(id)
        .then(response => {
          commit('GET_SCHEDULE', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    /*
    Developer note:

    Vuex actions only take one extra parameter.

    Must pass the body all as one object and split
    it up later.

    This bug messed with me all day till I realized.
    */
    updateEvent({ commit }, event) {
      return EventService.updateEvent(event.id, event)
        .then(response => {
          commit('GET_SCHEDULE', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getProfile({ commit }) {
      return EventService.getUser()
        .then(response => {
          commit('GET_USER', response.data)
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addFriend({ commit }, friendCode) {
      return EventService.addFriend(friendCode)
        .then(response => {
          commit('GET_USER', response.data)
          commit('CREATE_MSG', 'New friend has been added')
        })
        .catch(error => {
          commit('CREATE_MSG', error.response.data.msg)
        })
    },
    deleteFriend({ commit }, id, friend) {
      return EventService.deleteFriend(id, friend)
        .then(response => {
          commit('GET_USER', response.data)
          console.log(response.data)
        })
        .catch(error => {
          commit('CREATE_MSG', error.response.data.msg)
        })
    }
  },
  modules: {
  }
})
