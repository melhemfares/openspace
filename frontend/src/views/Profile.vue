<template>
  <h1>‎</h1>
    <div class="profile-container">
      <div class="profile-img">
        <img src="blank-pfp.png">
      </div>
      <div class="profile-info">
        <h1>Profile</h1>
        <form @submit.prevent="onSubmit" class="profile">
          <div class="profile-names">
            <div class="fname">
              <label>First name</label><br>
              <input :placeholder="profile.fname" type="text" :disabled="toggle">
            </div>
            <div class="lname">
              <label>Last name</label><br>
              <input :placeholder="profile.lname" type="text" :disabled="toggle">
            </div>
          </div>
          <div class="clearfix"></div>
          <div class="profile-email">
            <div class="email">
              <label>Email</label>
              <input :placeholder="profile.email" type="text" :disabled="toggle">
            </div>
          </div>
          <div class="friend-code">
            <span>Friend Code: {{ profile.friendCode }}</span>
          </div>
          <div class="friend-code"><br>
            <span>Friend List: </span> 
            <FriendCard v-for="friend in profile.friends" :key="friend.id" :friend="friend"/>    
          </div><hr>
          <div class="add-friend">
            <div>
              <label>Add friend</label><br>
              <div class="add-friend-input">
                <input v-model="friendCode.friendCode" placeholder="Enter code" type="text">
                <button>Add</button>
              </div>
            </div>
          </div>
          <div class="feedback">
            {{ msg }}
          </div>
        </form>
      </div>
      <div class="clearfix"></div>
    </div>
</template>

<script>
import FriendCard from '@/components/FriendCard.vue'

export default {
  components: {
    FriendCard
  },
  data() {
    return {
      toggle: true,
      friendCode: {
        friendCode: ''
      },
      msg: '...'
    }
  },
  created() {
    this.$store.state.toggle = true

    this.$store.dispatch('getProfile')
      .catch(error => {
        console.log(error);
      })
  },
  computed: {
    profile() {
      return this.$store.state.user.user
    }
  },
  methods: {
    onSubmit() {
      const friendCode = this.friendCode

      this.$store.dispatch('addFriend', friendCode)
        .then(() => {
          this.msg = this.$store.state.msg

          const msgReset = setTimeout(() => {
            this.msg = '...'
          }, 3000)
        })
        .catch(error => {
          this.msg = 'Something went wrong'
          console.log(error);
        })
    }
  }
}
</script>

<style scoped>
@keyframes fadeOut {
   0% {opacity: 1;}
   100% {opacity: 0;} 
} 

.feedback:active {
  animation: fadeOut 3s;
}

.profile-info {
  width: 400px;
  float: left;
}

.profile-img {
  float: left;
  margin-inline: 30px;
  border-radius: 100%;
}

.profile-img img {
  height: 100px;
  box-shadow: 0px 0px 2px #36454F;
  border-radius: 100%;
  margin-top: 75px;
}

.friend-code {
  text-align: left;
  margin-left: 25px;
  margin-right: 25px;
}

.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

.profile-container {
  box-shadow: 0px 0px 2px #36454F;
  padding: 20px;
  width: 600px;
  margin: 0 auto 0 auto;
}

.names input {
  width: 140px;
  display: inline;
}

.profile-names {
  display: inline;
  margin-bottom: 20px;
  text-align: left;
}

.fname {
  float: left;
  margin-right: 20px;
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

.add-friend {
  margin: 25px;
  text-align: left;
  display: block;
}

.add-friend-input {
  display: flex;
}

.add-friend-input button {
  width: 50px;
  margin-left: 20px;
}

.profile-email input {
  width: 325px;
  display: block;
}

.warning {
  font-size: 12px;
  font-style: italic;
  color: grey;
  margin-left: 10px;
}

@media only screen and (max-width: 700px) {
  .profile-container {
    width: 85%;
    margin: 0 auto 0 auto;
  }

  .profile-img {
    float: none;
    margin-inline: 30px;
    border-radius: 100%;
  }

  .profile-img img {
    margin-top: 20px;
  }     

  .profile-info {
    width: 100%;
    float: none;
  }

  .profile {
    width: 100%;
    margin: 0 auto 0 auto;
  }

  .profile-names {
    margin-right: 25px;
    display: flex;
    justify-content: center;
  }

  .profile-email {
    display: flex;
    justify-content: center;
  }

  .friend-code {
    text-align: center;
  }

  .add-friend {
    display: flex;
    justify-content: center;
  }

}
</style>
