import store from '@/store'
import axios from "axios"
import Cookies from 'js-cookie'

const apiClient = axios.create({
  baseURL: 'https://openspace-full.onrender.com/api/v1/',
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
})

export default {
  registerUser(user) {
    return apiClient.post('/auth/register', user)
  },
  loginUser(user) {
    return apiClient.post('/auth/login', user)
  },
  getAllSchedules() {
    return apiClient.get('/schedule/all', {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token')
      }
    })
  },
  getSchedule() {
    return apiClient.get('/schedule', {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token')
      }
    })
  },
  addEvent(event) {
    return apiClient.post('/schedule', event, {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token')
      }
    })
  },
  deleteEvent(id) {
    return apiClient.delete(`/schedule/${id}`, {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token')
      }
    })
  },
  clearSchedule() {
    return apiClient.delete(`/schedule`, {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token')
      }
    })
  },
  updateEvent(id, event) {
    return apiClient.patch(`/schedule/${id}`, event, {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token')
      }
    })
  },
  getAllUsers() {
    return apiClient.get('/profile', {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token')
      }
    })
  },
  getUser() {
    return apiClient.get(`/profile`, {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token')
      }
    })
  },
  updateUser(user) {
    return apiClient.patch(`/profile`, user, {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token')
      }
    })
  },
  deleteUser() {
    return apiClient.patch(`/profile`, {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token')
      }
    })
  },
  addFriend(friendCode) {
    return apiClient.patch(`/profile/friends`, friendCode, {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token'),
      }
    })
  },
  deleteFriend(id, friend) {
    return apiClient.patch(`/profile/friends/${id}`, friend, {
      headers: {
        Authorization: 'Bearer ' + Cookies.get('token'),
      }
    })
  }
}