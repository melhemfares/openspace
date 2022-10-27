<template>
  <h1>‎</h1>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="onSubmit" class="register">
      <div class="long">
        <div class="email">
          <label>Email</label>
          <input v-model="user.email" type="text">
        </div>
        <div class="password">
          <label>Password</label><br>
          <input v-model="user.password" type="password">
        </div>
        <button>Login</button>
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
        email: '',
        password: ''
      },
      msg: ''
    }
  },
  methods: {
    onSubmit() {
      const user = this.user
      
      NProgress.start()
      this.$store.dispatch('login', user)
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
</script>

<style>
.login-container {
  box-shadow: 0px 0px 2px #36454F;
  padding: 20px;
  width: 400px;
  margin: 0 auto 0 auto;
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
