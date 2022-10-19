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
    <!-- <div class="stats">
      <div class="num-stats">
        <span> <b>100</b><br> users registered </span>
      </div>
      <div class="num-stats-middle">
        <span> <b>100</b><br> schedules created </span>
      </div>
      <div class="num-stats">
        <span> <b>100</b><br> free hours found </span>
      </div>
    </div> -->
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

.num-stats-middle {
  float: left;
  width: 33.33%;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 0px 2px #36454F;
  margin-inline: 50px;
}

.num-stats {
  float: left;
  width: 33.33%;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 0px 2px #36454F;
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
