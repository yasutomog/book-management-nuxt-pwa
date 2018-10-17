<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        book-management-nuxt-pwa
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <router-link to="/user">Go to User</router-link>
      <a href="http://localhost:9090/" target="_blank">Go to Sign in G Suite</a>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  mounted() {
    fetch('http://localhost:9090/api/auth.php').then((response) => {
      if (response.status === 401) {
        this.$router.push('/')
      } else {
        this.$router.push('/user')
      }
    })
  },
  activated() {
    console.log('activated');
  },
  components: {
    AppLogo
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

