<template>
  <div v-if="friend">
    <span>{{ friend.name }}</span>
    &nbsp;
    <i @click="deleteFriend" class="fa-solid fa-circle-minus"></i>
  </div>
</template>

<script>
export default {
  props: {
    friend: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteFriend() {
      const id = this.friend.id
      const friend = this.friend

      const confirmDelete = confirm(`Are you sure you remove ${this.friend.name}?`)

      if(confirmDelete) {
        this.$store.dispatch('deleteFriend', id, friend)
          .then(() => {
            console.log(friend)
          })
          .catch(error => {
            console.log(error);
          })
      }
    }
  }
}
</script>

<style scoped>

.fa-solid {
  opacity: 0.8;
}

.fa-solid:hover {
  cursor: pointer;
  opacity: 0.9;
}

.fa-solid:active {
  opacity: 1;
}

</style>