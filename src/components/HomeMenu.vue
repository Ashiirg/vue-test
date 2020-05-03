<template>
  <nav class="menu">
    <div class="container">
      <div class="row">
        <div class="col-md-3 col-sm-6 col-6">
          <div class="logo-wrap">
            <img src="../assets/img/logo.svg" alt="logo" v-scroll-to="'.home-wrapper'">
          </div>
        </div>
        <div class="col-md-9 col-sm-6 col-6">
          <ul class="menu-list">
            <li><router-link to="/" v-scroll-to="'.about-wrap'">About me</router-link></li>
            <li><router-link to="/relationship">Relationships</router-link></li>
            <li><router-link to="/requirements">Requirements</router-link></li>
            <li><router-link to="/" v-scroll-to="'.users'">Users</router-link></li>
            <li><router-link to="/" v-scroll-to="'.register'">Sign Up</router-link></li>
          </ul>
          <span class="mob-humb"
            v-on:click="$emit('mobMenuActive')"
          >
            <img src="../assets/img/menu-icon.svg" alt="humburger">
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  
}
</script>