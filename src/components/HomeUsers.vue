<template>
  <section class="users">
    <span class="s-h1">Our cheerful users</span>

    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <p class="users__top-text">Attention! Sorting users by registration date</p>
        </div>
      </div>
      <div class="row">

        <div class="col-md-4 col-sm-6" v-for="user in users" :key="user.id">
          <div class="users-item">
            <img v-bind:src="user.photo" alt="Photo" class="user-img">
            <span class="user-name">{{user.name}}</span>
            <p class="user-spec">{{user.position}}</p>
            <p class="user-email" v-b-tooltip.hover.bottom :title="user.email">{{emailSubstr(user.email)}}</p>
            <p class="user-number">{{user.phone}}</p>
          </div>
        </div>

      </div>
    </div>

    <button class="main-button" v-on:click="getUsers" v-if="showMore">Show more</button>
  </section>
</template>

<script>
export default {
  props: {
    newUserCreated: {
      type: Boolean,
    }
  },
  data: () => ({
    users: [],
    page: 3,
    startPage: 3,
    userCount: 3,
    mountUsers: 6,
    showMore: true,
    windowWidth: 0
  }),
  methods: {
    emailSubstr(email) {
      if(email.length > 25) {
        return email.substring(0, 25) + "..."
      }
      else {
        return email
      }
    },

    async getUsers() {
      const nextUsers = await this.$store.dispatch('getUsers', {page: this.page, userCount: this.userCount})
      if(nextUsers.success === true) {
        nextUsers.users.forEach(user => {
          this.users.push(user)
        });
        this.page++

        if(nextUsers.links.next_url == null) {
          this.showMore = false
          this.page = this.startPage
        }
      }
      else {
        this.showMore = false
        this.page = this.startPage
      }
      
    },

    async mountedUser() {
      this.users = await this.$store.dispatch('mountUsers', this.mountUsers)
    },

    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth;
    }
  },
  watch: {
    async newUserCreated() {
      this.users = await this.$store.dispatch('mountUsers', this.mountUsers)
      this.showMore = true
      this.page = this.startPage
    }
  },
  async mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);

      this.getWindowWidth()
    })

    setTimeout(() => {
      if(this.windowWidth < 576) {
        this.page = 2
        this.startPage = 2
        this.userCount = 3
        this.mountUsers = 3
      }
      else if(this.windowWidth < 768) {
        this.page = 4
        this.startPage = 4
        this.userCount = 2
      }

      this.mountedUser()
    }, 0)

    
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth);
  }
}
</script>