<template>
  <nav>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css">
    <router-link :to="{ name: 'home'}">Home</router-link>
    <router-link :to="{ name: 'register'}">Create Account</router-link>
    <router-link v-if="!isLoggedIn" :to="{ name: 'login'}">Sign in</router-link>

    <div v-if="isLoggedIn" class="dropdown">
      <button class="dropbtn">Schedule
        <i class="fa-solid fa-caret-down"></i>
      </button>
      <div class="dropdown-content">
        <router-link :to="{ name: 'schedule'}">My Schedule</router-link>
        <router-link :to="{ name: 'free-time'}">Find Free Time</router-link>
      </div>
    </div>

    <div v-if="isLoggedIn" class="dropdown">
      <button class="dropbtn">Profile
        <i class="fa-solid fa-caret-down"></i>
      </button>
      <div class="dropdown-content">
        <router-link :to="{ name: 'profile'}">Check Profile</router-link>
        <router-link :to="{ name: 'settings'}">Settings</router-link>
        <router-link @click="logout" :to="{ name: 'logout'}">Sign out</router-link>
      </div>
    </div>
    
  </nav>
  <router-view/>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      console.log('test')
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans&family=Kulim+Park:wght@300&family=Lato:wght@300&family=Montserrat:wght@300&family=Nunito:wght@300&family=Open+Sans:wght@300&family=Poppins:wght@300&family=Source+Sans+Pro:wght@300&display=swap');

#app {
  font-family: DM Sans;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #36454F;
}

/* Add a black background color to the top navigation */
nav {
  overflow: hidden;
  margin-inline: 10%;
}

/* Style the links inside the navigation bar */
nav a {
  float: left;
  color: #36454F;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
nav a:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
nav a.router-link-exact-active {
  background-color: #04AA6D;
  color: white;
}

.dropdown {
  float: left;
  overflow: hidden;
}

.dropdown .dropbtn {
  font-size: 17px;
  border: none;
  outline: none;
  color: #36454F;
  padding: 14px 16px;
  margin: 0; 
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 150px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  float: none;
  color: #36454F;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown:hover .dropdown-content {
  display: block;
}

body, html {
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
  height: 100%;
  min-height: 100% !important;
}
</style>
