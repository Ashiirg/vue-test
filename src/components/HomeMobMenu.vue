<template>
  <section class="mob-menu" v-bind:class="{ 'mob-menu__active': active}">
    <div class="mob-menu__head">
      <img src="../assets/img/logo.svg" alt="logo">
    </div>
    <ul class="mob-menu__list">
      <li>
        <a href="#" v-scroll-to="'.about-wrap'">About me</a>
      </li>
        <li>
        <a href="#">Relationships</a>
      </li>
        <li>
        <a href="#" v-scroll-to="'.users'">Users</a>
      </li>
        <li>
        <a href="#" v-scroll-to="'.register'">Sign Up</a>
      </li>
        <li>
        <a href="#">Terms and Conditions</a>
      </li>
    </ul>
    <ul class="mob-menu__list">
      <li>
        <a href="#">How it works</a>
      </li>
        <li>
        <a href="#">Partnership</a>
      </li>
        <li>
        <a href="#">Help</a>
      </li>
        <li>
        <a href="#">Leave testimonial</a>
      </li>
        <li>
        <a href="#">Contact us</a>
      </li>
    </ul>
    <ul class="mob-menu__list">
      <li>
        <a href="#">Article</a>
      </li>
        <li>
        <a href="#">Our news</a>
      </li>
        <li>
        <a href="#">Testimonials</a>
      </li>
        <li>
        <a href="#">Licenses</a>
      </li>
        <li>
        <a href="#">Privacy Policy</a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
    }
  },
  data: () => ({

  }),
  methods: {
    removeActive() {
      let mobList = document.querySelectorAll('ul.mob-menu__list > li > a')
      for (let elem of mobList) {
        elem.classList.remove("active")
      }
      this.$emit('mobMenuClick')
    }
  },
  mounted() {
    let mobList = document.querySelectorAll('ul.mob-menu__list > li > a')
    let rm = this.removeActive
    for (let elem of mobList) {
      elem.addEventListener("click", function() {
        rm()
        this.classList.add("active")
      })
    }
  }
}
</script>