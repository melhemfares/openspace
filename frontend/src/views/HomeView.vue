<template>
  <div class="home">
    <div class="left-side">
      <h3 class="title">OpenSpace</h3>
      <h1>An easier way to plan meetups</h1>
      <span>
        Create a schedule and compare it with your friends to find 
        when you are all free.
      </span><br>
      <router-link :to="{name: 'register'}"><button class="sign-up">Sign up</button></router-link>
    </div>
    <div class="right-side">
      <img src="schedule.png">
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
.stats {
  margin-top: 30px;
  height: 125px;
  display: flex;
}

.home {
  margin: 10%;
  margin-top: 50px;
}

.home h1 {
  font-size: 55px;
  margin-bottom: 20px;
  margin-top: 10px;
}

.home h3 {
  margin: 0px;
}

.title {
  font-size: 24px;
  color: #04AA6D
}

.home span {
  font-size: 24px;
}

.right-side img {
  width: 90%;
}

.right-side {
  float: left;
  width: 60%;
}

.left-side {
  margin-top: 30px;
  text-align: left;
  float: left;
  width: 40%;
}

.left-side button {
  margin-top: 25px;
  width: 200px;
  height: 50px;
  border-radius: 100px;
  background-color: #04AA6D;
  color: #eee;
}

@media only screen and (max-width: 1000px) {
  .home {
    margin: 5%;
  }

  nav {
    margin: 0;
  }

  .stats {
    display: block;
  }

  .left-side {
    float: none;
    text-align: center;
    width: 100%;
  }

  .right-side {
    margin-top: 20px;
    width: 100%;
  }
}
</style>
