<template>
  <h1>‎</h1>
  
  <div class="register-container">
    <h1>Sign up</h1>
    <form @submit.prevent="onSubmit" class="register">
      <div class="names">
        <div class="fname">
          <label>First name</label><br>
          <input type="text" v-model="user.fname">
        </div>
        <div class="lname">
          <label>Last name</label><br>
          <input type="text" v-model="user.lname">
        </div>
      </div>
      <div class="clearfix"></div>
      <div class="long">
        <div class="email">
          <label>Email</label>
          <input type="text" v-model="user.email">
        </div>
        <div class="password">
          <label>Password <span class="warning">Must be at least 8 characters in length</span></label><br>
          <input type="password" v-model="user.password">
        </div>
        <div class="password">
          <label>Repeat Password</label>
          <input type="password" v-model="repeatPassword">
        </div>
        <button type="submit">Create Account</button>
        <h4 class="msg">{{ msg }}</h4>
      </div>
    </form>
  </div>
  
</template>

<script>
import NProgress from 'nprogress'

export default {
  data() {
    return {
      user: {
        fname: '',
        lname: '',
        email: '',
        password: ''
      },
      msg: '',
      repeatPassword: ''
    }
  },
  methods: {
    onSubmit() {
      const user = this.user
      
      NProgress.start()
      if(user.password != this.repeatPassword) {
        this.msg = 'Passwords do not match'
        NProgress.done()
      } else {
        this.$store.dispatch('createUser', user)
          .then(() => {
            this.msg = this.$store.state.msg
            NProgress.done()
          })
          .catch(error => {
            this.msg = 'Something went wrong'
            console.log(error);
          })
      }
    }
  }
}
</script>

<style>
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

.msg {
  margin-bottom: 0px;
  font-weight: 500;
}

.register-container {
  box-shadow: 0px 0px 2px #36454F;
  padding: 20px;
  width: 400px;
  margin: 0 auto 0 auto;
}

.names input {
  width: 140px;
  display: inline;
}

.names {
  display: inline;
  margin-bottom: 20px;
  text-align: left;
}

.fname {
  float: left;
  margin-left: 25px;
  margin-right: 21px;
}

.lname {
  float: left;
}

.email {
  margin: 25px;
  text-align: left;
}

.password {
  margin: 25px;
  text-align: left;
}

.long input {
  width: 326px;
  display: block;
}

.long button {
  width: 350px;
  padding: 10px;
  margin-top: 10px;
}

.warning {
  font-size: 12px;
  font-style: italic;
  color: grey;
  margin-left: 10px;
}
</style>
