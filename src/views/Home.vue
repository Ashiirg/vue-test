<template>
  <div class="home-wrapper">

    <div class="mob-overlay"
      v-bind:class="{ 'mob-overlay__active': mobActive}"
      v-on:click="mobMenuInactive"
    ></div>

    <HomeMenu 
      v-on:mobMenuActive="mobMenuActive"
    />

    <HomeMobMenu  
      v-bind:active="mobActive"
      v-on:mobMenuClick="mobMenuInactive"
    />

    <HomeHead />

    <HomeAbout />

    <HomeUsers 
      v-bind:newUserCreated="newUserCreated"
    />

    <HomeRegister 
      v-on:newUser="newUser"
    />

    <div>
      <b-modal ref="modal-register" id="modal-register" centered title="Congratulations">
        <p>You have successfully passed the registration</p>
        <template v-slot:modal-footer>
          <button type="button" class="btn modal-register__btn" @click="hideModal">Great</button>
        </template>
      </b-modal>
    </div>

  </div>
</template>

<script>
import HomeMenu from '@/components/HomeMenu'
import HomeMobMenu from '@/components/HomeMobMenu'
import HomeHead from '@/components/HomeHead'
import HomeAbout from '@/components/HomeAbout'
import HomeUsers from '@/components/HomeUsers'
import HomeRegister from '@/components/HomeRegister'

export default {
  name: 'Home',
  data: () => ({
    mobActive: false,
    newUserCreated: false
  }),
  methods: {
    mobMenuActive() {
      this.mobActive = !this.mobActive
      let element = document.getElementsByTagName('body')[0]
      element.classList.add('overflow-hidden')
    },
    mobMenuInactive() {
      this.mobActive = !this.mobActive
      let element = document.getElementsByTagName('body')[0]
      element.classList.remove('overflow-hidden')
    },
    newUser() {
      this.newUserCreated = !this.newUserCreated
      this.$refs['modal-register'].show()
    },
    hideModal() {
      this.$refs['modal-register'].hide()
    }
  },
  components: {
    HomeMenu, HomeMobMenu, HomeHead, HomeAbout, HomeUsers, HomeRegister
  }
}
</script>

<style lang="scss">
.header-wrap {
  background-image: url('../assets/img/banner-photo.jpg');
}
</style>